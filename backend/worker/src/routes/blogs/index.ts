import { Hono } from "hono";
import { BlogService } from "./blog.service";

export const blogsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

blogsRouter.get("/bulk", async (c) => {
  try {
    const blogService = new BlogService(c.env.DATABASE_URL);
    const blogs = await blogService.getAllBlogs();

    return c.json({ blogs }, 200);
  } catch (error) {
    console.error("Failed to fetch the blogs", error);
    return c.json({ message: "Failed to fetch the blogs" }, 500);
  }
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
