import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useAddTaskMutation } from '../services/taskApi';  // RTK Query hook for adding a task

// Styled components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  gap: 16px;
  align-items: stretch;
`;

const InputContainer = styled.div<{ hasError: boolean }>`
  position: relative;
  flex-grow: 1;
  margin-bottom: ${(props) => (props.hasError ? '25px' : '0')};
`;

const Input = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.hasError ? 'red' : '#ccc')};
  border-radius: 4px;

  &:focus {
    outline: 1px solid green;
    border-color: green;
  }
`;

const SelectButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #ccc;
  width: 100%;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  position: absolute;
  bottom: -25px;
  left: 0;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  transition: transform 0.3s ease;

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
    border-radius: 15px;
    transition: transform 0.3s ease-in-out, background 0.3s ease-in-out, padding 0.3s ease-in-out;
    padding: 2px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #e1ff01;
  color: #000000;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  position: relative;
  gap: 0;
  height: 45px;
  transition: transform 0.2s ease, background 0.2s ease, gap 0.15s ease-in-out;

  &:hover {
    gap: 8px;

    svg {
      width: 25px;
      height: 25px;
      background: black;
      color: white;
      border-radius: 15px;
      padding: 5px;
      transform: rotate(-45deg);
    }
  }
`;

const ButtonText = styled.span`
  font-family: "Bw Gradual (woff2)", sans-serif;
  font-weight: 400;
  white-space: pre;
`;

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
          completed: false
        }).unwrap();
        setTitle('');
        setDescription('');
        setPriority('low');
        setHasError(false);
      } catch (error) {
        console.error('Failed to add task:', error);
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
        <Button type="submit">
          <ButtonText>Add Task</ButtonText>
          <IconWrapper>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.9 12.34">
              <path fill="currentColor" d="M.01,5.28H12.09c-.48,.13-1.54-1.08-2.38-1.94L7.7,1.27l1.23-1.27,5.97,6.17-5.97,6.17-1.23-1.27,1.9-1.97c.92-.95,1.77-1.94,2.48-2.03H0s.01-1.8,.01-1.8Z"></path>
            </svg>
          </IconWrapper>
        </Button>
      </SelectButtonContainer>
    </Form>
  );
};

export default TaskForm;
