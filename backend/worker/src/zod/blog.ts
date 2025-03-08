import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type createBlogSchemaT = z.infer<typeof createBlogSchema>;
