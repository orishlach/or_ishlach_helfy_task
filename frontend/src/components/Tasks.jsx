import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { TasksContext } from '../store/tasks-context.jsx';
import Task from './Task.jsx';
import TaskTabs from './TaskTabs.jsx';

export default function Tasks() {
  const { tasks, isLoading, error } = useContext(TasksContext);
  const [selectedType, setSelectedType] = useState('active');
  const [expanded, setExpanded] = useState(null);

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredTasks = {
    active: tasks.filter((task) => task.status === 'active'),
    completed: tasks.filter((task) => task.status === 'completed'),
  };

  const displayedTasks = filteredTasks[selectedType];

  return (
    <div id="tasks">
      <TaskTabs
        tasks={filteredTasks}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.p
              key="loading"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              Loading tasks...
            </motion.p>
          )}

          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ color: 'red' }}
            >
              {error}
            </motion.p>
          )}

          {!isLoading && !error && displayedTasks.length > 0 && (
            <motion.ol
              key="list"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ y: -30, opacity: 0 }}
              className="task"
            >
              <AnimatePresence>
                {displayedTasks.map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    onViewDetails={() => handleViewDetails(task.id)}
                    isExpanded={expanded === task.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}

          {!isLoading && !error && displayedTasks.length === 0 && (
            <motion.p
              key="fallback"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              No tasks found.
            </motion.p>
          )}
        </AnimatePresence>
      </TaskTabs>
    </div>
  );
}
