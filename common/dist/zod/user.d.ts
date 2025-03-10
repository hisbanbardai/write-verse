import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    name?: string | undefined;
}, {
    username: string;
    password: string;
    name?: string | undefined;
}>;
export type signupSchemaT = z.infer<typeof signupSchema>;
export declare const signinSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type signinSchema = z.infer<typeof signinSchema>;
