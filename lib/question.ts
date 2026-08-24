export interface Settings {
 general: {
 shuffleQuestions: boolean;
 shuffleOptions: boolean;
 allowRetake: boolean;
 };
 security: {
 enableTabSwitching: boolean;
 disableCopyPaste: boolean;
 };
  users: {
    usersAdded: boolean;
    invitees: Array<{ name: string; email: string }>;
  };
 testTime: number;
}


export type Question = {
 id: string;
 testId: string;
 text: string;
 type:"multiple_choice"|"short_answer"|"essay"|"true_or_false";
 options?: unknown;
 correctOption?: number | null;
 correctAnswer?: string | null;
 marks: number;
 explanation?: string | null;
};