import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return c.json(
        { message: "Authorization header missing or invalid" },
        401
      );
    }

    const token = authHeader.split(" ")[1];

    const payload = await verify(token, c.env.JWT_SECRET);

    if (payload) {
      c.set("userId", payload.userId);
      return await next();
    }
  } catch (error) {
    return c.json({ message: "Invalid token", error }, 401);
  }

  return c.json({ message: "You are not authorized" }, 401);
};
