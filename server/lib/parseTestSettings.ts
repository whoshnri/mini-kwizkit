import type { Settings } from "./setting";

const DEFAULT_SETTINGS: Settings = {
  general: {
    shuffleQuestions: false,
    shuffleOptions: false,
    allowRetake: false,
    showResults: false,
    passPercentage: 50,
  },
  security: {
    enableTabSwitching: true,
    tabSwitchLimit: 3,
    disableCopyPaste: false,
    requireWebcam: false,
    requireMic: false,
    accessPassword: "",
  },
  users: {
    usersAdded: false,
    invitees: [],
  },
  testTime: 0,
};

export type PublicLiveSettings = {
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  allowRetake: boolean;
  showResults: boolean;
  passPercentage: number;
  enableTabSwitching: boolean;
  tabSwitchLimit: number;
  disableCopyPaste: boolean;
  requireWebcam: boolean;
  requireMic: boolean;
  requiresAccessPassword: boolean;
  testTime: number;
};

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function parseInvitees(value: unknown): Array<{ name: string; email: string }> {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      const row = asRecord(entry);
      const email = String(row.email ?? "").trim().toLowerCase();
      const name = String(row.name ?? "").trim();
      if (!email || !email.includes("@")) return null;
      return { email, name };
    })
    .filter((entry): entry is { name: string; email: string } => Boolean(entry));
}

export function parseTestSettings(
  raw: unknown,
  overrides?: {
    allowRetake?: boolean | null;
    showResults?: boolean | null;
    duration?: number | null;
  }
): Settings {
  const parsed =
    typeof raw === "string"
      ? (() => {
          try {
            return JSON.parse(raw) as unknown;
          } catch {
            return {};
          }
        })()
      : raw;

  const root = asRecord(parsed);
  const general = asRecord(root.general);
  const security = asRecord(root.security);
  const users = asRecord(root.users);

  return {
    general: {
      shuffleQuestions: Boolean(general.shuffleQuestions ?? DEFAULT_SETTINGS.general.shuffleQuestions),
      shuffleOptions: Boolean(general.shuffleOptions ?? DEFAULT_SETTINGS.general.shuffleOptions),
      allowRetake: Boolean(
        overrides?.allowRetake ?? general.allowRetake ?? DEFAULT_SETTINGS.general.allowRetake
      ),
      showResults: Boolean(
        overrides?.showResults ?? general.showResults ?? DEFAULT_SETTINGS.general.showResults
      ),
      passPercentage: Math.min(
        100,
        Math.max(0, Number(general.passPercentage ?? DEFAULT_SETTINGS.general.passPercentage))
      ),
    },
    security: {
      enableTabSwitching: Boolean(
        security.enableTabSwitching ?? DEFAULT_SETTINGS.security.enableTabSwitching
      ),
      tabSwitchLimit: Math.max(
        0,
        Number(security.tabSwitchLimit ?? DEFAULT_SETTINGS.security.tabSwitchLimit)
      ),
      disableCopyPaste: Boolean(
        security.disableCopyPaste ?? DEFAULT_SETTINGS.security.disableCopyPaste
      ),
      requireWebcam: Boolean(security.requireWebcam ?? DEFAULT_SETTINGS.security.requireWebcam),
      requireMic: Boolean(security.requireMic ?? DEFAULT_SETTINGS.security.requireMic),
      accessPassword: String(security.accessPassword ?? "").trim(),
    },
    users: {
      usersAdded: Boolean(users.usersAdded ?? DEFAULT_SETTINGS.users.usersAdded),
      invitees: parseInvitees(users.invitees),
    },
    testTime: Math.max(
      0,
      Number(overrides?.duration ?? root.testTime ?? DEFAULT_SETTINGS.testTime)
    ),
  };
}

export function settingsRequireLiveKit(settings: Settings): boolean {
  return Boolean(settings.security.requireWebcam || settings.security.requireMic);
}

export function toPublicLiveSettings(settings: Settings): PublicLiveSettings {
  return {
    shuffleQuestions: settings.general.shuffleQuestions,
    shuffleOptions: settings.general.shuffleOptions,
    allowRetake: settings.general.allowRetake,
    showResults: settings.general.showResults,
    passPercentage: settings.general.passPercentage,
    enableTabSwitching: settings.security.enableTabSwitching,
    tabSwitchLimit: settings.security.tabSwitchLimit,
    disableCopyPaste: settings.security.disableCopyPaste,
    requireWebcam: settings.security.requireWebcam,
    requireMic: settings.security.requireMic,
    requiresAccessPassword: Boolean(settings.security.accessPassword),
    testTime: settings.testTime,
  };
}

export function buildRulesFromSettings(settings: Settings): string[] {
  const rules: string[] = [];

  if (settings.testTime > 0) {
    rules.push(`You have ${settings.testTime} minute${settings.testTime === 1 ? "" : "s"} to complete this test.`);
  } else {
    rules.push("This test is untimed. Submit when you are finished.");
  }

  if (settings.security.enableTabSwitching) {
    const limit = settings.security.tabSwitchLimit;
    rules.push(
      limit > 0
        ? `Leaving the exam tab is tracked. More than ${limit} tab switch${limit === 1 ? "" : "es"} will end your attempt.`
        : "Leaving the exam tab is tracked and may end your attempt."
    );
  }

  if (settings.security.disableCopyPaste) {
    rules.push("Copying and pasting is disabled during this test.");
  }

  if (settings.security.requireWebcam) {
    rules.push("Your webcam must remain on. AI proctoring may monitor your video feed.");
  }

  if (settings.security.requireMic) {
    rules.push("Your microphone must remain on for ambient audio monitoring.");
  }

  if (settings.security.accessPassword) {
    rules.push("An access password is required before you can start.");
  }

  if (!settings.general.allowRetake) {
    rules.push("Retakes are disabled. You may only submit once.");
  }

  if (!settings.general.showResults) {
    rules.push("Your score will not be shown immediately after submission.");
  }

  rules.push("Do not use phones, books, or unauthorized devices during the test.");
  rules.push("Submit only when you are ready to lock the session.");

  return rules;
}

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function seededShuffle<T>(items: T[], seed: string): T[] {
  const result = [...items];
  let state = hashSeed(seed) || 1;

  const next = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x100000000;
  };

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
