const todoList = [
  { name: "make dinner", dueDate: "2022-12-25" },
  { name: "wash dishes", dueDate: "2025-12-22" },
];

const inputElement = document.querySelector(".js-input");
const dateInputElement = document.querySelector(".js-due-date-input");
const addTodoButton = document.querySelector(".js-add-todo-button");
const todoContainer = document.querySelector(".js-todo-container");

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";
  todoList.forEach((todoObject) => {
    const { name, dueDate } = todoObject;

    const html = `<div>${name}</div> <div>${dueDate}</div> <button class="delete-todo-button js-delete-todo-button">Delete</button>`;
    todoListHTML += html;
  });
  todoContainer.innerHTML = todoListHTML;

  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteBtn, index) => {
      deleteBtn.addEventListener("click", () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    });
}

function addTodo() {
  const name = inputElement.value;
  const dueDate = dateInputElement.value;
  todoList.push({ name, dueDate });
  renderTodoList();
  inputElement.value = "";
}

addTodoButton.addEventListener("click", () => {
  addTodo();
});

inputElement.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
