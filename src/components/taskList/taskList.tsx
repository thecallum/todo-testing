import TaskItem from "../task/task";
import { Task } from '../../interfaces/interfaces'

type Props = {
  tasks: Task[],
  toggleCheckbox: (index: number, completed: boolean) => void,
  deleteTask: (index: number) => void,
}

export default function ({ tasks, toggleCheckbox, deleteTask }: Props) {
  if (tasks.length === 0)
    return <div className="taskList-empty" data-cy="no-tasks-message">You have no tasks</div>;

  return (
    <ul className="taskList">
      {tasks.map((task, index) => (
        <TaskItem
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
