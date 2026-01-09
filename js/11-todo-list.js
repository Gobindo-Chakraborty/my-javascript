const todoList = [
  { name: "make dinner", dueDate: "2022-12-25" },
  { name: "wash dishes", dueDate: "2025-12-22" },
];
const inputElement = document.querySelector(".js-input");
const dateInputElement = document.querySelector(".js-due-date-input");
const todoContainer = document.querySelector(".js-todo-container");

function renderTodoList() {
  let todoListHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;
    const { name, dueDate } = todoObject;
    const html = `<div>${name}</div> <div>${dueDate}</div> <button onclick="todoList.splice(${i}, 1); renderTodoList();" class="delete-todo-button">Delete</button>`;
    todoListHTML += html;
  }
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
