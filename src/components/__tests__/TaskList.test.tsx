import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../TaskList';
import {
  fetchTasks,
  removeTask,
  toggleTaskCompletion,
  updateTask,
} from '../../actions/tasksActions';
import { persistor } from '../../store';
import { Task } from '../../actions/tasksActions';

// Mocking react-redux hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mocking actions
jest.mock('../../actions/tasksActions', () => ({
  fetchTasks: jest.fn(),
  removeTask: jest.fn(),
  toggleTaskCompletion: jest.fn(),
  updateTask: jest.fn(),
}));

// Mocking persistor
jest.mock('../../store', () => ({
  persistor: {
    purge: jest.fn().mockResolvedValue(undefined),
  },
}));

// Mock localStorage and window.location.reload
beforeEach(() => {
  // Mock localStorage to return 'Curren T. User' for the userName
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => 'Curren T. User'), // Mock userName in localStorage
      setItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  Object.defineProperty(window, 'location', {
    value: {
      ...window.location,
      reload: jest.fn(), // Mock the reload function
    },
    writable: true, // Make the property writable
  });
});

describe('TaskList Component', () => {
  const dispatch = jest.fn();

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Test Task 1',
      completed: false,
      author: 'Curren T. User',
      priority: 'medium',
      description: 'Description 1',
    },
    {
      id: '2',
      title: 'Test Task 2',
      completed: true,
      author: 'Other User',
      priority: 'high',
      description: 'Description 2',
    },
  ];

  beforeEach(() => {
    // Mock dispatch
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    // Mock state returned by useSelector
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        tasks: {
          items: tasks,
          status: 'idle',
        },
      })
    );

    jest.clearAllMocks();
  });

  it('should dispatch fetchTasks when component mounts', () => {
    render(<TaskList />);
    expect(dispatch).toHaveBeenCalledWith(fetchTasks());
  });

  it('should display tasks correctly', () => {
    render(<TaskList />);
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  it('should filter tasks based on user selection', () => {
    render(<TaskList />);
    fireEvent.change(screen.getByLabelText(/filter by/i), {
      target: { value: 'my-tasks' },
    });
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Task 2')).not.toBeInTheDocument();
  });

  it('should allow task completion toggle', () => {
    render(<TaskList />);
    fireEvent.click(screen.getByText('Complete')); // Click on the 'Complete' button for task 1
    expect(dispatch).toHaveBeenCalledWith(
      toggleTaskCompletion({
        id: '1',
        title: 'Test Task 1',
        completed: false,
        priority: 'medium',
        author: 'Curren T. User',
        description: 'Description 1',
      })
    );
  });

  it('should allow task editing and saving', () => {
    render(<TaskList />);
    const editButtons = screen.getAllByText('Edit'); // Get all Edit buttons
    fireEvent.click(editButtons[0]); // Click on the first 'Edit' button

    fireEvent.change(screen.getByPlaceholderText('Edit task title'), {
      target: { value: 'Updated Task Title' },
    });
    fireEvent.change(screen.getByPlaceholderText('Edit task description'), {
      target: { value: 'Updated Task Description' },
    });
    fireEvent.click(screen.getByText('Save')); // Save the task

    expect(dispatch).toHaveBeenCalledWith(
      updateTask({
        id: '1',
        title: 'Updated Task Title',
        completed: false,
        priority: 'medium',
        author: 'Curren T. User',
        description: 'Updated Task Description',
      })
    );
  });

  it('should allow task deletion', () => {
    render(<TaskList />);
    const deleteButtons = screen.getAllByText('Delete'); // Get all Delete buttons
    fireEvent.click(deleteButtons[0]); // Delete the first task
    expect(dispatch).toHaveBeenCalledWith(removeTask('1'));
  });

  it('should reset everything when reset button is clicked', async () => {
    window.confirm = jest.fn(() => true); // Mock the confirm dialog
    render(<TaskList />);
    fireEvent.click(screen.getByText('Resync')); // Click reset button

    // Ensure persistor.purge was called
    expect(persistor.purge).toHaveBeenCalled();
    
  });
});
