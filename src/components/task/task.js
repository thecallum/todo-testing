import PropTypes from "prop-types";

export default function Task({ task, index, toggleCheckbox, deleteTask }) {
  const handleToggleCheckbox = () => {
    toggleCheckbox(index, !task.completed);
  };

  const handleDeleteTask = () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    deleteTask(index);
  };

  return (
    <li className="tasklist-item" data-cy="task">
      <div className="tasklist-item-left">
        <input
          className="tasklist-item-input"
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleCheckbox}
          data-cy="task-checkbox"
        />
        <span
          className={`tasklist-item-value ${task.completed ? "completed" : ""}`}
          data-cy="task-value"
        >
          {task.value}
        </span>
      </div>

      <button
        className="tasklist-item-button"
        onClick={handleDeleteTask}
        aria-label="Delete task"
        data-cy="delete-task-button"
      />
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

