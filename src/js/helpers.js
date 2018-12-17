import { form, input, ol, submitBtn } from "./globals";

// todos will either be null or a array of previous todos
let todos = JSON.parse(localStorage.getItem("todos"));
// if todos is null todos will be set an an empty array
if (!todos) {
  todos = [];
} else {
  // If todos is found in localStorage, display in new session
  displaylocalStorageTodos();
}

function showDeleteButton(e) {
  if (e.target.nodeName === "LI") {
    e.target.firstChild.className = "";
  } else if (e.target.nodeName === "BUTTON") {
    e.target.className = "";
  } else if (e.target.nodeName === "I") {
    e.target.parentNode.className = "";
  }
}

function hideDeleteButton(e) {
  if (e.target.nodeName === "LI") {
    e.target.firstChild.className = "hidden-js";
  } else if (e.target.nodeName === "BUTTON") {
    e.target.className = "hidden-js";
  } else if (e.target.nodeName === "I") {
    e.target.parentNode.className = "hidden-js";
  }
}

function displaylocalStorageTodos() {
  // Passing in todo.value rather than just todo since each todo is an object
  todos.forEach(todo => {
    if (todo.completed) {
      generateHTMLNode(todo.value).className = "done-todo-js";
    } else {
      generateHTMLNode(todo.value);
    }
  });
}

function generateHTMLNode(el) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const content = document.createTextNode(`${el}`);
  const i = document.createElement("i");
  i.classList = "fas fa-trash";
  i.style.fontSize = "1.6rem";
  button.appendChild(i);
  button.className = "hidden-js";
  button.style.padding = "1rem";
  li.appendChild(button);
  li.appendChild(content);
  ol.appendChild(li);
  // returning the individual li in order to display done-todo even after user closes session
  return li;
}

function displayError() {
  // This will prevent the user from spamming error messages
  if (document.querySelector(".error-js")) {
    document.querySelector(".error-js").remove();
  }
  const error = document.createElement("div");
  const icon = document.createElement("i");
  const message = document.createTextNode("Please enter a valid todo...");
  icon.className = "fas fa-exclamation-triangle";
  icon.style.height = "1rem";
  icon.style.marginRight = "1rem";
  error.appendChild(icon);
  error.appendChild(message);
  error.className = "error-js";
  form.insertAdjacentElement("afterend", error);
  // Remove the error after 1 second
  setTimeout(() => {
    error.remove();
  }, 1000);
}

function displaySubmitInput() {
  submitBtn.classList.add("submit-js");
  setTimeout(() => {
    submitBtn.classList.remove("submit-js");
  }, 250);
}

function addTodo(e) {
  // This will make the button seemed like it was clicked even if user choices to press enter
  displaySubmitInput();
  // If user did enter a todo then excute the following code.
  if (input.value) {
    // If a completed is true for a todo, display line through class
    todos.push({
      value: input.value,
      completed: false
    });
    // Need to set local storage everytime todos updates...
    localStorage.setItem("todos", JSON.stringify(todos));
    generateHTMLNode(input.value);
    input.value = "";
  } else {
    // If user does not enter a todo, display error message
    displayError();
  }
  // Need to prevent the default status even if user does not enter anything
  e.preventDefault();
}

function storageForTodos(e) {
  // 1. Need to check if localStorage key is actually for todos
  if (e.key === "todos") {
    // 2. Need to delete all todos first otherwise todos will stack...
    while (ol.firstChild) {
      ol.removeChild(ol.firstChild);
    }
    // 3. If this is a new session, need to set todos as the value from JSON.parse
    todos = JSON.parse(localStorage.getItem("todos"));
    // 4. Set any changes to localStorage
    localStorage.setItem("todos", e.newValue);
    // 5. Display new todos
    displaylocalStorageTodos();
  }
}

function completeTodo(e) {
  if (e.target.nodeName === "LI") {
    e.target.classList.toggle("done-todo-js");
    const li = e.target;
    // Need to call Array.from since ol.children is an HTMLCollection not a node list
    const todoIndex = Array.from(ol.children).indexOf(li);
    todos[todoIndex].completed = !todos[todoIndex].completed;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function deleteTodo(e) {
  let li;
  if (e.target.nodeName === "BUTTON") {
    li = e.target.parentNode;
  } else if (e.target.nodeName === "I") {
    li = e.target.parentNode.parentNode;
  }
  // li will only have a value if a button or i was selected
  if (li) {
    // Need to call Array.from since ol.children is an HTMLCollection not a node list
    const todoIndex = Array.from(ol.children).indexOf(li);
    todos.splice(todoIndex, 1);
    // Need to reset local storage everytime todos updates...
    localStorage.setItem("todos", JSON.stringify(todos));
    ol.removeChild(li);
  }
}

export {
  addTodo,
  storageForTodos,
  completeTodo,
  deleteTodo,
  showDeleteButton,
  hideDeleteButton
};
