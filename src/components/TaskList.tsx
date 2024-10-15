// @ts-nocheck
import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { persistor } from '../store';
import styled from '@emotion/styled';
import TaskItem from './TaskItem';
import { useGetTaskListQuery, useDeleteTaskMutation, useToggleTaskCompletionMutation, useUpdateTaskMutation } from '../services/taskApi';

const ItemsContainer = styled.div`
  background: #ffffff;
  border-radius: 5px;
  padding: 1rem;
`;

const TaskListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Select = styled.select`
  margin-left: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: black;

  @media (max-width: 600px) {
    margin-left: 0;
  }

  &:focus {
    outline: 1px solid green;
    border-color: green;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterLabel = styled.label`
  font-size: 16px;
  margin-right: 10px;
  font-weight: bold;
  display: block;
  @media (max-width: 600px) {
    display: none;
  }
`;

const NoTasksMessage = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 18px;
  color: #555;
`;

const ResetButton = styled.button`
  background-color: red;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  @media (max-width: 600px) {
    flex-grow: 1;
  }

  &:hover {
    background-color: darkred;
  }
`;

const TaskList = () => {
  // const dispatch = useDispatch();
  const [filter, setFilter] = useState<string>('all');
  const [userName, setUserName] = useState<string>('');

  // Fetch tasks using RTK Query
  const { data: tasks = [], error, isLoading } = useGetTaskListQuery();

  // Mutations for updating, deleting, and toggling task completion
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleTaskCompletion] = useToggleTaskCompletionMutation();
  const [updateTask] = useUpdateTaskMutation();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
  };

  const handleToggleCompletion = async (task: Task) => {
    await toggleTaskCompletion(task);
  };

  const handleSaveEdit = async (task: Task, newTitle: string, newDescription: string) => {
    if (newTitle.trim()) {
      await updateTask({ ...task, title: newTitle, description: newDescription });
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const resetEverything = () => {
    if (window.confirm('Are you sure you want to resync?')) {
      persistor.purge().then(() => {
        window.location.reload();
      });
    }
  };

  const purgeEverything = () => {
    if (window.confirm('Are you sure you want to clear storage and logout?')) {
      localStorage.clear();
      persistor.purge().then(() => {
        window.location.reload();
      });
    }
  };

  // Sort the tasks based on `dateCreated` in descending order
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

  const filteredTasks = sortedTasks.filter((task) => {
    if (filter === 'my-tasks') {
      return task.author === userName;
    } else if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'incomplete') {
      return !task.completed;
    }
    return true;
  });

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks. Please try again later.</div>;
  }

  return (
    <>
      <FilterContainer>
        <FilterLabel htmlFor="filter-tasks">Filter by:</FilterLabel>
        <Select id="filter-tasks" value={filter} onChange={handleFilterChange}>
          <option value="all">All Tasks</option>
          <option value="my-tasks">My Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="incomplete">Incomplete Tasks</option>
        </Select>
        <ResetButton onClick={resetEverything}>Resync</ResetButton>
        <ResetButton onClick={purgeEverything}>Logout</ResetButton>
      </FilterContainer>

      <ItemsContainer>
        <TaskListContainer>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task: Task) => (
              <TaskItem
                key={task.id}
                task={task}
                onSaveEdit={handleSaveEdit}
                onDelete={() => handleDelete(task.id)}
                onToggleCompletion={() => handleToggleCompletion(task)}
              />
            ))
          ) : (
            <NoTasksMessage>No tasks found based on the selected filter.</NoTasksMessage>
          )}
        </TaskListContainer>
      </ItemsContainer>
    </>
  );
};

export default TaskList;
