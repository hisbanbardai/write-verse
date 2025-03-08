import { Hono } from "hono";
import { BlogService } from "./blog.service";
import { authMiddleware } from "../../middlewares/auth";
import { createBlogSchema } from "../../zod/blog";

export const blogsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogsRouter.use("*", authMiddleware);

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
  try {
    const body = await c.req.json();
    const userId = Number(c.get("userId"));

    //check if valid userId
    if (!userId || isNaN(userId)) {
      return c.json({ message: "Invalid user id" }, 400);
    }

    //validate blog schema with zod
    const result = createBlogSchema.safeParse(body);

    if (!result.success) {
      return c.json({ message: result.error.format() }, 400);
    }

    //initialize BlogService instance to initialize prisma client
    const blogService = new BlogService(c.env.DATABASE_URL);
    const createdBlog = await blogService.createBlog(body, userId);

    if (createdBlog) {
      return c.json({ message: "Blog created successfully", createdBlog }, 201);
    }

    return c.json({ message: "Failed to create a blog" }, 500);
  } catch (error) {
    console.error("Failed to create a blog", error);
    return c.json({ message: "Failed to create a blog" }, 500);
  }
});

blogsRouter.put("/:id", async (c) => {
  return c.text("Hello update blog");
});

blogsRouter.get("/:id", async (c) => {
  return c.text("Hello get blog by id");
});
