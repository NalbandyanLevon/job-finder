import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleweare/error.middlewear";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import jobRouter from "./routes/job.routes";
import userRouter from "./routes/user.routes";
import { authMiddleWear } from "./middleweare/auth.middlewear";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);

app.get("/", (req, res) => {
  res.json({ message: "API working with TypeScript 🚀" });
});

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
