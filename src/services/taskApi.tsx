import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../types/types';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://67005c054da5bd237553e174.mockapi.io/api/move-ro-move' }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTaskList: builder.query<Task[], void>({
      query: () => '/tasks',
    // @ts-ignore  
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Task', id })),
              { type: 'Task', id: 'LIST' },
            ]
          : [{ type: 'Task', id: 'LIST' }],
    }),

    // POST (add) a new task
    addTask: builder.mutation<Task, Omit<Task, 'id'>>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      // No invalidatesTags, manually update cache
      async onQueryStarted(task, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData('getTaskList', undefined, (draftTasks) => {
            draftTasks.unshift({
              ...task,
              id: 'temp-id', // Optimistic temporary ID
              createdAt: new Date().toISOString(), // Include createdAt
            });
          })
        );

        try {
          const { data: addedTask } = await queryFulfilled;
          dispatch(
            taskApi.util.updateQueryData('getTaskList', undefined, (draftTasks) => {
              const index = draftTasks.findIndex((t) => t.id === 'temp-id');
              if (index !== -1) {
                draftTasks[index] = addedTask;
              }
            })
          );
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    // PUT (update) a task
    updateTask: builder.mutation<Task, Task>({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: 'PUT',
        body: task,
      }),
      // Manual cache update instead of invalidatesTags
      async onQueryStarted(updatedTask, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData('getTaskList', undefined, (draftTasks) => {
            const index = draftTasks.findIndex((t) => t.id === updatedTask.id);
            if (index !== -1) {
              draftTasks[index] = updatedTask;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    // DELETE a task
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      // Manual cache update instead of invalidatesTags
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData('getTaskList', undefined, (draftTasks) => {
            const index = draftTasks.findIndex((t) => t.id === id);
            if (index !== -1) {
              draftTasks.splice(index, 1);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    // Toggle task completion
    toggleTaskCompletion: builder.mutation<Task, Task>({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: 'PUT',
        body: { ...task, completed: !task.completed },
      }),
      // Manual cache update instead of invalidatesTags
      async onQueryStarted(updatedTask, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData('getTaskList', undefined, (draftTasks) => {
            const taskToUpdate = draftTasks.find((t) => t.id === updatedTask.id);
            if (taskToUpdate) {
              taskToUpdate.completed = !taskToUpdate.completed;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetTaskListQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useToggleTaskCompletionMutation,
} = taskApi;
