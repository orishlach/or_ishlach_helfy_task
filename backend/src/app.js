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
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:3000",
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


export default app;
