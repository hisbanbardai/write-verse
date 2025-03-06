import { Hono } from "hono";

export const usersRouter = new Hono();

usersRouter.post("/signup", async (c) => {
  return c.text("Hello signup");
});

usersRouter.post("/signin", async (c) => {
  return c.text("Hello signin");
});
