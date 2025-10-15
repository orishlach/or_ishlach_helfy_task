const API_BASE_URL = "http://localhost:4000/api";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data.data || data;
      }

      return null;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // GET /api/tasks
  async getTasks() {
    console.log("Fetching all tasks");
    return this.request("/tasks");
  }

  // POST /api/tasks
  async createTask(taskData) {
    console.log("Creating a new task");
    return this.request("/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
  }

  // PUT /api/tasks/:id
  async updateTask(id, taskData) {
    console.log("Updating task with ID:", id);
    return this.request(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
    });
  }

  // DELETE /api/tasks/:id
  async deleteTask(id) {
    console.log("Deleting task with ID:", id);
    return this.request(`/tasks/${id}`, {
      method: "DELETE",
    });
  }

  // PATCH /api/tasks/:id/toggle
  async toggleTask(id) {
    console.log("Toggling completion status for task with ID:", id);
    return this.request(`/tasks/${id}/toggle`, {
      method: "PATCH",
    });
  }
}

export const apiService = new ApiService();
