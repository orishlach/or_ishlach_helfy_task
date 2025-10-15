import { TaskPriorityEnum } from "../utils/constants.js";

class Task {
  constructor(data = {}) {
    this.id = data.id;
    this.title = data.title || "";
    this.description = data.description || "";
    this.completed = data.completed || false;
    this.priority = data.priority || TaskPriorityEnum.MEDIUM;
    this.createdAt = data.createdAt || new Date();
  }
}

export { Task };
