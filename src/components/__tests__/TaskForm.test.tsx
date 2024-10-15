import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../TaskForm';
import { useAddTaskMutation } from '../../services/taskApi';

// Mocking the RTK Query hook
jest.mock('../../services/taskApi', () => ({
  useAddTaskMutation: jest.fn(),
}));

describe('TaskForm Component', () => {
  const mockAddTask = jest.fn();

  beforeEach(() => {
    // Mock the useAddTaskMutation hook to return the mock function
    (useAddTaskMutation as jest.Mock).mockReturnValue([mockAddTask]);
    mockAddTask.mockClear();  // Reset mock for each test
  });

  it('should render form fields and submit button', () => {
    render(<TaskForm user="Test User" />);

    // Check if the title input is rendered
    expect(screen.getByPlaceholderText('Enter task title')).toBeInTheDocument();

    // Check if the description input is rendered
    expect(screen.getByPlaceholderText('Enter task description')).toBeInTheDocument();

    // Check if the priority select is rendered
    expect(screen.getByDisplayValue('Default (Low)')).toBeInTheDocument();

    // Check if the "Add Task" button is rendered
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  it('should update input fields when the user types', () => {
    render(<TaskForm user="Test User" />);

    // Simulate typing in the title input
    const titleInput = screen.getByPlaceholderText('Enter task title');
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    expect(titleInput).toHaveValue('New Task');

    // Simulate typing in the description input
    const descriptionInput = screen.getByPlaceholderText('Enter task description');
    fireEvent.change(descriptionInput, { target: { value: 'Task Description' } });
    expect(descriptionInput).toHaveValue('Task Description');

    // Simulate selecting a priority
    const prioritySelect = screen.getByDisplayValue('Default (Low)');
    fireEvent.change(prioritySelect, { target: { value: 'high' } });
    expect(prioritySelect).toHaveValue('high');
  });

  it('should call addTask mutation when form is submitted', async () => {
    render(<TaskForm user="Test User" />);

    // Simulate typing in the title and description inputs
    const titleInput = screen.getByPlaceholderText('Enter task title');
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });

    const descriptionInput = screen.getByPlaceholderText('Enter task description');
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    // Simulate selecting a priority
    const prioritySelect = screen.getByDisplayValue('Default (Low)');
    fireEvent.change(prioritySelect, { target: { value: 'high' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Add Task'));

    // Ensure the addTask mutation was called with the correct data
    expect(mockAddTask).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description',
      priority: 'high',
      author: 'Test User',
      completed: false,
    });
  });

  it('should display an error message if form is submitted with empty fields', () => {
    render(<TaskForm user="Test User" />);

    // Simulate form submission without typing in the inputs
    fireEvent.click(screen.getByText('Add Task'));

    // Check that the error message is displayed
    expect(screen.getByText('Silly Goose! You forgot to add a task!')).toBeInTheDocument();
    expect(screen.getByText('Derp! You forgot to add a description!')).toBeInTheDocument();

    // Ensure the addTask mutation was not called
    expect(mockAddTask).not.toHaveBeenCalled();
  });
});
