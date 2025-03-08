import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signupSchemaT } from "../../zod/user";
import { verifyPassword } from "../../utils/password";

export class UserService {
  private prisma;

  constructor(databaseUrl: string) {
    this.prisma = new PrismaClient({
      datasourceUrl: databaseUrl,
    }).$extends(withAccelerate());
  }

  async findUserByUsername(username: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          username: username,
        },
      });

      return user;
    } catch (error) {
      console.error("Error finding user by username", error);
      throw error;
    }
  }

  async createUser(data: signupSchemaT) {
    try {
      const createdUser = await this.prisma.users.create({
        data: {
          username: data.username,
          password: data.password,
        },
      });
      return createdUser;
    } catch (error) {
      console.error("Error creating", error);
      throw error;
    }
  }

  async validateUserCredentials(data: signupSchemaT) {
    try {
      const existingUser = await this.findUserByUsername(data.username);
      if (existingUser) {
        const hashedPassword = existingUser.password;
        const { isValid } = await verifyPassword({
          password: data.password,
          hashedPassword: hashedPassword,
        });

        if (isValid) {
          return existingUser;
        }
      }

      return false;
    } catch (error) {
      console.error("Error validating user credentials", error);
      throw error;
    }
  }
}
