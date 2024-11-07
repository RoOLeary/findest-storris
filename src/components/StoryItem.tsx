import { useState } from 'react';
import { CheckIcon, AddInput, StoryItemContainer, StoryInfoContainer, StoryDetailsContent, StoryTitle, StoryMeta, CompleteButton, SaveButton, EditButton, DeleteButton, Label, ButtonContainer } from './StyledComponents';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { useUpdateStoryMutation, useDeleteStoryMutation, useToggleStoryCompletionMutation } from '../services/storyApi';
import { Story } from '../types/story';

interface StoryItemProps {
  story: Story;
}

const StoryItem = ({ story }: StoryItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(story.title);
  const [editDescription, setEditDescription] = useState(story.description || '');

  // RTK Query hooks for updating, deleting, and toggling task completion
  const [updateStory] = useUpdateStoryMutation();
  const [deleteStory] = useDeleteStoryMutation();
  const [toggleStoryCompletion] = useToggleStoryCompletionMutation();

  const handleSave = async () => {
    await updateStory({ ...story, title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleToggleCompletion = async () => {
    await toggleStoryCompletion(story);
  };

  const handleDelete = async () => {
    await deleteStory(story.id);
  };

  return (
    <StoryItemContainer isEditing={isEditing}>
      {isEditing ? (
        <>
          <StoryDetailsContent completed={false}>
            <Label>Edit Title</Label>
            <AddInput
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Edit task title" hasError={false} />
            <Label>Edit Description</Label>
            <AddInput
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Edit task description" hasError={false} />
          </StoryDetailsContent>
          <ButtonContainer isEditing={isEditing}>
            <SaveButton onClick={handleSave}>Save</SaveButton>
            <EditButton onClick={() => setIsEditing(false)}>Cancel</EditButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <StoryInfoContainer>
            <StoryTitle completed={story.completed}>
              {story.completed && (
                <CheckIcon completed={true}>
                  <IoCheckmarkOutline color="#ffffff" size="15px" />
                </CheckIcon>
              )}
              {story.title}
            </StoryTitle>
            <StoryDetailsContent completed={story.completed}>
              <p>{story.description}</p>
              <StoryMeta>
                <p><strong>Priority:</strong> {story.priority}</p>
                <p><strong>Created by:</strong> {story.author}</p>
              </StoryMeta>
            </StoryDetailsContent>
          </StoryInfoContainer>
          <ButtonContainer>
            <CompleteButton completed={story.completed} onClick={handleToggleCompletion}>
              {story.completed ? 'Undo' : 'Complete'}
            </CompleteButton>
            <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </ButtonContainer>
        </>
      )}
    </StoryItemContainer>
  );
};

export default StoryItem;
