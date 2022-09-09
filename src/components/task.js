import { configure } from "@testing-library/react";

export default function Task({ task, index, toggleCheckbox, deleteTask }) {
  const handleToggleCheckbox = () => {
    toggleCheckbox(index, !task.completed);
  };

  const handleDeleteTask = () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    deleteTask(index);
  };

  return (
    <li className="tasklist-item">
      <div className="tasklist-item-left">
        <input
          className="tasklist-item-input"
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleCheckbox}
        />
        <span
          className={`tasklist-item-value ${task.completed && "completed"}`}
        >
          {task.value}
        </span>
      </div>

      <button
        className="tasklist-item-button"
        onClick={handleDeleteTask}
        aria-label="Delete task"
      />
    </li>
  );
}

