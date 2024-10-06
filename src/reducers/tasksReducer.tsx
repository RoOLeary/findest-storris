import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../services/tasksService';
import { fetchTasks, addNewTask, removeTask, updateTask, toggleTaskCompletion } from '../actions/tasksActions';

interface TasksState {
    items: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TasksState = {
    items: [],
    status: 'idle',
    error: null,
};

const tasksReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {}, // No synchronous reducers here since we're using thunks
    extraReducers: (builder) => {
        // Handle fetching tasks
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });

        // Handle adding a new task
        builder
            .addCase(addNewTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.items = [action.payload, ...state.items];
            });

        // Handle removing a task
        builder
            .addCase(removeTask.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter((task) => task.id !== action.payload);
            });

        // Handle updating a task
        builder
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
                const index = state.items.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });

        // Handle toggling task completion
        builder
            .addCase(toggleTaskCompletion.fulfilled, (state, action: PayloadAction<Task>) => {
                const index = state.items.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default tasksReducer.reducer;
