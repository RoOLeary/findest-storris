import { useEffect, useState } from 'react';
import { useGetStoryListQuery, useDeleteStoryMutation, useToggleStoryCompletionMutation, useUpdateStoryMutation } from '../services/storyApi';
import { persistor } from '../store';
import { ItemsContainer, StoryListContainer, NoStoriesMessage } from './StyledComponents';
import StoryItem from './StoryItem';
import { Story } from '../types/story';

const StoryList = () => {
  // const dispatch = useDispatch();
  const [filter, setFilter] = useState<string>('all');
  const [userName, setUserName] = useState<string>('');

  // Fetch Storys using RTK Query
  const { data: stories = [], error, isLoading } = useGetStoryListQuery();

  // Mutations for updating, deleting, and toggling task completion
  const [deleteTask] = useDeleteStoryMutation();
  const [toggleStoryCompletion] = useToggleStoryCompletionMutation();
  const [updateStory] = useUpdateStoryMutation();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
  };

  const handleToggleCompletion = async (story: Story) => {
    await toggleStoryCompletion(story);
  };

  const handleSaveEdit = async (story: Story, newTitle: string, newDescription: string) => {
    if (newTitle.trim()) {
      await updateStory({ ...story, title: newTitle, description: newDescription });
    }
  };

  // @ts-ignore
  const sortedStories = [...stories].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredStories = sortedStories.filter((story) => {
    if (filter === 'my-stories') {
      return story.author === userName;
    } else if (filter === 'completed') {
      return story.completed;
    } else if (filter === 'incomplete') {
      return !story.completed;
    }
    return true;
  });

  if (isLoading) {
    return <div>Loading stories...</div>;
  }

  if (error) {
    return <div>Error loading stories. Please try again later.</div>;
  }

  return (
    <div className={`w-full md:w-1/2 pt-8 panel ${filteredStories.length > 0 ? 'show' : ''}`}>

          {filteredStories.length > 0 ? (
            filteredStories.map((story: Story) => (
              <StoryItem
                key={story.id}
                story={story}
                // @ts-ignore
                onSaveEdit={handleSaveEdit}
                onDelete={() => handleDelete(story.id)}
                onToggleCompletion={() => handleToggleCompletion(story)}
              />
            ))
          ) : (
            <NoStoriesMessage>No stories found based on the selected filter.</NoStoriesMessage>
          )}
        
      
    </div>
  );
};

export default StoryList;
