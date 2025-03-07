import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().optional(),
  username: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be of at least 6 characters long"),
});

export type signupSchemaT = z.infer<typeof signupSchema>;
