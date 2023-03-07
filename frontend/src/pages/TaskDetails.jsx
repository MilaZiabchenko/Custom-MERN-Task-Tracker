import { useParams, useNavigate } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useTasks from '../hooks/useTasks';
import Spinner from '../components/Spinner';

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const { isLoading, error, tasks: task } = useTasks(`/api/tasks/${taskId}`);
  const { name, time, priority, completed, updatedAt } = task;

  if (isLoading) return <Spinner />;

  return (
    <section className='details'>
      {error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <h2>{name}</h2>
          <h4>
            {' '}
            Priority: <strong>{priority}</strong>{' '}
          </h4>
          <h4>
            Scheduled time: <strong>{time}</strong>{' '}
          </h4>
          <h4>
            Last updated:{' '}
            <strong>
              {formatDistanceToNow(new Date(updatedAt), {
                addSuffix: true
              })}
            </strong>
          </h4>
          <h3>
            Task is{' '}
            {completed
              ? 'ongoing or brought to an end ⌛🤸‍♀️😊'
              : 'to be completed... ⏳'}
          </h3>
        </>
      )}
      <button className='btn' onClick={() => navigate('/')}>
        Back to Tasks
      </button>
    </section>
  );
};

export default TaskDetails;
