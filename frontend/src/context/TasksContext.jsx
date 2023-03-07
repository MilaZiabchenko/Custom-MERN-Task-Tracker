import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect
} from 'react';
import useTasks from '../hooks/useTasks.js';
import { tasksReducer } from '../reducers/tasksReducer.js';
import { CATEGORIES } from '../constants/categories.js';
import { fetchTask } from '../helpers/fetchTask.js';

const TasksContext = createContext(null);

const TasksProvider = ({ children }) => {
  const { isLoading, error, tasks: initialTasks } = useTasks('/api/tasks');
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.LATEST);
  const [taskToEdit, setTaskToEdit] = useState({ task: {}, edit: false });
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    if (initialTasks) {
      dispatch({ type: 'loaded_tasks', payload: initialTasks });
    }
  }, [initialTasks]);

  const toggleTaskFormIsOpen = () => {
    setShowTaskForm(!showTaskForm);
  };

  const toggleCompleted = async id => {
    const task = await fetchTask(id);

    const updatedTask = { ...task, completed: !task.completed };

    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    if (!response.ok) {
      throw new Error(`Oops ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    dispatch({
      type: 'toggled_completed',
      payload: data
    });
  };

  const editTask = async id => {
    if (showTaskForm) return null;

    const taskToEdit = await fetchTask(id);

    setTaskToEdit({ task: taskToEdit, edit: true });
    setShowTaskForm(!showTaskForm);

    const element = document.querySelector('main');

    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateTask = async (id, updatedTask) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedTask)
    });

    if (!response.ok) {
      throw new Error(`Oops ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    dispatch({
      type: 'updated_task',
      payload: data
    });

    setTaskToEdit({ task: {}, edit: false });
    setShowTaskForm(!showTaskForm);
  };

  const deleteTask = async id => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });

    dispatch({ type: 'deleted_task', payload: { _id: id } });
  };

  
  const addTask = async task => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(task)
    });

    if (!response.ok) {
      throw new Error(`Oops ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    dispatch({ type: 'added_task', payload: data });
    setShowTaskForm(!showTaskForm);
  };

  return (
    <TasksContext.Provider
      value={{
        isLoading,
        error,
        tasks,
        activeCategory,
        setActiveCategory,
        showTaskForm,
        toggleTaskFormIsOpen,
        toggleCompleted,
        taskToEdit,
        editTask,
        updateTask,
        deleteTask,
        addTask
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (context === null) {
    throw new Error('useTasksContext must be used within a TasksProvider');
  }

  return context;
};

export { TasksProvider, useTasksContext };
