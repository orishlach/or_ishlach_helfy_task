import express from "express";
import cors from "cors";
import { ApiError } from "./utils/api-error.js";

const app = express();

// Basic middleware setup
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// import the routes
import healthCheckRouter from "./routes/healthcheck.routes.js";
import tasksRouter from "./routes/tasks.routes.js";

// use the routes
app.use("/api/tasks", tasksRouter);
app.use("/api/healthcheck", healthCheckRouter);

app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

app.use((err, req, res, next) => {
  console.error("Error caught:", err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});

export default app;
