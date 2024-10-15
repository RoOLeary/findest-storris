import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskList from '../TaskList';
import { useGetTaskListQuery, useDeleteTaskMutation, useToggleTaskCompletionMutation, useUpdateTaskMutation } from '../../services/taskApi';
import { persistor } from '../../store';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from '../../services/taskApi';

// Mock RTK Query hooks but keep the original reducerPath and reducer
jest.mock('../../services/taskApi', () => ({
  ...jest.requireActual('../../services/taskApi'), // Keep the original reducerPath and reducer
  useGetTaskListQuery: jest.fn(),
  useDeleteTaskMutation: jest.fn(),
  useToggleTaskCompletionMutation: jest.fn(),
  useUpdateTaskMutation: jest.fn(),
}));

// Mock the persistor
jest.mock('../../store', () => ({
  persistor: {
    purge: jest.fn().mockResolvedValue(undefined),
  },
}));

// Mock localStorage and window.location.reload
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => 'Curren T. User'),
      setItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  Object.defineProperty(window, 'location', {
    value: {
      ...window.location,
      reload: jest.fn(),
    },
    writable: true,
  });
});

// Create a mock store with taskApi reducer
const mockStore = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer, // Use the real taskApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware), // Add taskApi middleware
});

describe('TaskList Component', () => {
  const mockDeleteTask = jest.fn();
  const mockToggleTaskCompletion = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockTasks = [
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
    // Mock RTK Query hooks
    (useGetTaskListQuery as jest.Mock).mockReturnValue({
      data: mockTasks,
      isLoading: false,
      error: null,
    });
    (useDeleteTaskMutation as jest.Mock).mockReturnValue([mockDeleteTask]);
    (useToggleTaskCompletionMutation as jest.Mock).mockReturnValue([mockToggleTaskCompletion]);
    (useUpdateTaskMutation as jest.Mock).mockReturnValue([mockUpdateTask]);

    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Provider store={mockStore}>
        <TaskList />
      </Provider>
    );

  it('should render tasks correctly', () => {
    renderComponent();

    // Check that tasks are rendered
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  it('should display a loading message when tasks are being fetched', () => {
    (useGetTaskListQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    renderComponent();
    expect(screen.getByText('Loading tasks...')).toBeInTheDocument();
  });

  it('should display an error message if task fetching fails', () => {
    (useGetTaskListQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: 'Error fetching tasks',
    });

    renderComponent();
    expect(screen.getByText('Error loading tasks. Please try again later.')).toBeInTheDocument();
  });

  it('should filter tasks based on user selection', () => {
    renderComponent();

    // Change filter to "my-tasks"
    fireEvent.change(screen.getByLabelText(/filter by/i), {
      target: { value: 'my-tasks' },
    });

    // Only the task authored by "Curren T. User" should be displayed
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Task 2')).not.toBeInTheDocument();
  });

  it('should call deleteTask mutation when a task is deleted', async () => {
    renderComponent();

    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteTask).toHaveBeenCalledWith(mockTasks[0].id);
    });
  });

  it('should call toggleTaskCompletion mutation when task is completed', async () => {
    renderComponent();

    const completeButton = screen.getAllByText('Complete')[0];
    fireEvent.click(completeButton);

    await waitFor(() => {
      expect(mockToggleTaskCompletion).toHaveBeenCalledWith(mockTasks[0]);
    });
  });

  it('should reset everything when reset button is clicked', async () => {
    window.confirm = jest.fn(() => true); // Mock the confirm dialog
    renderComponent();

    fireEvent.click(screen.getByText('Resync')); // Click the reset button

    // Ensure persistor.purge was called and the page reloaded
    await waitFor(() => {
      expect(persistor.purge).toHaveBeenCalled();
      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  it('should clear everything and logout when logout button is clicked', async () => {
    window.confirm = jest.fn(() => true); // Mock the confirm dialog
    renderComponent();

    fireEvent.click(screen.getByText('Logout')); // Click the logout button

    // Ensure localStorage was cleared, persistor.purge was called, and the page reloaded
    await waitFor(() => {
      expect(localStorage.clear).toHaveBeenCalled();
      expect(persistor.purge).toHaveBeenCalled();
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
