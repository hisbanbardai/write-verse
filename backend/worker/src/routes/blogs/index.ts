import { Hono } from "hono";

export const blogsRouter = new Hono();

blogsRouter.get("/bulk", async (c) => {
  return c.text("Hello all blogs");
});

blogsRouter.post("/", async (c) => {
  return c.text("Hello create blog");
});

blogsRouter.put("/:id", async (c) => {
  return c.text("Hello update blog");
});

blogsRouter.get("/:id", async (c) => {
  return c.text("Hello get blog by id");
});
