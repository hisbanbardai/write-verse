import { Hono } from "hono";
import { rootRouter } from "./routes/root";

const app = new Hono();

app.route("/api/v1", rootRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
