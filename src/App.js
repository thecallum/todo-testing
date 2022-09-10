import "./App.css";
import { useState } from "react";

import Header from "./components/header/header";
import AddTaskForm from "./components/addTaskForm/addTaskForm";
import TaskList from "./components/taskList/taskList";

function App() {
  const [tasks, setTasks] = useState([
    // {
    //   value: "Get groceries",
    //   completed: false,
    // }
  ]);

  const addTask = (value) => {
    const newTask = {
      value: value,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleCheckbox = (taskIndex, completed) => {
    const newTasks = tasks.map((task, index) => {
      if (index !== taskIndex) return task;

      return {
        ...task,
        completed,
      };
    });

    setTasks(newTasks);
  };

  const deleteTask = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);

    setTasks(newTasks);
  };

  return (
    <div>
      <Header />

      <div className="container">
        <AddTaskForm addTask={addTask} />

        <TaskList
          tasks={tasks}
          toggleCheckbox={toggleCheckbox}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;

