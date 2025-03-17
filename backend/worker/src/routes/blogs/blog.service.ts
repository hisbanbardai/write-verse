import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogSchemaT, updateBlogSchemaT } from "../../zod/blog";

export class BlogService {
  private prisma;

  constructor(databaseUrl: string) {
    this.prisma = new PrismaClient({
      datasourceUrl: databaseUrl,
    }).$extends(withAccelerate());
  }

  async getAllBlogs(offset: number, pageSize: number) {
    try {
      // Fetch paginated blogs
      const blogs = await this.prisma.blogs.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          author: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        skip: offset,
        take: pageSize,
      });

      //Fetch total count of blogs
      const totalCount = await this.prisma.blogs.count();
      return { blogs, totalCount };
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

  async updateBlog(data: updateBlogSchemaT, blogId: number) {
    try {
      const updatedBlog = await this.prisma.blogs.update({
        data: {
          title: data.title,
          content: data.content,
        },
        where: {
          id: blogId,
        },
      });

      return updatedBlog;
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  }

  async getBlogById(blogId: number) {
    try {
      const existingBlog = await this.prisma.blogs.findUnique({
        where: {
          id: blogId,
        },
      });
      return existingBlog;
    } catch (error) {
      console.error("Error fetching the blog by id", error);
      throw error;
    }
  }
}
