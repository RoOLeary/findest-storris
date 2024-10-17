import { useEffect, useState } from 'react';
import { useGetTaskListQuery, useDeleteTaskMutation, useToggleTaskCompletionMutation, useUpdateTaskMutation } from '../services/taskApi';
import { persistor } from '../store';
import { FilterContainer, FilterLabel, Select, ResetButton, ItemsContainer, TaskListContainer, NoTasksMessage } from '../components/StyledComponents';
import TaskItem from './TaskItem';
import { Task } from '../types/task';

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


  // @ts-ignore
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
                // @ts-ignore
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
