import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "../controllers/tasks.controller.js";
import { taskValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/", getAllTasks);
router.post("/", taskValidator(), validate, createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTask);

export default router;
