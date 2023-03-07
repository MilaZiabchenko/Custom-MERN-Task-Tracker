import { useState, useEffect } from 'react';
import { useTasksContext } from '../context/TasksContext';
import PrioritySelect from './PrioritySelect';

const initialTaskState = { name: '', time: '', priority: 10 };

const TaskForm = () => {
  const [task, setTask] = useState(initialTaskState);
  const {
    toggleTaskFormIsOpen,
    showTaskForm,
    taskToEdit,
    updateTask,
    addTask
  } = useTasksContext();

  useEffect(() => {
    if (toggleTaskFormIsOpen) {
      setTask(initialTaskState);
    }
  }, [toggleTaskFormIsOpen]);

  useEffect(() => {
    if (taskToEdit?.edit) {
      setTask(taskToEdit.task);
    }
  }, [taskToEdit]);

  const { name, time, priority } = task;

  const handleSubmit = e => {
    e.preventDefault();

    if (name.length < 8 || time.length < 3 || time.length > 25) return null;

    if (taskToEdit?.edit) {
      updateTask(taskToEdit.task._id, { name, time, priority });
    } else {
      addTask({ name, time, priority });
    }

    setTask(initialTaskState);
  };

  return showTaskForm ? (
    <form onSubmit={handleSubmit}>
      <div className='form-control'>
        <textarea
          placeholder='Add Task*'
          value={name}
          onChange={e => setTask({ ...task, name: e.target.value })}
          className={name.length > 0 && name.length < 8 ? 'error' : null}
        />
        {name.length > 0 && name.length < 8 && (
          <p className='error'>Task name must be at least 8 characters</p>
        )}
      </div>
      <div className='form-control'>
        <input
          type='text'
          placeholder='Add Time*'
          value={time}
          onChange={e => setTask({ ...task, time: e.target.value })}
          className={
            (time.length > 0 && time.length < 3) || time.length > 25
              ? 'error'
              : null
          }
        />
        {((time.length > 0 && time.length < 3) || time.length > 25) && (
          <p className='error'>
            Time must be within a range between 3 and 25 characters
          </p>
        )}
      </div>
      <div className='form-control'>
        <PrioritySelect
          selected={priority}
          select={priority => setTask({ ...task, priority: priority })}
        />
      </div>
      <button
        type='submit'
        className='btn btn-block'
        disabled={name.length < 8 || time.length < 3 || time.length > 25}
      >
        Save Task
      </button>
    </form>
  ) : null;
};

export default TaskForm;
