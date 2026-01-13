const todoList = [
  { name: "make dinner", dueDate: "2022-12-25" },
  { name: "wash dishes", dueDate: "2025-12-22" },
];
const inputElement = document.querySelector(".js-input");
const dateInputElement = document.querySelector(".js-due-date-input");
const todoContainer = document.querySelector(".js-todo-container");

function renderTodoList() {
  let todoListHTML = "";
  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;

    const html = `<div>${name}</div> <div>${dueDate}</div> <button onclick="todoList.splice(${index}, 1); renderTodoList();" class="delete-todo-button">Delete</button>`;
    todoListHTML += html;
  });
  todoContainer.innerHTML = todoListHTML;
}
renderTodoList();

function addTodo() {
  const name = inputElement.value;
  const dueDate = dateInputElement.value;
  todoList.push({ name, dueDate });
  renderTodoList();
  inputElement.value = "";
}

inputElement.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
