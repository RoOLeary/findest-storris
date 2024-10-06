const API_URL = "https://67005c054da5bd237553e174.mockapi.io/api/move-ro-move/tasks";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority?: string; 
  author: string;
}

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Whoops. We've got an error. status: ${response.status}`);
    }
    const data: Task[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

export const addTask = async (task: Omit<Task, "id">): Promise<Task> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Task = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task");
  }
};

export const updateTask = async (task: Task): Promise<Task> => {
  try {
    // This is less than ideal, this mockapi thingy uses strings for id's by default. Anyways, whatever...
    const response = await fetch(`${API_URL}/${String(task.id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Task = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  const taskUrl = `${API_URL}/${id}`;

  try {
    const response = await fetch(taskUrl, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Task with id ${id} deleted successfully`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
};

export const toggleTaskCompletion = async (task: Task): Promise<Task> => {
  const updatedTask = { ...task, completed: !task.completed };
  return updateTask(updatedTask);
};
