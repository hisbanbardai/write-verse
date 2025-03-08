import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogSchemaT } from "../../zod/blog";

export class BlogService {
  private prisma;

  constructor(databaseUrl: string) {
    this.prisma = new PrismaClient({
      datasourceUrl: databaseUrl,
    }).$extends(withAccelerate());
  }

  async getAllBlogs() {
    try {
      const blogs = await this.prisma.blogs.findMany();
      return blogs;
    } catch (error) {
      console.error("Error fetching all blogs", error);
      throw error;
    }
  }

  async createBlog(data: createBlogSchemaT, userId: number) {
    try {
      const createdBlog = await this.prisma.blogs.create({
        data: {
          title: data.title,
          content: data.content,
          authorId: userId,
        },
      });

      return createdBlog;
    } catch (error) {
      console.error("Error creating blog", error);
      throw error;
    }
  }
}
