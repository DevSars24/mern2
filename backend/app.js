import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js";
import cors from "cors";

// Load environment variables and log to debug
dotenv.config({ path: "./config/config.env" });
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

const app = express();

// ✅ Setup CORS to allow frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Fallback to hardcoded value
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ Optional but safe: add CORS headers manually
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/v1/message", messageRouter);

// ✅ Connect to DB
dbConnection();

export default app;