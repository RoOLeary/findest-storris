import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Story } from '../types/story';

export const storyApi = createApi({
  reducerPath: 'storyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://67005c054da5bd237553e174.mockapi.io/api/move-ro-move' }),
  tagTypes: ['Story'],
  endpoints: (builder) => ({
    getStoryList: builder.query<Story[], void>({
      query: () => '/stories',
      // @ts-ignore  
      providesTags: (result: { id: any; }[]) =>
        result
          ? [ ...result.map(({ id }) => ({ type: 'Story', id })), { type: 'Story', id: 'LIST' },]
          : [{ type: 'Story', id: 'LIST' }],
    }),

    // POST (add) a new story
    addStory: builder.mutation<Story, Omit<Story, 'id'>>({
      query: (story) => ({
        url: '/stories',
        method: 'POST',
        body: story,
      }),
      // No invalidatesTags, manually update cache
      async onQueryStarted(story, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          storyApi.util.updateQueryData('getStoryList', undefined, (draftStories) => {
            draftStories.unshift({
              ...story,
              id: 'temp-id', // Optimistic temporary ID
              createdAt: new Date().toISOString(), // Include createdAt
            });
          })
        );

        try {
          const { data: addedStory } = await queryFulfilled;
          dispatch(
            storyApi.util.updateQueryData('getStoryList', undefined, (draftStories) => {
              const index = draftStories.findIndex((t) => t.id === 'temp-id');
              if (index !== -1) {
                draftStories[index] = addedStory;
              }
            })
          );
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    // PUT (update) a story
    updateStory: builder.mutation<Story, Story>({
      query: (story) => ({
        url: `/stories/${story.id}`,
        method: 'PUT',
        body: story,
      }),
      // Manual cache update instead of invalidatesTags
      async onQueryStarted(updatedStory, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          storyApi.util.updateQueryData('getStoryList', undefined, (draftStories) => {
            const index = draftStories.findIndex((t) => t.id === updatedStory.id);
            if (index !== -1) {
              draftStories[index] = updatedStory;
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

    // DELETE a story
    deleteStory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/stories/${id}`,
        method: 'DELETE',
      }),
      // Manual cache update instead of invalidatesTags
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          storyApi.util.updateQueryData('getStoryList', undefined, (draftStories) => {
            const index = draftStories.findIndex((t) => t.id === id);
            if (index !== -1) {
              draftStories.splice(index, 1);
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

    // Toggle story completion
    toggleStoryCompletion: builder.mutation<Story, Story>({
      query: (story) => ({
        url: `/stories/${story.id}`,
        method: 'PUT',
        body: { ...story, completed: !story.completed },
      }),
      // Manual cache update instead of invalidatesTags
      async onQueryStarted(updatedStory, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          storyApi.util.updateQueryData('getStoryList', undefined, (draftStories) => {
            const storyToUpdate = draftStories.find((t) => t.id === updatedStory.id);
            if (storyToUpdate) {
              storyToUpdate.completed = !storyToUpdate.completed;
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
  useGetStoryListQuery,
  useAddStoryMutation,
  useUpdateStoryMutation,
  useDeleteStoryMutation,
  useToggleStoryCompletionMutation,
} = storyApi;
