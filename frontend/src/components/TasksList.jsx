import { useCallback, useMemo } from 'react';
import { useTasksContext } from '../context/TasksContext';
import { CATEGORIES } from '../constants/categories.js';
import { AnimatePresence, motion } from 'framer-motion';
import TasksListItem from './TasksListItem';
import Spinner from './Spinner';

const TasksList = () => {
  const { activeCategory, isLoading, error, tasks } = useTasksContext();

  const getVisibleTasks = useCallback(() => {
    if (activeCategory === CATEGORIES.LATEST) {
      return tasks;
    }

    if (activeCategory === CATEGORIES.PRIOR) {
      return [...tasks].sort((prev, next) => next.priority - prev.priority);
    }

    if (activeCategory === CATEGORIES.TODO) {
      return tasks.filter(task => !task.completed);
    }

    if (activeCategory === CATEGORIES.DONE) {
      return tasks.filter(task => task.completed);
    }
  }, [activeCategory, tasks]);

  const visibleTasks = useMemo(() => getVisibleTasks(), [getVisibleTasks]);

  if (isLoading) return <Spinner />;
  if (error) return <h3>{error}</h3>;

  return (
    <section>
      {visibleTasks?.length > 0 ? (
        <AnimatePresence>
          {visibleTasks.map((task, i) => (
            <motion.div
              key={task._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TasksListItem position={visibleTasks.length - i} task={task} />
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        <h3>No Tasks To Show...</h3>
      )}
    </section>
  );
};

export default TasksList;
