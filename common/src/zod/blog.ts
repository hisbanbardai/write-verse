import { z } from "zod";

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(6, "Title must be at least 6 characters")
    .max(255, "Title is too long"), // Limit to a reasonable length
  content: z.string().min(6, "Content must be at least 6 characters"),
});

export type createBlogSchemaT = z.infer<typeof createBlogSchema>;

export const updateBlogSchema = z.object({
  title: z.string().min(6).max(255).optional(),
  content: z.string().min(6).optional(),
});

export type updateBlogSchemaT = z.infer<typeof updateBlogSchema>;
