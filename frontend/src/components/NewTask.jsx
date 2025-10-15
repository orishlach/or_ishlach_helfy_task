import { useContext, useRef, useState } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';

import { TasksContext } from '../store/tasks-context.jsx';
import Modal from './Modal.jsx';

export default function NewTask({ onDone }) {
  const title = useRef();
  const description = useRef();
  const priority = useRef();

  const [scope, animate] = useAnimate();

  const { addTask, isLoading } = useContext(TasksContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const task = {
      title: title.current.value,
      description: description.current.value,
      priority: priority.current.value,
    };

    if (
      !task.title.trim() ||
      !task.description.trim() ||
      !task.priority.trim() 
    ) {
      animate(
        'input, textarea, select',
        { x: [-10, 0, 10, 0] },
        /** FIX FOR NEWER FRAMER MOTION -- no 'spring' transition  */
        { type: 'linear', duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }

    try {
      await addTask(task);
      onDone();
    } catch (error) {
    }
  }

  return (
    <Modal title="New Task" onClose={onDone}>
      <form id="new-task" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="priority">Priority</label>
          <select ref={priority} name="priority" id="priority">
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </p>

        <p className="new-task-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Task'}
          </button>
        </p>
      </form>
    </Modal>
  );
}
