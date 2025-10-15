import { motion } from 'framer-motion';

import Badge from './Badge.jsx';

function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? 'selected' : undefined}
        onClick={onSelect}
      >
        {children}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      {isSelected && <motion.div layoutId="tab-indicator" className="active-tab-indicator" />}
    </li>
  );
}

export default function TaskTabs({
  selectedType,
  onSelectType,
  tasks,
  children,
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === 'active'}
          onSelect={() => onSelectType('active')}
          badgeCaption={tasks.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === 'completed'}
          onSelect={() => onSelectType('completed')}
          badgeCaption={tasks.completed.length}
        >
          Completed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
