import { makeUpdatedTaskFirstItemInTheList } from '../helpers/reorderTasksList';

const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case 'loaded_tasks': {
      return action.payload;
    }

    case 'toggled_completed': {
      const updatedTasks = tasks.map(task =>
        task._id === action.payload._id
          ? { ...task, completed: action.payload.completed }
          : task
      );

      const updatedAndReorderedTasks = makeUpdatedTaskFirstItemInTheList(
        tasks,
        action,
        updatedTasks
      );

      return updatedAndReorderedTasks;
    }

    case 'updated_task': {
      const updatedTasks = tasks.map(task =>
        task._id === action.payload._id
          ? {
              ...task,
              name: action.payload.name,
              time: action.payload.time,
              priority: action.payload.priority
            }
          : task
      );

      const updatedAndReorderedTasks = makeUpdatedTaskFirstItemInTheList(
        tasks,
        action,
        updatedTasks
      );

      return updatedAndReorderedTasks;
    }

    case 'deleted_task': {
      return tasks.filter(task => task._id !== action.payload._id);
    }

    case 'added_task': {
      return [action.payload, ...tasks];
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export { tasksReducer };
