import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { TaskStore } from "../utils/dummy-data.js";

const taskStore = new TaskStore();

const getAllTasks = asyncHandler(async (req, res, next) => {
  console.log("Fetching all tasks");
  const allTasks = taskStore.getAllTasks();
  res.status(200).json(new ApiResponse(200, "Success", allTasks));
});

const createTask = asyncHandler(async (req, res) => {
  console.log("Creating a new task");
  const { title, description, priority } = req.body;

  if (!title) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Title is required"));
  }

  const newTask = taskStore.createTask({ title, description, priority });
  res.status(201).json(new ApiResponse(201, "Task created successfully", newTask));
});

const updateTask = asyncHandler(async (req, res) => {
  console.log("Updating task with ID:", req.params.id);
  const id = parseInt(req.params.id);

  const updated = taskStore.updateTask(id, req.body);

  if (!updated) {
    return res
      .status(404)
      .json(new ApiResponse(404, "Task not found"));
  }

  res.status(200).json(
    new ApiResponse(200, `Task ${id} updated successfully`, updated),
  );
});

const deleteTask = asyncHandler(async (req, res) => {
  console.log("Deleting task with ID:", req.params.id);
  const id = parseInt(req.params.id);
  const deleted = taskStore.deleteTask(id);

  if (!deleted) {
    return res
      .status(404)
      .json(new ApiResponse(404, "Task not found"));
  }

  res.status(204).send();
});

const toggleTask = asyncHandler(async (req, res) => {
  console.log("Toggling completion status for task with ID:", req.params.id);
  const id = parseInt(req.params.id);
  const toggled = taskStore.toggleTaskCompletion(id);

  if (!toggled) {
    return res
      .status(404)
      .json(new ApiResponse(404, "Task not found"));
  }

  res.status(200).json(new ApiResponse(200, "Task status toggled successfully", toggled));
});

export { getAllTasks, createTask, updateTask, deleteTask, toggleTask };
