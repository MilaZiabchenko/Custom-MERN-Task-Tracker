import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { useTasksContext } from '../context/TasksContext';

const TasksListItem = ({ position, task }) => {
  const { toggleCompleted, editTask, deleteTask } = useTasksContext();

  const { _id, name, time, priority, completed } = task;
  const taskTitle = `#${position} — ${name}`;

  return (
    <article
      className={completed ? 'task' : 'task not-completed'}
      onDoubleClick={() => toggleCompleted(_id)}
    >
      <div className='priority-num-display'>{priority}</div>
      <h3>
        <span>
          {taskTitle}
          {completed && <span> ✔ </span>}
        </span>
        <div className='task-buttons'>
          <button onClick={() => editTask(_id)}>
            <FaEdit />
          </button>
          <button onClick={() => deleteTask(_id)}>
            <FaTrashAlt />
          </button>
        </div>
      </h3>
      <p>{time}</p>
      <p>
        <Link to={`/task/${_id}`}>View details</Link>
      </p>
    </article>
  );
};

TasksListItem.propTypes = {
  position: PropTypes.number,
  task: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    time: PropTypes.string,
    priority: PropTypes.number,
    completed: PropTypes.bool
  })
};

export default TasksListItem;
