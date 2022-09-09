import Task from "../components/task";

export default function TaskList({ tasks, toggleCheckbox, deleteTask }) {
  return (
    <div>
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
    </div>
  );
}
