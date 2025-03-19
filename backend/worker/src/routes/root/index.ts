import { Context, Hono } from "hono";
import { blogsRouter } from "../blogs";
import { usersRouter } from "../users";
import { authMiddleware } from "../../middlewares/auth";

export const rootRouter = new Hono();

rootRouter.route("/users", usersRouter);
rootRouter.route("/blogs", blogsRouter);

rootRouter.get("/auth/validate-token", authMiddleware, (c: Context) => {
  if (c.get("userId")) {
    return c.json({ valid: true }, 200);
  }
  return c.json({ valid: false }, 401);
});
