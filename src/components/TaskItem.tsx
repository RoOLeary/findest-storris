import { useState } from 'react';
import { CheckIcon, AddInput, TaskItemContainer, TaskInfoContainer, TaskDetailsContent, TaskTitle, TaskMeta, CompleteButton, SaveButton, EditButton, DeleteButton, Label, ButtonContainer } from './StyledComponents';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { useUpdateTaskMutation, useDeleteTaskMutation, useToggleTaskCompletionMutation } from '../services/taskApi';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  // RTK Query hooks for updating, deleting, and toggling task completion
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleTaskCompletion] = useToggleTaskCompletionMutation();

  const handleSave = async () => {
    await updateTask({ ...task, title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleToggleCompletion = async () => {
    await toggleTaskCompletion(task);
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
  };

  return (
    <TaskItemContainer isEditing={isEditing}>
      {isEditing ? (
        <>
          <TaskDetailsContent completed={false}>
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
            <CompleteButton completed={task.completed} onClick={handleToggleCompletion}>
              {task.completed ? 'Undo' : 'Complete'}
            </CompleteButton>
            <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </ButtonContainer>
        </>
      )}
    </TaskItemContainer>
  );
};

export default TaskItem;
