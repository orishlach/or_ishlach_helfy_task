import { createContext, useState, useEffect } from "react";
import { apiService } from "../services/api.jsx";

export const TasksContext = createContext({
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  toggleTask: () => {},
  isLoading: false,
  error: null,
});

export default function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setIsLoading(true);
    setError(null);
    try {
      const tasksData = await apiService.getTasks();
      // Map backend task structure to frontend structure
      const mappedTasks = (tasksData || []).map((task) => ({
        ...task,
        status: task.completed ? "completed" : "active",
        deadline: task.createdAt, // Use createdAt as deadline for now since backend doesn't have deadline
      }));
      setTasks(mappedTasks);
    } catch (err) {
      setError("Failed to load tasks");
      console.error("Error loading tasks:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function addTask(task) {
    setIsLoading(true);
    setError(null);
    try {
      // Map frontend task structure to backend structure
      const backendTask = {
        title: task.title,
        description: task.description,
        priority: task.priority || "medium",
      };
      const newTask = await apiService.createTask(backendTask);
      // Map backend response to frontend structure
      const mappedTask = {
        ...newTask,
        status: newTask.completed ? "completed" : "active",
        deadline: newTask.createdAt,
      };
      setTasks((prevTasks) => [mappedTask, ...prevTasks]);
    } catch (err) {
      setError("Failed to create task");
      console.error("Error creating task:", err);
      throw err; // Re-throw so the form can handle it
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteTask(taskId) {
    setIsLoading(true);
    setError(null);
    try {
      await apiService.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError("Failed to delete task");
      console.error("Error deleting task:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function toggleTask(taskId) {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTask = await apiService.toggleTask(taskId);
      // Map backend response to frontend structure
      const mappedTask = {
        ...updatedTask,
        status: updatedTask.completed ? "completed" : "active",
        deadline: updatedTask.createdAt,
      };
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId) {
            return mappedTask;
          }
          return task;
        }),
      );
    } catch (err) {
      setError("Failed to toggle task status");
      console.error("Error toggling task:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const tasksContext = {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    isLoading,
    error,
  };

  return (
    <TasksContext.Provider value={tasksContext}>
      {children}
    </TasksContext.Provider>
  );
}
