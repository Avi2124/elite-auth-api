import express from "express";
import authRoutes from "./routes/authRoutes.js";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);

export default app;