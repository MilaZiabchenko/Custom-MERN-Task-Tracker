import { useTasksContext } from '../context/TasksContext';

const AddButton = () => {
  const { showTaskForm, toggleTaskFormIsOpen } = useTasksContext();

  return (
    <button className='btn' onClick={toggleTaskFormIsOpen}>
      {showTaskForm ? 'Close' : 'Add'}
    </button>
  );
};

export default AddButton;
