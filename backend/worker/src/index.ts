import { Hono } from "hono";
import { rootRouter } from "./routes/root";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/api/v1/*", cors());

app.route("/api/v1", rootRouter);

app.get("/", (c) => {
  return c.redirect("/api/v1/blogs/bulk");
});

//fallback for undefined routes
app.notFound((c) => {
  return c.json({ error: "Route not found" }, 404);
});

export default app;
