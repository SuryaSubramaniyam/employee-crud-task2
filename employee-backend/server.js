import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
import createError from "http-errors";

import connectDB from "./db.js";

import employeeRoutes from "./routes/employees.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);

// 404 → Route Not Found
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// Error Handler
app.use(errorHandler);

// Server + DB Start
const PORT = process.env.PORT || 8888;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server start error:", err.message);
    process.exit(1);
  }
};

startServer();
