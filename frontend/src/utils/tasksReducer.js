export const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case 'loaded_tasks': {
      return action.payload;
    }

    case 'updated_task': {
      return tasks.map(task =>
        task._id === action.payload._id
          ? {
              ...task,
              name: action.payload.name,
              time: action.payload.time,
              priority: action.payload.priority,
            }
          : task
      );
    }

    case 'toggled_completed': {
      return tasks.map(task =>
        task._id === action.payload._id
          ? { ...task, completed: action.payload.completed }
          : task
      );
    }

    case 'added_task': {
      return [action.payload, ...tasks];
    }

    case 'deleted_task': {
      return tasks.filter(task => task._id !== action._id);
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};
