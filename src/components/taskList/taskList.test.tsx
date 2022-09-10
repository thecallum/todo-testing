import { render } from "@testing-library/react";
import TaskList from "./taskList";
import { Task } from '../../interfaces/interfaces'

describe("TaskList", () => {
  it("Renders component when many tasks", () => {
    // Arrange
    const tasks = [
      { value: "task description one", completed: false },
      { value: "task description two", completed: true },
    ];
    const toggleCheckbox = () => {};
    const deleteTask = () => {};

    // Act
    const { asFragment } = render(
      <TaskList
        tasks={tasks}
        toggleCheckbox={toggleCheckbox}
        deleteTask={deleteTask}
      />
    );

    // Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it("Renders component when no tasks", () => {
    // Arrange
    const tasks: Task[] = [];
    const toggleCheckbox = () => {};
    const deleteTask = () => {};

    // Act
    const { asFragment } = render(
      <TaskList
        tasks={tasks}
        toggleCheckbox={toggleCheckbox}
        deleteTask={deleteTask}
      />
    );

    // Assert
    expect(asFragment()).toMatchSnapshot();
  });
});

