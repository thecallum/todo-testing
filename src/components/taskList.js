import Task from "../components/task";

export default function TaskList({ tasks, toggleCheckbox, deleteTask }) {
  if (tasks.length === 0)
    return <div className="tasklist-empty">You have no tasks</div>;

  return (
    <ul className="tasklist">
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          index={index}
          toggleCheckbox={toggleCheckbox}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

