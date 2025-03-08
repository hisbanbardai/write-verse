import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export class BlogService {
  private prisma;

  constructor(databaseUrl: string) {
    this.prisma = new PrismaClient({
      datasourceUrl: databaseUrl,
    }).$extends(withAccelerate());
  }
}
