import Chance from "chance";
const chance = new Chance();

describe("ToDo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Does not add task to list when input is empty", () => {
    // click add button
    cy.get('[data-cy="add-task-button"]').click();

    // assert that no list items exist
    cy.get('[data-cy="task"]').should("not.exist");
  });

  it("Adds task to list when add button clicked", () => {
    const taskName = chance.sentence({ words: 5 });

    // input value into input
    cy.get('[data-cy="add-task-input"]').type(taskName);
    // click add button
    cy.get('[data-cy="add-task-button"]').click();

    // assert that task with same name exists
    cy.get('[data-cy="task-value"]').first().contains(taskName);
  });

  it("Clears input when task is added to list", () => {
    const taskName = chance.sentence({ words: 5 });

    // input value into input
    cy.get('[data-cy="add-task-input"]').type(taskName);
    // click add button
    cy.get('[data-cy="add-task-button"]').click();

    // assert that input is empty
    cy.get('[data-cy="add-task-input"]').should("have.value", "");
  });

  it("Updates the completed status when a task checkbox is clicked", () => {
    const taskName = chance.sentence({ words: 5 });

    // input value into input
    cy.get('[data-cy="add-task-input"]').type(taskName);
    // click add button
    cy.get('[data-cy="add-task-button"]').click();

    // click checkbox
    cy.get('[data-cy="task-checkbox"]').first().click();

    // assert that checkbox is enabled
    cy.get('[data-cy="task-checkbox"]').first().should("be.checked");
    // assert that 'completed' class is assigned to value field
    cy.get('[data-cy="task-value"]').first().should("have.class", "completed");

    // click checkbox again
    cy.get('[data-cy="task-checkbox"]').first().click();

    // assert that checkbox is disabled
    cy.get('[data-cy="task-checkbox"]').first().should("not.be.checked");
    // assert that 'completed' class is not assigned to value field
    cy.get('[data-cy="task-value"]')
      .first()
      .should("not.have.class", "completed");
  });

  it("Does not delete a task when not confirmed", () => {
    const taskName = chance.sentence({ words: 5 });

    // input value into input
    cy.get('[data-cy="add-task-input"]').type(taskName);
    // click add button
    cy.get('[data-cy="add-task-button"]').click();

    // click delete button
    cy.get('[data-cy="delete-task-button"]').click();

    // confirm dialog should appear
    cy.on("window:confirm", (txt) => {
      expect(txt).to.contains("Are you sure you want to delete this task?");

      // don't confirm message
      return false;
    });

    // assert that task still exists
    cy.get('[data-cy="task-value"]').first().contains(taskName);
  });

  it("Deletes a task when the delete button is clicked and confirmed", () => {
    const taskName = chance.sentence({ words: 5 });

    // input value into input
    cy.get('[data-cy="add-task-input"]').type(taskName);
    // click add button
    cy.get('[data-cy="add-task-button"]').click();

    // click delete button
    cy.get('[data-cy="delete-task-button"]').click();

    // confirm dialog should appear
    cy.on("window:confirm", (txt) => {
      expect(txt).to.contains("Are you sure you want to delete this task?");

      // confirm message
      return true;
    });

    // assert that task doesn't exist
    cy.get('[data-cy="task"]').should("not.exist");
  });

  it("When there are no tasks, displays message to the user", () => {
    // assert message exists
    cy.get('[data-cy="no-tasks-message"]');

    // add task
    const taskName = chance.sentence({ words: 5 });

    cy.get('[data-cy="add-task-input"]').type(taskName);
    cy.get('[data-cy="add-task-button"]').click();

    // assert message doesn't exist
    cy.get('[data-cy="no-tasks-message"]').should("not.exist");

    // delete task
    cy.get('[data-cy="delete-task-button"]').click();
    cy.on("window:confirm", () => true);

    // asset message exists again
    cy.get('[data-cy="no-tasks-message"]');
  });
});

