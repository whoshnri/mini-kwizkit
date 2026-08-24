import { z } from "zod";

export const genderSchema = z.enum(["male", "female", "other"]);
export const levelSchema = z.enum([
  "jss1",
  "jss2",
  "jss3",
  "ss1",
  "ss2",
  "ss3",
  "nd1",
  "nd2",
  "hnd1",
  "hnd2",
  "level_100",
  "level_200",
  "level_300",
  "level_400",
  "level_500",
  "postgraduate",
]);
export const difficultySchema = z.enum(["easy", "medium", "hard"]);
export const questionTypeSchema = z.enum([
  "multiple_choice",
  "short_answer",
  "essay",
  "true_or_false",
]);
export const transactionTypeSchema = z.enum(["cr", "dr"]);
export const attendanceStatusSchema = z.enum([
  "present",
  "absent",
  "late",
  "excused",
]);
export const materialTypeSchema = z.enum([
  "slide",
  "note",
  "video",
  "audio",
  "document",
  "link",
  "other",
]);
export const planSchema = z.enum([
  "solo_paygo",
  "solo_starter",
  "solo_growth",
  "inst_starter",
  "inst_school",
  "inst_campus",
  "inst_enterprise",
]);

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().nullable(),
  username: z.string().nullable().optional(),
  uniqueId: z.string().nullable(),
  image: z.string().nullable(),
  gender: genderSchema,
  phone: z.string().nullable(),
  city: z.string().nullable(),
  accountId: z.string(),
  isActive: z.boolean().optional(),
  plan: planSchema,
  aiTokensRemaining: z.number().optional(),
  planExpiresAt: z.string().nullable().optional(),
  walletId: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Gender = z.infer<typeof genderSchema>;
export type Level = z.infer<typeof levelSchema>;
export type Difficulty = z.infer<typeof difficultySchema>;
export type QuestionType = z.infer<typeof questionTypeSchema>;
export type TransactionType = z.infer<typeof transactionTypeSchema>;
export type AttendanceStatus = z.infer<typeof attendanceStatusSchema>;
export type MaterialType = z.infer<typeof materialTypeSchema>;
export type Plan = z.infer<typeof planSchema>;
export type User = z.infer<typeof userSchema>;
