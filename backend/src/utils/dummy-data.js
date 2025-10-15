import { Task } from "../modles/Task.js";
import { TaskPriorityEnum } from "./constants.js";

class TaskStore {
  constructor() {
    this.tasks = this.initializeDummyData();
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
      }),
      new Task({
        id: 4,
        title: "Update dependencies",
        description: "Update all npm packages to latest stable versions",
        completed: false,
        priority: TaskPriorityEnum.LOW,
        createdAt: new Date("2025-01-11T11:00:00"),
      }),
      new Task({
        id: 5,
        title: "Team meeting preparation",
        description: "Prepare slides for quarterly review meeting",
        completed: true,
        priority: TaskPriorityEnum.MEDIUM,
        createdAt: new Date("2025-01-08T13:30:00"),
      }),
      new Task({
        id: 6,
        title: "Implement caching layer",
        description: "Add Redis caching to improve API response times",
        completed: false,
        priority: TaskPriorityEnum.MEDIUM,
        createdAt: new Date("2025-01-13T09:45:00"),
      }),
      new Task({
        id: 7,
        title: "Database backup automation",
        description: "Set up automated daily backups for production database",
        completed: false,
        priority: TaskPriorityEnum.HIGH,
        createdAt: new Date("2025-01-15T07:00:00"),
      }),
      new Task({
        id: 8,
        title: "Code review guidelines",
        description: "Create coding standards document for new developers",
        completed: true,
        priority: TaskPriorityEnum.LOW,
        createdAt: new Date("2025-01-05T14:20:00"),
      }),
      new Task({
        id: 9,
        title: "Performance optimization",
        description: "Optimize slow database queries identified in monitoring",
        completed: false,
        priority: TaskPriorityEnum.HIGH,
        createdAt: new Date("2025-01-14T15:00:00"),
      }),
      new Task({
        id: 10,
        title: "Security audit",
        description: "Run security vulnerability scan on dependencies",
        completed: false,
        priority: TaskPriorityEnum.MEDIUM,
        createdAt: new Date("2025-01-15T10:00:00"),
      }),
      new Task({
        id: 11,
        title: "Write unit tests",
        description: "Add missing unit tests for user service module",
        completed: false,
        priority: TaskPriorityEnum.MEDIUM,
        createdAt: new Date("2025-01-12T12:30:00"),
      }),
      new Task({
        id: 12,
        title: "Deploy to staging",
        description:
          "Deploy latest version to staging environment for QA testing",
        completed: true,
        priority: TaskPriorityEnum.HIGH,
        createdAt: new Date("2025-01-09T16:00:00"),
      }),
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
