const form = document.querySelector("#form");
const input = document.querySelector("#input");
const ol = document.querySelector("ol");

// todos will either be null or a array of previous todos
let todos = JSON.parse(localStorage.getItem("todos"));
// if todos is null todos will be set an an empty array
if (!todos) {
  todos = [];
} else {
  // If todos is found in localStorage, display in new session
  displaylocalStorageTodos();
}

// *** DOM TRANSVERSAL WITH TEXT CONTENT IS BETTER WAY ACCEPT USER INPUT USING INNERHTML ***
form.addEventListener("submit", function(e) {
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
  }
  // Need to prevent the default status even if user does not enter anything
  e.preventDefault();
});

ol.addEventListener("click", function(e) {
  if (e.target.nodeName === "LI") {
    e.target.classList.toggle("done-todo");
    const li = e.target;
    // Need to call Array.from since ol.children is an HTMLCollection not a node list
    const todoIndex = Array.from(ol.children).indexOf(li);
    todos[todoIndex].completed = !todos[todoIndex].completed;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});

ol.addEventListener("click", function(e) {
  if (e.target.nodeName === "BUTTON") {
    const li = e.target.parentNode;
    // Need to call Array.from since ol.children is an HTMLCollection not a node list
    const todoIndex = Array.from(ol.children).indexOf(li);
    todos.splice(todoIndex, 1);
    // Need to reset local storage everytime todos updates...
    localStorage.setItem("todos", JSON.stringify(todos));
    ol.removeChild(li);
  }
});

ol.addEventListener("mouseover", showDeleteButton);

ol.addEventListener("mouseout", hideDeleteButton);

function showDeleteButton(e) {
  // console.log(e.target.firstChild);
  if (e.target.nodeName === "LI") {
    e.target.firstChild.className = "";
  } else if (e.target.nodeName === "BUTTON") {
    e.target.className = "";
  }
}

function hideDeleteButton(e) {
  if (e.target.nodeName === "LI") {
    e.target.firstChild.className = "hidden";
  } else if (e.target.nodeName === "BUTTON") {
    e.target.className = "hidden";
  }
}

function displaylocalStorageTodos() {
  // Passing in todo.value rather than just todo since each todo is an object
  todos.forEach(function(todo) {
    if (todo.completed) {
      generateHTMLNode(todo.value).className = "done-todo";
    } else {
      generateHTMLNode(todo.value);
    }
  });
}

function generateHTMLNode(el) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const content = document.createTextNode(`${el}`);
  button.textContent = "Delete";
  button.className = "hidden";
  li.appendChild(button);
  li.appendChild(content);
  ol.appendChild(li);
  // returing the individual li in order to display done-todo even after user closes session
  return li;
}
