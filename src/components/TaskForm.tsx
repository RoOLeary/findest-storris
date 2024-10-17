import { useState } from 'react';
import { ClientButton, ClientButtonText, Form, Select, IconWrapper, InputContainer, Input, SelectButtonContainer,  ErrorMessage } from './StyledComponents';
import { useAddTaskMutation } from '../services/taskApi';  // RTK Query hook for adding a task

const TaskForm = ({ user }) => {
  const [title, setTitle] = useState<string>(''); 
  const [description, setDescription] = useState<string>(''); 
  const [priority, setPriority] = useState<string>('default'); 
  const [hasError, setHasError] = useState<boolean>(false); 
  const [author] = useState<string>(user);

  // RTK Query mutation hook for adding a new task
  const [addTask] = useAddTaskMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (title.trim() || description.trim() || priority !== 'default') {
      try {
        // Call the mutation to add a new task
        await addTask({
          title, description, priority, author,
          completed: false, createdAt: new Date().toISOString()
        }).unwrap();
        setTitle('');
        setDescription('');
        setPriority('low');
        setHasError(false);
      } catch (error) {
        console.log('Failed to add task');
      }
    } else {
      setHasError(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
    if (e.target.value.trim()) {
      setHasError(false); // Remove error state if user types something
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value);
    if (e.target.value.trim()) {
      setHasError(false); // Remove error state if user types something
    }
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPriority(e.target.value); // Update the priority state based on the selected option
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer hasError={hasError}>
        <Input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Enter task title"
          hasError={hasError} // Pass error state to the input
        />
        {hasError && <ErrorMessage>Silly Goose! You forgot to add a task!</ErrorMessage>}
      </InputContainer>
      <InputContainer hasError={hasError}>
        <Input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter task description"
          hasError={hasError} // Pass error state to the input
        />
        {hasError && <ErrorMessage>Derp! You forgot to add a description!</ErrorMessage>}
      </InputContainer>
      <SelectButtonContainer>
        <Select id="filter-task-priority" value={priority} onChange={handlePriorityChange}>
          <option value="default">Default (Low)</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Select>
        <ClientButton type="submit">
          <ClientButtonText>Add Task</ClientButtonText>
          <IconWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.9 12.34">
              <path fill="currentColor" d="M.01,5.28H12.09c-.48,.13-1.54-1.08-2.38-1.94L7.7,1.27l1.23-1.27,5.97,6.17-5.97,6.17-1.23-1.27,1.9-1.97c.92-.95,1.77-1.94,2.48-2.03H0s.01-1.8,.01-1.8Z"></path>
            </svg>
          </IconWrapper>
        </ClientButton>
      </SelectButtonContainer>
    </Form>
  );
};

export default TaskForm;
