import { render } from "@testing-library/react";
import { expect } from '@jest/globals';
import userEvent from "@testing-library/user-event";
import TaskItem from "./task";

describe("Task", () => {
  it("Renders component", () => {
    // Arrange
    const task = { value: "task description", completed: false };
    const index = 0;
    const toggleCheckbox = () => {};
    const deleteTask = () => {};

    // Act
    const { asFragment } = render(
      <TaskItem
        task={task}
        index={index}
        toggleCheckbox={toggleCheckbox}
        deleteTask={deleteTask}
      />
    );

    // Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it.each([true, false])(
    "Calls toggleCheckbox when checkbox clicked",
    (taskCompleted) => {
      // Arrange
      const task = { value: "task description", completed: taskCompleted };
      const index = 0;
      const toggleCheckbox = jest.fn();
      const deleteTask = () => {};

      const { container } = render(
        <TaskItem
          task={task}
          index={index}
          toggleCheckbox={toggleCheckbox}
          deleteTask={deleteTask}
        />
      );

      // Act
      const checkbox = container.querySelector(
        "input.taskList-item-input"
      ) as Element;
      userEvent.click(checkbox);

      // Assert
      expect(toggleCheckbox).toHaveBeenCalledWith(index, !taskCompleted);
    }
  );

  it("Calls doesn't call delete task when not confirmed", () => {
    // Arrange
    const task = { value: "task description", completed: true };
    const index = 0;
    const toggleCheckbox = () => {};
    const deleteTask = jest.fn();

    const alertMock = jest
      .spyOn(window, "confirm")
      .mockImplementation(() => false);

    const { container } = render(
      <TaskItem
        task={task}
        index={index}
        toggleCheckbox={toggleCheckbox}
        deleteTask={deleteTask}
      />
    );

    // Act
    const button = container.querySelector(
      "button.taskList-item-button"
    ) as Element;
    userEvent.click(button);

    // Assert
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(deleteTask).toHaveBeenCalledTimes(0);
  });

  it("Calls calls delete task when confirmed", () => {
    // Arrange
    const task = { value: "task description", completed: true };
    const index = 0;
    const toggleCheckbox = () => {};
    const deleteTask = jest.fn();

    const alertMock = jest
      .spyOn(window, "confirm")
      .mockImplementation(() => true);

    const { container } = render(
      <TaskItem
        task={task}
        index={index}
        toggleCheckbox={toggleCheckbox}
        deleteTask={deleteTask}
      />
    );

    // Act
    const button = container.querySelector(
      "button.taskList-item-button"
    ) as Element;
    userEvent.click(button);

    // Assert
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(deleteTask).toHaveBeenCalledTimes(1);

    expect(deleteTask).toHaveBeenCalledWith(index);
  });
});

