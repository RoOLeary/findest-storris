import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskItem from '../../components/TaskItem';
import { Task } from '../../types/task';
import { useUpdateTaskMutation, useDeleteTaskMutation, useToggleTaskCompletionMutation } from '../../services/taskApi';

// Mock RTK Query hooks
jest.mock('./../../services/taskApi', () => ({
  useUpdateTaskMutation: jest.fn(),
  useDeleteTaskMutation: jest.fn(),
  useToggleTaskCompletionMutation: jest.fn(),
}));

describe('TaskItem Component', () => {
  const mockUpdateTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockToggleTaskCompletion = jest.fn();

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    priority: 'medium',
    author: 'Test User',
    completed: false,
    createdAt: "1728905056"
  };

  beforeEach(() => {
    (useUpdateTaskMutation as jest.Mock).mockReturnValue([mockUpdateTask]);
    (useDeleteTaskMutation as jest.Mock).mockReturnValue([mockDeleteTask]);
    (useToggleTaskCompletionMutation as jest.Mock).mockReturnValue([mockToggleTaskCompletion]);

    jest.clearAllMocks();
  });

  it('should render task details correctly when not in edit mode', () => {
    render(<TaskItem task={mockTask} />);

    // Check that the task title and description are rendered
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // Check that the priority and author are rendered using a more flexible matcher
    expect(screen.getByText((content, element) =>
      element?.textContent === 'Priority: medium'
    // @ts-ignore
    )).toBeInTheDocument();

    expect(screen.getByText((content, element) =>
      element?.textContent === 'Created by: Test User'
    )).toBeInTheDocument();

    // Check that the Complete, Edit, and Delete buttons are rendered
    expect(screen.getByText('Complete')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should enter edit mode when clicking the "Edit" button', () => {
    render(<TaskItem task={mockTask} />);

    fireEvent.click(screen.getByText('Edit'));

    // Check if the input fields for title and description appear
    expect(screen.getByPlaceholderText('Edit task title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Edit task description')).toBeInTheDocument();

    // Check if the Save and Cancel buttons are rendered
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should call updateTask when "Save" button is clicked after editing', async () => {
    render(<TaskItem task={mockTask} />);

    fireEvent.click(screen.getByText('Edit'));

    // Simulate editing the title and description
    fireEvent.change(screen.getByPlaceholderText('Edit task title'), {
      target: { value: 'Updated Task Title' },
    });
    fireEvent.change(screen.getByPlaceholderText('Edit task description'), {
      target: { value: 'Updated Task Description' },
    });

    fireEvent.click(screen.getByText('Save'));

    // Ensure that updateTask mutation was called with the updated task
    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalledWith({
        ...mockTask,
        title: 'Updated Task Title',
        description: 'Updated Task Description',
      });
    });
  });

  it('should call toggleTaskCompletion when "Complete" button is clicked', async () => {
    render(<TaskItem task={mockTask} />);

    fireEvent.click(screen.getByText('Complete'));

    // Ensure that toggleTaskCompletion mutation was called
    await waitFor(() => {
      expect(mockToggleTaskCompletion).toHaveBeenCalledWith(mockTask);
    });
  });

  it('should call deleteTask when "Delete" button is clicked', async () => {
    render(<TaskItem task={mockTask} />);

    fireEvent.click(screen.getByText('Delete'));

    // Ensure that deleteTask mutation was called with the task id
    await waitFor(() => {
      expect(mockDeleteTask).toHaveBeenCalledWith(mockTask.id);
    });
  });

  it('should cancel editing when "Cancel" button is clicked', () => {
    render(<TaskItem task={mockTask} />);

    fireEvent.click(screen.getByText('Edit'));

    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Ensure the task title and description are rendered again
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // Ensure input fields are not displayed anymore
    expect(screen.queryByPlaceholderText('Edit task title')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Edit task description')).not.toBeInTheDocument();
  });
});
