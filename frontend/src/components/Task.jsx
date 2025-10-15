import { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { TasksContext } from '../store/tasks-context.jsx';

export default function Task({
  task,
  onViewDetails,
  isExpanded,
}) {
  const { toggleTask, deleteTask } = useContext(TasksContext);

  const formattedDate = new Date(task.createdAt).toLocaleDateString(
    'en-US',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  );

  const priorityColors = {
    low: '#28a745',
    medium: '#ffc107',
    high: '#dc3545'
  };

  function handleComplete() {
    toggleTask(task.id);
  }

  function handleDelete() {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  }

  return (
    <motion.li layout exit={{ y: -30, opacity: 0 }}>
      <article className="task">
        <header>
          <div className="task-meta">
            <h2>{task.title}</h2>
            <p>Created on {formattedDate}</p>
            <p>
              Priority: <span style={{ color: priorityColors[task.priority] }}>
                {task.priority?.toUpperCase()}
              </span>
            </p>
            <p className="task-actions">
              <button onClick={handleComplete}>
                {task.status === 'completed' ? 'Mark as active' : 'Mark as completed'}
              </button>
              <button onClick={handleDelete} className='btn-negative'>
                Delete
              </button>
            </p>
          </div>
        </header>
        <div className="task-details">
          <p>
            <button onClick={onViewDetails}>
              View Details{' '}
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="task-details-icon"
              >
                &#9650;
              </motion.span>
            </button>
          </p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <p className="task-description">
                  {task.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </motion.li>
  );
}
