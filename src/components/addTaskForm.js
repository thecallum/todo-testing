import { useState } from "react";
import PropTypes from "prop-types";

export default function AddTaskForm({ addTask }) {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();

    if (newTask === "") return;

    addTask(newTask);
    setNewTask("");
  };

  return (
    <form onSubmit={handleAddTask} className="addTask-form">
      <input
        type="text"
        name=""
        id=""
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="addTask-input"
        placeholder="Add a task"
      />
      <button type="submit" className="addTask-button">
        Add
      </button>
    </form>
  );
}

AddTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};
