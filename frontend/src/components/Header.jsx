import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import NewTask from './NewTask.jsx';

export default function Header() {
  const [isCreatingNewTask, setIsCreatingNewTask] = useState();

  function handleStartAddNewTask() {
    setIsCreatingNewTask(true);
  }

  function handleDone() {
    setIsCreatingNewTask(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewTask && <NewTask onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Tasks</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 500 }}
          onClick={handleStartAddNewTask}
          className="button"
        >
          Add Task
        </motion.button>
      </header>
    </>
  );
}
