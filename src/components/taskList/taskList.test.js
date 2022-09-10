import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskList from "./taskList";

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
    const tasks = [];
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

