import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../TaskItem';
import { Task } from '../../actions/tasksActions';

// Mock props
const task: Task = {
  id: '1',
  title: 'Test Task',
  completed: false,
  author: 'Test User',
  priority: 'medium',
  description: 'Test Description',
};

const mockOnSaveEdit = jest.fn();
const mockOnToggleCompletion = jest.fn();
const mockOnDelete = jest.fn();

describe('TaskItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render task details correctly when not in edit mode', () => {
    render(
      <TaskItem
        task={task}
        onSaveEdit={mockOnSaveEdit}
        onToggleCompletion={mockOnToggleCompletion}
        onDelete={mockOnDelete}
      />
    );

    // Check that the task title and description are rendered
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // Check that the action buttons are rendered
    expect(screen.getByText('Complete')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should enter edit mode when clicking the "Edit" button', () => {
    render(
      <TaskItem
        task={task}
        onSaveEdit={mockOnSaveEdit}
        onToggleCompletion={mockOnToggleCompletion}
        onDelete={mockOnDelete}
      />
    );

    // Click the edit button to enter edit mode
    fireEvent.click(screen.getByText('Edit'));

    // Check that input fields are displayed for title and description
    expect(screen.getByPlaceholderText('Edit task title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Edit task description')).toBeInTheDocument();

    // Check that Save and Cancel buttons are displayed
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should call onSaveEdit when "Save" button is clicked', () => {
    render(
      <TaskItem
        task={task}
        onSaveEdit={mockOnSaveEdit}
        onToggleCompletion={mockOnToggleCompletion}
        onDelete={mockOnDelete}
      />
    );

    // Enter edit mode
    fireEvent.click(screen.getByText('Edit'));

    // Change the task title and description
    fireEvent.change(screen.getByPlaceholderText('Edit task title'), {
      target: { value: 'Updated Task Title' },
    });
    fireEvent.change(screen.getByPlaceholderText('Edit task description'), {
      target: { value: 'Updated Task Description' },
    });

    // Simulate clicking the Save button
    fireEvent.click(screen.getByText('Save'));

    // Ensure that onSaveEdit was called with updated values
    expect(mockOnSaveEdit).toHaveBeenCalledWith(
      task,
      'Updated Task Title',
      'Updated Task Description'
    );
  });

  it('should call onToggleCompletion when "Complete" button is clicked', () => {
    render(
      <TaskItem
        task={task}
        onSaveEdit={mockOnSaveEdit}
        onToggleCompletion={mockOnToggleCompletion}
        onDelete={mockOnDelete}
      />
    );

    // Simulate clicking the Complete button
    fireEvent.click(screen.getByText('Complete'));

    // Ensure that onToggleCompletion was called
    expect(mockOnToggleCompletion).toHaveBeenCalled();
  });

  it('should call onDelete when "Delete" button is clicked', () => {
    render(
      <TaskItem
        task={task}
        onSaveEdit={mockOnSaveEdit}
        onToggleCompletion={mockOnToggleCompletion}
        onDelete={mockOnDelete}
      />
    );

    // Simulate clicking the Delete button
    fireEvent.click(screen.getByText('Delete'));

    // Ensure that onDelete was called
    expect(mockOnDelete).toHaveBeenCalled();
  });
});
