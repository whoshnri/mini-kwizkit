import { z } from"zod";

export const studentSchema = z.object({
 firstName: z.string().min(1,"First name is required"),
 lastName: z.string().min(1,"Last name is required"),
 email: z.string().email("Invalid email address"),
 gender: z.enum(["male","female","other"]),
 image: z.string().optional(),
 classListId: z.string().optional(),
 sessionId: z.string().optional(),
 studentId: z.string().optional(),
 dateOfBirth: z.string().optional(),
 address: z.string().optional(),
 guardianName: z.string().optional(),
 guardianPhone: z.string().optional(),
 isActive: z.boolean().default(true),
});

export const classListSchema = z.object({
 name: z.string().min(1,"Class name is required"),
 subjectId: z.string().optional(),
 sessionId: z.string().optional(),
 session: z.string().optional(),
 unit: z.number().min(1,"Unit must be at least 1").optional(),
});

export const subjectSchema = z.object({
 name: z.string().min(1,"Subject name is required"),
 code: z.string().min(1,"Code is required"),
 description: z.string().optional(),
});

export const materialSchema = z.object({
 name: z.string().min(1,"Material name is required"),
 subjectId: z.string().min(1,"Subject is required"),
 type: z.string().min(1,"Type is required"),
});

export const certificateSchema = z.object({
 name: z.string().min(1,"Certificate name is required"),
 description: z.string().optional(),
 issuedBy: z.string().optional(),
 issuedAt: z.string().optional(),
});

export const topUpSchema = z.object({
 amount: z.number().min(1,"Amount must be at least $1"),
});

export const newTestSchema = z.object({
 name: z.string().min(1,"Test name is required"),
 subjectId: z.string().min(1,"Subject is required"),
 sessionId: z.string().optional(),
 session: z.string().optional(),
 units: z.number().min(1,"Units must be at least 1").optional(),
 numQuestions: z.number().min(1,"Number of questions must be at least 1"),
 durationMinutes: z.number().min(1,"Duration must be at least 1 minute"),
});

export const aiContentSchema = z.object({
 subject: z.string().optional(),
 numQuestions: z.number().min(1,"At least 1 question is required").max(20,"Maximum 20 questions"),
 prompt: z.string().min(5,"Prompt must be at least 5 characters long"),
 questionTypes: z.array(z.enum(["multiple_choice","true_or_false","short_answer","essay"])).min(1,"Select at least one question type"),
});

export const academicSessionSchema = z.object({
 name: z.string().min(2,"School year is required (e.g. 2024/2025)"),
 isCurrent: z.boolean().optional(),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
export type ClassListFormValues = z.infer<typeof classListSchema>;
export type SubjectFormValues = z.infer<typeof subjectSchema>;
export type MaterialFormValues = z.infer<typeof materialSchema>;
export type CertificateFormValues = z.infer<typeof certificateSchema>;
export type TopUpFormValues = z.infer<typeof topUpSchema>;
export type NewTestFormValues = z.infer<typeof newTestSchema>;
export type AiContentFormValues = z.infer<typeof aiContentSchema>;
export type AcademicSessionFormValues = z.infer<typeof academicSessionSchema>;
