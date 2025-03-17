import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name cannot be empty"),
  lastName: z.string().min(1, "Last name cannot be empty"),
  username: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be of at least 6 characters long"),
});

export type signupSchemaT = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  username: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password field cannot be empty"),
});

export type signinSchemaT = z.infer<typeof signinSchema>;
