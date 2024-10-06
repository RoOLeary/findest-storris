import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Task } from '../actions/tasksActions';
import { CompleteButton, SaveButton, EditButton, DeleteButton } from './StyledComponents';
import { IoCheckmarkOutline } from 'react-icons/io5';

// Smoothly animate the checkmark icon appearance/disappearance
const CheckIcon = styled.span<{ completed: boolean }>`
  margin-right: ${(props) => (props.completed ? '8px' : '0')};
  color: white;
  width: ${(props) => (props.completed ? '20px' : '0')}; 
  height: 20px;
  background: ${(props) => (props.completed ? 'green' : 'transparent')};  
  border-radius: 50%;
  display: ${(props) => (props.completed ? 'flex' : 'none')};  
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
`;

const TaskItemContainer = styled.li<{ isEditing: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.isEditing ? 'column' : 'row')};
  align-items: ${(props) => (props.isEditing ? 'stretch' : 'center')};
  padding: 15px; 
  margin-bottom: 12px; 
  background-color: #fafafa; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  gap: ${(props) => (props.isEditing ? '12px' : '8px')}; 

  &:focus,
  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px; 
  }
`;

// Container to stack the title and details with flex-direction: column
const TaskInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px; 
`;

// Dim only the task description and metadata if the task is completed
const TaskDetailsContent = styled.div<{ completed: boolean }>`
  opacity: ${(props) => (props.completed ? '0.5' : '1')};  
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};  
  transition: all 0.3s ease-in-out; 
  width: 100%;
`;

const TaskTitle = styled.span<{ completed: boolean }>`
  font-weight: bold;
  color: ${(props) => (props.completed ? 'green' : 'inherit')};  
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  align-items: center;  
  transition: all 0.3s ease-in-out;  
`;

const TaskMeta = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
  p {
    margin: 4px 0; 
  }
`;

const Input = styled.input`
  padding: 12px; 
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;

  &:focus {
    outline: 1px solid green; 
    border-color: green;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const ButtonContainer = styled.div<{ isEditing?: boolean }>`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: ${(props) => (props.isEditing ? '100%' : 'auto')};

  @media (max-width: 600px) {
    justify-content: ${(props) => (props.isEditing ? 'flex-start' : 'stretch')}; 
    width: 100%;
  }

  button {
    transition: background-color 0.3s ease;
    width: 100%;
  }

  button:hover {
    background-color: #e0e0e0;
  }
`;

interface TaskItemProps {
  task: Task;
  onSaveEdit: (task: Task, newTitle: string, newDescription: string) => void;
  onToggleCompletion: () => void;
  onDelete: () => void;
}

const TaskItem = ({ task, onSaveEdit, onToggleCompletion, onDelete }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleSave = () => {
    onSaveEdit(task, editTitle, editDescription);
    setIsEditing(false);
  };

  return (
    <TaskItemContainer isEditing={isEditing}>
      {isEditing ? (
        <>
          <TaskDetailsContent completed={false}>
            <Label>Edit Title</Label>
            <Input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Edit task title"
            />
            <Label>Edit Description</Label>
            <Input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Edit task description"
            />
          </TaskDetailsContent>
          <ButtonContainer isEditing={isEditing}>
            <SaveButton onClick={handleSave}>Save</SaveButton>
            <EditButton onClick={() => setIsEditing(false)}>Cancel</EditButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <TaskInfoContainer>
            <TaskTitle completed={task.completed}>
              {task.completed && (
                <CheckIcon completed={true}>
                  <IoCheckmarkOutline color="#ffffff" size="15px" />
                </CheckIcon>
              )}
              {task.title}
            </TaskTitle>
            <TaskDetailsContent completed={task.completed}>
              <p>{task.description}</p>
              <TaskMeta>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Created by:</strong> {task.author}</p>
              </TaskMeta>
            </TaskDetailsContent>
          </TaskInfoContainer>
          <ButtonContainer>
            <CompleteButton completed={task.completed} onClick={onToggleCompletion}>
              {task.completed ? 'Undo' : 'Complete'}
            </CompleteButton>
            <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          </ButtonContainer>
        </>
      )}
    </TaskItemContainer>
  );
};

export default TaskItem;
