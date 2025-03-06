import { Hono } from "hono";
import { blogsRouter } from "../blogs";
import { usersRouter } from "../users";

export const rootRouter = new Hono();

rootRouter.route("/users", usersRouter);
rootRouter.route("/blogs", blogsRouter);
