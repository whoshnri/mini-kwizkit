export type TestInvitee = { name: string; email: string };

export interface Settings {
  general: {
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
    allowRetake: boolean;
    showResults: boolean;
    passPercentage: number;
  };
  security: {
    enableTabSwitching: boolean;
    tabSwitchLimit: number;
    disableCopyPaste: boolean;
    requireWebcam: boolean;
    requireMic: boolean;
    accessPassword?: string;
  };
  users: {
    usersAdded: boolean;
    invitees: TestInvitee[];
  };
  testTime: number;
}

export const DEFAULT_SETTINGS: Settings = {
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

export function parseInviteeLines(input: string): TestInvitee[] {
  const seen = new Set<string>();
  const result: TestInvitee[] = [];

  for (const raw of input.split(/[\n,;]+/)) {
    const line = raw.trim();
    if (!line) continue;

    const angled = line.match(/^(.*?)\s*<([^>]+)>$/);
    let name = "";
    let email = line;

    if (angled) {
      name = angled[1].replace(/^["']|["']$/g, "").trim();
      email = angled[2].trim();
    }

    email = email.toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || seen.has(email)) continue;

    seen.add(email);
    result.push({
      name: name || email.split("@")[0] || email,
      email,
    });
  }

  return result;
}

export function sanitizeInvitees(invitees: TestInvitee[] | undefined | null): TestInvitee[] {
  const seen = new Set<string>();
  const result: TestInvitee[] = [];

  for (const item of invitees ?? []) {
    const email = String(item?.email ?? "")
      .trim()
      .toLowerCase();
    const name = String(item?.name ?? "").trim();
    if (!email || seen.has(email)) continue;
    seen.add(email);
    result.push({ name: name || email.split("@")[0] || email, email });
  }

  return result;
}

export function normalizeSettings(raw?: Partial<Settings> | null): Settings {
  const invitees = sanitizeInvitees(raw?.users?.invitees);

  return {
    general: { ...DEFAULT_SETTINGS.general, ...raw?.general },
    security: { ...DEFAULT_SETTINGS.security, ...raw?.security },
    users: {
      usersAdded: invitees.length > 0 || Boolean(raw?.users?.usersAdded),
      invitees,
    },
    testTime: typeof raw?.testTime === "number" ? raw.testTime : 0,
  };
}
