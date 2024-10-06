import { createAsyncThunk } from '@reduxjs/toolkit';
import * as tasksService from '../services/tasksService';

export interface Task {
    description?: string;
    id: string;
    title: string;
    completed: boolean;
    priority: string; // This has to be a string due to a hard req of api platform. 
    author: string; 
}

// Fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    return await tasksService.getTasks();
});

// Add a new task (wrapped with createAsyncThunk)
export const addNewTask = createAsyncThunk(
  'tasks/addNewTask', 
  async (task: { title: string; description: string; priority: string, author: string }) => {
    const { title, description, priority, author } = task;
    return await tasksService.addTask({
        title,
        completed: false,
        description,
        priority,
        author,
    });
  }
);

// Remove a task
export const removeTask = createAsyncThunk('tasks/removeTask', async (id: string) => {
    await tasksService.deleteTask(id);
    return id;
});

// Update a task (correctly accepting the full Task object, not just the id)
export const updateTask = createAsyncThunk('tasks/updateTask', async (task: Task) => {
    return await tasksService.updateTask(task);
});

// Toggle task completion
export const toggleTaskCompletion = createAsyncThunk(
    'tasks/toggleTaskCompletion',
    async (task: Task) => { 
        return await tasksService.toggleTaskCompletion(task);
    }
);
