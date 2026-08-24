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
    invitees: Array<{ name: string; email: string }>;
  };
  testTime: number;
}
