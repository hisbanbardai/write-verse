import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(6, "Title must be of at least 6 characters"),
  content: z.string().min(6, "Content must be of at least 6 characters"),
});

export type createBlogSchemaT = z.infer<typeof createBlogSchema>;

export const updateBlogSchema = z.object({
  title: z.string().min(6, "Title must be of at least 6 characters").optional(),
  content: z
    .string()
    .min(6, "Content must be of at least 6 characters")
    .optional(),
});

export type updateBlogSchemaT = z.infer<typeof updateBlogSchema>;
