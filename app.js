const ACTION = {
  DELETE: '0',
  EDIT: '1',
};

const mainContainer = document.querySelector('#todo-container');
const addTodoButton = document.querySelector('#todo-add');
const todoForm = document.querySelector('#todo-form');
const saveTodoButton = document.querySelector('#todo-save');
const cancelTodoButton = document.querySelector('#todo-cancel');
const formInputTodoName = document.querySelector('#todo-name');
const statusSelectFilter = document.querySelector('#status-filter');

let isEditMode = false;
let editTodoId = null;

(function init() {
  server.getTodos().then(ui.displayTodos);
  mainContainer.addEventListener('click', actionHandler);
  addTodoButton.addEventListener('click', showTodoForm);
  saveTodoButton.addEventListener('click', saveTodoHandler);
  cancelTodoButton.addEventListener('click', hideTodoForm);
  formInputTodoName.addEventListener('input', handleFormValidity);
  statusSelectFilter.addEventListener('change', handleFilterByStatus);
})();

function actionHandler(ev) {
  const todoAction = ev.target.dataset['action'];

  if (!todoAction) {
    return;
  }

  const todoId = ev.target.dataset['id'];

  if (todoAction === ACTION.DELETE) {
    return server.removeTodo(todoId).then(console.log);
  }

  if (todoAction === ACTION.EDIT) {
    isEditMode = true;
    editTodoId = todoId;

    server.getTodo(todoId).then((todo) => {
      document.forms['todo-form']['todo-name'].value = todo.title;
      document.forms['todo-form']['todo-status'].value = todo.status;

      saveTodoButton.textContent = 'Update';
      showTodoForm();
      saveTodoButton.removeAttribute('disabled');
    });
  }
}

function showTodoForm() {
  todoForm.classList.remove('d-none');
}

function hideTodoForm() {
  todoForm.classList.add('d-none');
}

function saveTodoHandler() {
  const payload = {
    title: document.forms['todo-form']['todo-name'].value,
    status: +document.forms['todo-form']['todo-status'].value,
  };

  hideTodoForm();

  // return isEditMode ? server.updateTodo() : server.addTodo(payload);

  if (isEditMode) {
    server.updateTodo(payload, editTodoId);
    isEditMode = false;
    editTodoId = null;
  } else {
    server.addTodo(payload);
  }
}

function handleFormValidity(event) {
  if (!event.target.value) {
    saveTodoButton.setAttribute('disabled');
    saveTodoButton.title = 'Todo title is required'; // Not working

    return;
  }

  saveTodoButton.removeAttribute('title');
  saveTodoButton.removeAttribute('disabled');
}

function handleFilterByStatus(ev) {
  const statusFilter = ev.target.value;

  server.getTodos(statusFilter).then((todos) => {
    ui.resetView();
    ui.displayTodos(todos);
  });
}

// Use the following for image upload from local machine and save to database as base64
// The base64 expression can be provided as value for src attribute on an HTMLImageElement <img />

// document.querySelector("#file").addEventListener("change", (ev) => {
//   const file = ev.target.files[0];
//   const reader = new FileReader();

//   reader.readAsDataURL(file);
//   reader.onloadend = () => console.log(reader.result);
//   reader.onerror = () => console.error(reader.error);
// });

// Use the following for image upload from remote target (different domain/origin than local machine)

// const imageUrl =
//   "https://images.unsplash.com/photo-1658496723006-7d4d39ad38e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80";

// fetch(imageUrl)
//   .then((res) => res.blob())
//   .then((data) => {
//     const reader = new FileReader();

//     reader.readAsDataURL(data);
//     reader.onloadend = () => console.log(reader.result);
//     reader.onerror = () => console.error(reader.error);
//   });

// In the callback of reader.onloadend you need to communicate with the database to actually save the image as base64 😉
