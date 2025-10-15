import { useContext, useState } from "react";
import { TasksContext } from "../store/tasks-context.jsx";
import Task from "./Task.jsx";
import TaskTabs from "./TaskTabs.jsx";

export default function Tasks() {
  const { tasks } = useContext(TasksContext);
  const [selectedType, setSelectedType] = useState("active");
  const [expanded, setExpanded] = useState(null);

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => (prevId === id ? null : id));
  }

  const filteredTasks = {
    active: tasks.filter((task) => task.status === "active"),
    completed: tasks.filter((task) => task.status === "completed"),
  };

  const displayedTasks = filteredTasks[selectedType];

  const loopedTasks = [...displayedTasks, ...displayedTasks, ...displayedTasks];

  return (
    <div id="tasks">
      <TaskTabs
        tasks={filteredTasks}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {displayedTasks.length > 0 ? (
          <div className="carousel">
            <div className="carousel-slide">
              {loopedTasks.map((task, index) => (
                <div key={`${task.id}-${index}`} className="carousel-item">
                  <Task
                    task={task}
                    onViewDetails={() => handleViewDetails(task.id)}
                    isExpanded={expanded === task.id}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No tasks found.</p>
        )}
      </TaskTabs>
    </div>
  );
}
