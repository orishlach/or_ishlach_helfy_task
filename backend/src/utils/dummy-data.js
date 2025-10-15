import { Task } from "../models/Task.js";
import { TaskPriorityEnum } from "./constants.js";

class TaskStore {
  constructor() {
    this.tasks = this.initializeDummyData();
    this.nextId = Math.max(...this.tasks.map((task) => task.id)) + 1;
  }

  initializeDummyData() {
    return [
      new Task({
        id: 1,
        title: "Complete project documentation",
        description:
          "Write comprehensive documentation for the new API endpoints including examples and error codes",
        completed: false,
        priority: TaskPriorityEnum.HIGH,
        createdAt: new Date("2025-01-10T09:00:00"),
      }),
      new Task({
        id: 2,
        title: "Review pull requests",
        description: "Review and merge pending PRs from the team",
        completed: true,
        priority: TaskPriorityEnum.MEDIUM,
        createdAt: new Date("2025-01-12T10:15:00"),
      }),
      new Task({
        id: 3,
        title: "Fix login bug",
        description:
          "Users reporting intermittent login failures on mobile devices",
        completed: false,
        priority: TaskPriorityEnum.HIGH,
        createdAt: new Date("2025-01-14T08:20:00"),
      })
    ];
  }

  getAllTasks() {
    return this.tasks;
  }

  createTask({ title, description = "", priority = TaskPriorityEnum.MEDIUM }) {
    const newTask = new Task({
      id: this.nextId++,
      title,
      description,
      priority,
    });
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id, data) {
    const taskIndex = this.tasks.findIndex((t) => Number(t.id) === Number(id));

    if (taskIndex === -1) return null;

    const existingTask = this.tasks[taskIndex];

    const updatedTask = {
      ...existingTask,
      ...data,
      id: existingTask.id,
      createdAt: existingTask.createdAt,
    };

    this.tasks[taskIndex] = updatedTask;

    return updatedTask;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  toggleTaskCompletion(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;
    task.completed = !task.completed;
    return task;
  }
}

export { TaskStore };
