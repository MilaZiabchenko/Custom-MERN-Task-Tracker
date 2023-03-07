import { useReducer, useState, useEffect } from 'react';
import { tasksReducer } from './../reducers/tasksReducer.js';

const useTasks = url => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  useEffect(() => {
    let ignore = false;

    const getTasks = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 404) {
            window.location = '/not-found';
          }

          setError(`Oops ${response.status}: ${response.statusText}`);

          throw new Error(`Oops, ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!ignore) {
          dispatch({ type: 'loaded_tasks', payload: data });
        }
      } catch (err) {
        setError(err.message);

        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    getTasks();

    return () => {
      ignore = true;
    };
  }, [url]);

  return { isLoading, error, tasks };
};

export default useTasks;
