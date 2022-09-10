import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTaskForm from "./addTaskForm";

describe("AddTaskForm", () => {
  it("Renders component", () => {
    // Arrange
    const addTask = () => {};

    // Act
    const { asFragment } = render(<AddTaskForm addTask={addTask} />);

    // Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it("When empty input, doesn't submit form", () => {
    // Arrange
    const addTask = jest.fn();

    const { container } = render(<AddTaskForm addTask={addTask} />);

    // Act
    const submitButton = container.querySelector("button.addTask-button");
    userEvent.click(submitButton);

    // Assert
    expect(addTask).toHaveBeenCalledTimes(0);
  });

  it("When valid input, does submit form", () => {
    // Arrange
    const addTask = jest.fn();
    const textInput = "foo";

    const { container } = render(<AddTaskForm addTask={addTask} />);

    // Act
    const input = container.querySelector("input.addTask-input");

    userEvent.click(input);
    userEvent.keyboard(textInput);

    const submitButton = container.querySelector("button.addTask-button");
    userEvent.click(submitButton);

    // Assert
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addTask).toHaveBeenCalledWith(textInput);
  });

  it("When form submitted, test input is cleared", () => {
    // Arrange
    const addTask = jest.fn();
    const textInput = "foo";

    const { container } = render(<AddTaskForm addTask={addTask} />);

    // Act
    const input = container.querySelector("input.addTask-input");

    userEvent.click(input);
    userEvent.keyboard(textInput);

    const submitButton = container.querySelector("button.addTask-button");
    userEvent.click(submitButton);

    // Assert
    expect(addTask).toHaveBeenCalledTimes(1);

    expect(input.value).toEqual("");
  });
});

