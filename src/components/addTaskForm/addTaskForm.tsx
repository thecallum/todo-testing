import { useState } from "react";

type Props = {
  addTask: (value: string) => void;
}

export default function ({ addTask }: Props) {
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = (e: React.FormEvent): void => {
    e.preventDefault();

    if (newTask === "") return;

    addTask(newTask);
    setNewTask("");
  };

  return (
    <form onSubmit={handleAddTask} className="addTask-form">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="addTask-input"
        placeholder="Add a task"
        data-cy="add-task-input"
      />
      <button type="submit" className="addTask-button" data-cy="add-task-button">
        Add
      </button>
    </form>
  );
}

