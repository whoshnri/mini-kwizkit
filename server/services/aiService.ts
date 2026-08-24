import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { env } from "@/server/lib/env";

const MultipleChoiceSchema = z.object({
  type: z.enum(["multiple_choice"]),
  text: z.string().describe("The question text."),
  opt: z.object({
    A: z.string().describe("Option A text."),
    B: z.string().describe("Option B text."),
    C: z.string().describe("Option C text."),
    D: z.string().describe("Option D text."),
  }),
  correctOpt: z
    .number()
    .min(0)
    .max(3)
    .describe("The index of the correct option (0=A, 1=B, 2=C, 3=D)."),
  explanation: z
    .string()
    .nonempty()
    .describe("A concise explanation of why the chosen option is correct."),
  correctAnswer: z
    .string()
    .optional()
    .describe("Optional: The letter of the correct option (A, B, C, D) for user display."),
});

const OtherTypesSchema = z.object({
  type: z.enum(["short_answer", "essay", "true_or_false"]),
  text: z.string().describe("The question text."),
  correctOption: z
    .number()
    .min(0)
    .max(1)
    .describe(
      "The index of the correct option (0 = True , 1 = False) Leave as 0 for non true_or_false types."
    ),
  explanation: z
    .string()
    .nonempty()
    .describe("The explanation/rationale for the question/answer."),
  correctAnswer: z
    .string()
    .nonempty()
    .describe(
      "The expected correct answer (e.g., 'True', a short phrase, or an ideal essay point)."
    ),
});

const AIResponseSchema = z.object({
  preface: z
    .string()
    .min(1)
    .describe("A friendly, brief introduction to the generated questions."),
  metadata: z
    .array(z.union([MultipleChoiceSchema, OtherTypesSchema]))
    .describe("An array of generated questions."),
});

const AIState = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty"),
  textFileContext: z.string().nullable(),
  response: AIResponseSchema.nullable(),
  modelUsed: z.string().nullable(),
});

type AIStateType = z.infer<typeof AIState>;
type AIResponse = z.infer<typeof AIResponseSchema>;

const DEEPSEEK_ORIGIN = "https://api.deepseek.com";

function resolveDeepSeekBaseUrl() {
  const configured = env.deepseekBaseUrl.replace(/\/+$/, "");
  try {
    const host = new URL(configured || DEEPSEEK_ORIGIN).hostname;
    if (host !== "api.deepseek.com") {
      console.warn(`[AI] Ignoring ${host}; DeepSeek requests go to ${DEEPSEEK_ORIGIN}`);
      return DEEPSEEK_ORIGIN;
    }
  } catch {
    return DEEPSEEK_ORIGIN;
  }

  // Official OpenAI-compatible host. LangChain appends /chat/completions.
  return configured.replace(/\/v1$/, "") || DEEPSEEK_ORIGIN;
}

function resolveDeepSeekModel() {
  const model = env.deepseekModel.trim();
  if (!model || model === "deepseek-chat" || model === "deepseek-reasoner") {
    return "deepseek-v4-flash";
  }
  return model;
}

function createDeepSeekModel() {
  if (!env.deepseekApiKey) {
    throw new Error("DEEPSEEK_API_KEY is not configured.");
  }

  const baseURL = resolveDeepSeekBaseUrl();
  const model = resolveDeepSeekModel();
  console.info(`[AI] DeepSeek ${model} → ${baseURL}/chat/completions`);

  return new ChatOpenAI({
    model,
    temperature: 0.5,
    maxRetries: 2,
    timeout: env.aiTimeoutMs,
    apiKey: env.deepseekApiKey,
    useResponsesApi: false,
    configuration: {
      baseURL,
      timeout: env.aiTimeoutMs,
      maxRetries: 2,
    },
  });
}

function createStructuredModel() {
  return {
    model: createDeepSeekModel().withStructuredOutput(AIResponseSchema, {
      method: "jsonMode",
    }),
    name: resolveDeepSeekModel(),
  };
}

function asAIResponse(value: unknown): AIResponse {
  return AIResponseSchema.parse(value);
}

async function prepareStateNode(state: AIStateType): Promise<Partial<AIStateType>> {
  const trimmedContext = (state.textFileContext ?? "").slice(0, env.aiMaxContextChars);

  return {
    prompt: `Generate questions based on: ${state.prompt}`,
    textFileContext: trimmedContext ? `\nUser Uploaded Context:\n${trimmedContext}` : "",
  };
}

async function invokeStructuredModel(
  // Structured-output runnables differ slightly across providers; invoke is enough here.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: { invoke: (...args: any[]) => Promise<unknown> },
  fullPrompt: string,
  signal: AbortSignal
) {
  const schemaInstructions = `
You are an expert AI question generator. You MUST return ONLY valid JSON matching this exact JSON schema:
{
  "preface": "Brief friendly introduction string",
  "metadata": [
    // For multiple_choice:
    {
      "type": "multiple_choice",
      "text": "Question text",
      "opt": { "A": "Option A text", "B": "Option B text", "C": "Option C text", "D": "Option D text" },
      "correctOpt": 0, // 0 for A, 1 for B, 2 for C, 3 for D
      "explanation": "Concise explanation of correct answer",
      "correctAnswer": "A" // Optional letter
    },
    // For true_or_false, short_answer, or essay:
    {
      "type": "true_or_false", // or "short_answer" or "essay"
      "text": "Question text",
      "correctOption": 0, // 0=True, 1=False for true_or_false (leave 0 for others)
      "explanation": "Concise explanation of correct answer",
      "correctAnswer": "True" // expected answer string
    }
  ]
}
Follow the per-type guidance closely. Return exactly the requested number of questions.
`;

  const raw = await model.invoke(
    [
      {
        role: "system",
        content: schemaInstructions,
      },
      {
        role: "user",
        content: fullPrompt,
      },
    ],
    { signal, timeout: env.aiTimeoutMs }
  );

  return asAIResponse(raw);
}

async function generateResponseNode(state: AIStateType): Promise<Partial<AIStateType>> {
  const fullPrompt = `${state.prompt}\n${state.textFileContext}`;
  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), env.aiTimeoutMs);

  try {
    const { model, name } = createStructuredModel();
    const response = await invokeStructuredModel(model, fullPrompt, abortController.signal);
    return { response, modelUsed: name };
  } finally {
    clearTimeout(timeout);
  }
}

function errorStatus(error: unknown) {
  if (typeof error === "object" && error !== null && "status" in error) {
    return (error as { status?: unknown }).status;
  }
  return undefined;
}

function isQuotaError(error: unknown) {
  return errorStatus(error) === 429;
}

function isAuthError(error: unknown) {
  if (errorStatus(error) === 401) return true;
  const message = error instanceof Error ? error.message : String(error ?? "");
  return (
    message.includes("Authentication Fails") ||
    message.includes("MODEL_AUTHENTICATION") ||
    message.includes("invalid api key") ||
    message.includes("api key") && message.toLowerCase().includes("invalid")
  );
}

function isConnectionError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error ?? "");
  const nested =
    error && typeof error === "object" && "cause" in error
      ? String((error as { cause?: unknown }).cause ?? "")
      : "";
  return (
    message.includes("Connection error") ||
    message.includes("fetch failed") ||
    message.includes("EAI_AGAIN") ||
    nested.includes("EAI_AGAIN") ||
    nested.includes("api.deepseek.com")
  );
}

function isTimeoutError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const name = "name" in error ? String(error.name) : "";
  const message = error instanceof Error ? error.message : String(error);
  return (
    name === "TimeoutError" ||
    name === "APIConnectionTimeoutError" ||
    message.includes("Request timed out")
  );
}

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === "AbortError";
}

export async function generateQuestions(initialPrompt: string, fileText: string) {
  try {
    const initialState = {
      prompt: initialPrompt,
      textFileContext: fileText,
      response: null,
      modelUsed: null,
    };

    const preparedState = {
      ...initialState,
      ...(await prepareStateNode(initialState)),
    };
    const result = await generateResponseNode(preparedState);

    return {
      status: "success" as const,
      metadata: result.response?.metadata || [],
      details: `Questions generated successfully${result.modelUsed ? ` via ${result.modelUsed}` : ""}.`,
    };
  } catch (error) {
    console.error("[AI_GENERATION_ERROR]", error);

    if (isAuthError(error)) {
      return {
        status: "error" as const,
        message: "DeepSeek rejected the API key. Check DEEPSEEK_API_KEY in mini/.env.",
        details: error instanceof Error ? error.message : "DeepSeek authentication failed",
      };
    }

    if (isQuotaError(error)) {
      return {
        status: "error" as const,
        message: "DeepSeek quota is exhausted. Try again later or check your plan.",
        details: error instanceof Error ? error.message : "AI quota exceeded",
      };
    }

    if (isConnectionError(error)) {
      return {
        status: "error" as const,
        message:
          "Could not reach api.deepseek.com. Check your network, then retry.",
        details: error instanceof Error ? error.message : "DeepSeek connection failed",
      };
    }

    if (isTimeoutError(error) || isAbortError(error)) {
      return {
        status: "error" as const,
        message:
          "DeepSeek timed out. Try fewer questions, or generate again.",
        details: error instanceof Error ? error.message : `AI request exceeded ${env.aiTimeoutMs}ms`,
      };
    }

    if (error instanceof Error && error.message.includes("DEEPSEEK_API_KEY")) {
      return {
        status: "error" as const,
        message: "Set DEEPSEEK_API_KEY in mini/.env to generate questions.",
        details: error.message,
      };
    }

    return {
      status: "error" as const,
      message:
        "An unexpected error occurred while generating questions. The model may be unavailable or the input may be invalid. Please try again later.",
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
