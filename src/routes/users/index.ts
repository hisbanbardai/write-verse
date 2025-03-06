import { Hono } from "hono";

export const usersRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

usersRouter.post("/signup", async (c) => {});

usersRouter.post("/signin", async (c) => {
  return c.text("Hello signin");
});
