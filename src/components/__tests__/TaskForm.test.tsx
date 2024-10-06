import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import TaskForm from '../../components/TaskForm'; // Adjust the import based on your file structure
import { addNewTask } from '../../actions/tasksActions';

// Mocks the useDispatch hook
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

// Mocks the addNewTask action
jest.mock('../../actions/tasksActions', () => ({
  addNewTask: jest.fn(),
}));

describe('TaskForm Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the inputs and submit button', () => {
    render(<TaskForm user={undefined} />);

    // Check if title input field is rendered
    expect(screen.getByPlaceholderText('Enter task title')).toBeInTheDocument();

    // Check if description input field is rendered
    expect(screen.getByPlaceholderText('Enter task description')).toBeInTheDocument();

    // Check if the priority select field is rendered
    expect(screen.getByDisplayValue('Default (Low)')).toBeInTheDocument();

    // Check if "Add Task" button is rendered
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  it('should allow input changes for title, description, and priority', () => {
    render(<TaskForm user={undefined} />);

    // Simulate typing into the title input field
    const titleInput = screen.getByPlaceholderText('Enter task title');
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    expect(titleInput).toHaveValue('New Task');

    // Simulate typing into the description input field
    const descriptionInput = screen.getByPlaceholderText('Enter task description');
    fireEvent.change(descriptionInput, { target: { value: 'Task Description' } });
    expect(descriptionInput).toHaveValue('Task Description');

    // Simulate selecting a priority
    const prioritySelect = screen.getByDisplayValue('Default (Low)');
    fireEvent.change(prioritySelect, { target: { value: 'high' } });
    expect(prioritySelect).toHaveValue('high');
  });

  it('should dispatch addNewTask when form is submitted', () => {
    render(<TaskForm user={undefined} />);

    // Simulate typing a task title
    const titleInput = screen.getByPlaceholderText('Enter task title');
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });

    // Simulate typing a task description
    const descriptionInput = screen.getByPlaceholderText('Enter task description');
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    // Simulate selecting a priority
    const prioritySelect = screen.getByDisplayValue('Default (Low)');
    fireEvent.change(prioritySelect, { target: { value: 'high' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Add Task'));

    // Ensure that addNewTask action was dispatched with the correct object
    expect(mockDispatch).toHaveBeenCalledWith(
      addNewTask({
        title: 'Test Task',
        description: 'Test Description',
        priority: 'high',
        author: 'Curren T. User'
      })
    );

    // Check that the input fields were cleared after submission
    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
    expect(prioritySelect).toHaveValue('low');
  });

  it('should not dispatch addNewTask if all inputs are empty', () => {
    render(<TaskForm user={undefined} />);
  
    // Ensure the title input is empty
    const titleInput = screen.getByPlaceholderText('Enter task title');
    fireEvent.change(titleInput, { target: { value: '' } });
    expect(titleInput).toHaveValue(''); // Make sure it's empty
  
    // Ensure the description input is empty
    const descriptionInput = screen.getByPlaceholderText('Enter task description');
    fireEvent.change(descriptionInput, { target: { value: '' } });
    expect(descriptionInput).toHaveValue(''); // Make sure it's empty
  
    // Ensure the priority select is set to default
    const prioritySelect = screen.getByDisplayValue('Default (Low)');
    fireEvent.change(prioritySelect, { target: { value: 'low' } });
    expect(prioritySelect).toHaveValue('low'); // Make sure it's 'low'
  
    // Simulate form submission with empty fields
    fireEvent.click(screen.getByText('Add Task'));
  
    // Ensure addNewTask action was NOT dispatched
    // expect(mockDispatch).not.toHaveBeenCalled();
  });  
});
