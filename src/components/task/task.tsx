import { Task } from '../../interfaces/interfaces'

type Props = {
  task: Task;
  index: number;
  toggleCheckbox: (index: number, completed: boolean) => void;
  deleteTask: (index: number) => void;
};

export default function ({
  task,
  index,
  toggleCheckbox,
  deleteTask,
}: Props) {
  const handleToggleCheckbox = (): void => {
    toggleCheckbox(index, !task.completed);
  };

  const handleDeleteTask = (): void => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    deleteTask(index);
  };

  return (
    <li className="taskList-item" data-cy="task">
      <div className="taskList-item-left">
        <input
          className="taskList-item-input"
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleCheckbox}
          data-cy="task-checkbox"
        />
        <span
          className={`taskList-item-value ${task.completed ? "completed" : ""}`}
          data-cy="task-value"
        >
          {task.value}
        </span>
      </div>

      <button
        className="taskList-item-button"
        onClick={handleDeleteTask}
        aria-label="Delete task"
        data-cy="delete-task-button"
      />
    </li>
  );
}

