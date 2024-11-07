import { useState } from 'react';
import { ClientButton, ClientButtonText, Form, Select, IconWrapper, InputContainer, Input, SelectButtonContainer,  ErrorMessage } from './StyledComponents';
import { useAddStoryMutation } from '../services/storyApi';  // RTK Query hook for adding a task

const StoryForm = ({ user }) => {
  const [title, setTitle] = useState<string>(''); 
  const [description, setDescription] = useState<string>('');
  const [capability, setCapability] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [benefit, setBenefit] = useState<string>(''); 
  const [priority, setPriority] = useState<string>('default'); 
  const [hasError, setHasError] = useState<boolean>(false); 
  const [author] = useState<string>(user);

  // RTK Query mutation hook for adding a new task
  const [addStory] = useAddStoryMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (title.trim() || description.trim() || priority !== 'default') {
      try {
        // Call the mutation to add a new task
        await addStory({
          title, description, priority, author,
          completed: false, createdAt: new Date().toISOString(), capability, role, benefit
        }).unwrap();
        setTitle('');
        setDescription('');
        setCapability('');
        setRole('');
        setBenefit('');
        setPriority('low');
        setHasError(false);
      } catch (error) {
        console.log('Failed to add storii');
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
      As <Input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="a user"
          hasError={hasError} // Pass error state to the input
        />
          I can <Input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="capability"
          hasError={hasError} // Pass error state to the input
        />
          so that<Input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="benefit"
          hasError={hasError} // Pass error state to the input
        />
      
      
      <SelectButtonContainer>
        {/* <Select id="filter-task-priority" value={priority} onChange={handlePriorityChange}>
          <option value="default">Default (Low)</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Select> */}
        <ClientButton type="submit">
          <ClientButtonText>Add Story</ClientButtonText>
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

export default StoryForm;
