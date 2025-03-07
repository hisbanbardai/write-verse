import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcryptjs from "bcryptjs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/hash", async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    res.json({ hashedPassword });
  } catch (error) {
    res.status(500).json({ error: "Failed to hash password" });
  }
});

app.post("/verify", async (req, res) => {
  try {
    const { password, hashedPassword } = req.body;
    const isValid = await bcryptjs.compare(password, hashedPassword);
    res.json({ isValid });
  } catch (error) {
    res.status(500).json({ error: "Failed to verify password" });
  }
});

app.listen(PORT, () => {
  console.log("External server is running on", PORT);
});
