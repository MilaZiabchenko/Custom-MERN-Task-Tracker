const makeUpdatedTaskFirstItemInTheList = (tasks, action, updatedTasks) => {
  const editedTaskIndex = tasks.findIndex(
    task => task._id === action.payload._id
  );

  return editedTaskIndex === 0
    ? updatedTasks
    : [
        updatedTasks.at(editedTaskIndex),
        ...updatedTasks.slice(0, editedTaskIndex),
        ...updatedTasks.slice(editedTaskIndex + 1)
      ];
};

export { makeUpdatedTaskFirstItemInTheList };
