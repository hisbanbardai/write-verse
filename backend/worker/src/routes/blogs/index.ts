import { Hono } from "hono";
import { BlogService } from "./blog.service";
import { authMiddleware } from "../../middlewares/auth";
import { createBlogSchema, updateBlogSchema } from "@hisbanshiraz/common";

export const blogsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    user: Record<string, string>;
  };
}>();

blogsRouter.use("*", authMiddleware);

blogsRouter.get("/bulk", async (c) => {
  try {
    //get the page number and page size
    const pageNumber = Number(c.req.query("page")) || 1;
    const pageSize = Number(c.req.query("pageSize")) || 5;

    if (
      isNaN(pageNumber) ||
      pageNumber < 1 ||
      isNaN(pageSize) ||
      pageSize < 1
    ) {
      return c.json({ message: "Invalid page number or pageSize" }, 400);
    }

    //calculate offset (how many records to skip)
    const offset = (pageNumber - 1) * pageSize;

    //fetch paginated blogs
    const blogService = new BlogService(c.env.DATABASE_URL);
    const { blogs, totalCount } = await blogService.getAllBlogs(
      offset,
      pageSize
    );

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / pageSize);

    return c.json({ blogs, totalPages }, 200);
  } catch (error) {
    console.error("Failed to fetch the blogs", error);
    return c.json({ message: "Failed to fetch the blogs" }, 500);
  }
});

blogsRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const user = c.get("user");
    const userId = Number(user.id);

    //check if valid userId
    if (!userId || isNaN(userId)) {
      return c.json({ message: "Invalid user id" }, 400);
    }

    //validate blog schema with zod
    const result = createBlogSchema.safeParse(body);

    if (!result.success) {
      return c.json({ message: result.error.formErrors.fieldErrors }, 400);
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

blogsRouter.put("/:blogId", async (c) => {
  try {
    const blogId = Number(c.req.param("blogId"));
    const user = c.get("user");
    const userId = Number(user.id);
    const body = await c.req.json();

    //check if blog id is valid
    if (!blogId || isNaN(blogId)) {
      return c.json({ message: "Invalid blog id" }, 400);
    }

    //check if valid userId
    if (!userId || isNaN(userId)) {
      return c.json({ message: "Invalid user id" }, 400);
    }

    //check if body is empty
    if (!Object.keys(body).length) {
      return c.json({ message: "No field provided to update" }, 400);
    }

    //validate update blog schema using zod
    const result = updateBlogSchema.safeParse(body);
    if (!result.success) {
      return c.json({ message: result.error.format() });
    }

    //initialize BlogService instance to initialize prisma client
    const blogService = new BlogService(c.env.DATABASE_URL);

    //check if blog exists
    const existingBlog = await blogService.getBlogById(blogId);

    if (!existingBlog) {
      return c.json({ message: "Blog does not exist" }, 404);
    }

    //check if said user is the owner of the blog
    if (existingBlog.author.id !== userId) {
      return c.json(
        { message: "You do not have the permissions to update this blog" },
        403
      );
    }

    //call updateBlog method
    const updatedBlog = await blogService.updateBlog(body, blogId);

    if (updatedBlog) {
      return c.json({ message: "Blog updated successfully", updatedBlog }, 200);
    }

    return c.json({ message: "Failed to update the blog" }, 500);
  } catch (error) {
    console.error("Failed to update the blog", error);
    return c.json({ message: "Failed to update the blog" }, 500);
  }
});

blogsRouter.get("/my-blogs", async (c) => {
  try {
    const user = c.get("user");
    const userId = Number(user.id);

    const blogService = new BlogService(c.env.DATABASE_URL);
    const userBlogs = await blogService.getBlogsByUserId(userId);

    return c.json({ blogs: userBlogs }, 200);
  } catch (error) {
    console.error("Failed to fetch the blogs", error);
    return c.json({ message: "Failed to fetch the blogs" }, 500);
  }
});

blogsRouter.get("/:blogId", async (c) => {
  try {
    const blogId = Number(c.req.param("blogId"));

    //check if blog id is valid
    if (!blogId || isNaN(blogId)) {
      return c.json({ message: "Invalid blog id" }, 400);
    }

    //initialize BlogService instance to initialize prisma client
    const blogService = new BlogService(c.env.DATABASE_URL);

    //call getBlogById method
    const existingBlog = await blogService.getBlogById(blogId);

    if (existingBlog) {
      return c.json({ existingBlog }, 200);
    }

    return c.json({ message: "Blog does not exist" }, 404);
  } catch (error) {
    console.error("Failed to fetch the blog by id", error);
    return c.json({ message: "Failed to fetch the blog by id" }, 500);
  }
});
