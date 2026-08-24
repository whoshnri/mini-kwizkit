function optional(name: string, fallback = "") {
  return process.env[name]?.trim() || fallback;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  databaseUrl: optional("DATABASE_URL", "file:./dev.db"),
  livekitUrl: optional("LIVEKIT_URL") || optional("NEXT_PUBLIC_LIVEKIT_URL"),
  livekitApiKey: optional("LIVEKIT_API_KEY"),
  livekitApiSecret: optional("LIVEKIT_API_SECRET"),
  deepseekApiKey: optional("DEEPSEEK_API_KEY"),
  deepseekModel: optional("DEEPSEEK_MODEL", "deepseek-v4-flash"),
  deepseekBaseUrl: optional("DEEPSEEK_BASE_URL", "https://api.deepseek.com"),
  aiTimeoutMs: Number(process.env.AI_TIMEOUT_MS ?? 120_000),
  aiMaxContextChars: Number(process.env.AI_MAX_CONTEXT_CHARS ?? 24_000),
  publicUrl: optional("NEXT_PUBLIC_APP_URL", "http://localhost:3002"),
};
