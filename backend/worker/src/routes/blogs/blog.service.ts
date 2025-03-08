import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

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
}
