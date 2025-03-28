import { Hono } from "hono";
import { signinSchema, signupSchema } from "@hisbanshiraz/common";
import { UserService } from "./user.service";
import { hashPassword, verifyPassword } from "../../utils/password";
import { sign } from "hono/jwt";

export const usersRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

usersRouter.post("/signup", async (c) => {
  try {
    const body = await c.req.json();
    const result = signupSchema.safeParse(body);

    //validate schema
    if (!result.success) {
      return c.json(
        {
          message: "Invalid email or password",
          error: result.error.format(),
        },
        400
      );
    }

    const userService = new UserService(c.env.DATABASE_URL);

    //check if user already exists
    const existingUser = await userService.findUserByUsername(body.username);

    if (existingUser) {
      return c.json(
        { message: "A user with that email address already exists." },
        400
      );
    }

    //hash password
    const { hashedPassword } = await hashPassword({ password: body.password });
    const signupPayload = { ...body, password: hashedPassword };

    // //add user in db
    const createdUser = await userService.createUser(signupPayload);

    if (createdUser) {
      //generate jwt token
      const payload = {
        id: createdUser.id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        username: createdUser.username,
      };

      const token = await sign(payload, c.env.JWT_SECRET);

      return c.json({ message: "User created successfully", token }, 201);
    }

    return c.json({ message: "Failed to create a user" }, 500);
  } catch (error) {
    console.error("Failed to create a user", error);
    return c.json({ message: "Failed to create a user" }, 500);
  }
});

usersRouter.post("/signin", async (c) => {
  try {
    const body = await c.req.json();
    const result = signinSchema.safeParse(body);

    if (!result.success) {
      return c.json(
        {
          message: "Invalid email or password",
          error: result.error.format(),
        },
        401
      );
    }

    //validate credentials
    const userService = new UserService(c.env.DATABASE_URL);
    const response = await userService.validateUserCredentials(body);

    if (response) {
      //generate jwt token

      const payload = {
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        username: response.username,
      };

      const token = await sign(payload, c.env.JWT_SECRET);

      return c.json({ message: "User logged in successfully", token }, 200);
    }

    return c.json({ message: "Invalid credentials" }, 401);
  } catch (error) {
    console.error("Failed to sign in", error);
    return c.json({ message: "Failed to sign in" }, 500);
  }
});
