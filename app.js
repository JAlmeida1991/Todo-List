const form = document.querySelector("#form");
const input = document.querySelector("#input");
const ol = document.querySelector("ol");

// ** Need to implement cross though logic... if user closes session

// Check if local storage exists in users browser return an empty array if otherwise
let todos = localStorage.getItem("todos");
if (!todos) {
  todos = [];
  // If todos is found in localStorage, display in new session
} else {
  displaylocalStorageTodos();
}

// DOM TRANSVERSAL WITH TEXT CONTENT IS BETTER WAY ACCEPT USER INPUT
form.addEventListener("submit", function(e) {
  if (input.value) {
    if (typeof todos === "string") {
      todos = JSON.parse(todos);
    }
    // If a completed is true for a todo, display line through class
    todos.push({
      value: input.value,
      completed: false
    });
    // Need to reset local storage everytime todos updates...
    localStorage.setItem("todos", JSON.stringify(todos));
    generateHTMLNodes(input.value);
    input.value = "";
  }
  e.preventDefault();
});

ol.addEventListener("click", function(e) {
  if (e.target.nodeName === "LI") {
    e.target.classList.toggle("done-todo");
  }
});

ol.addEventListener("click", function(e) {
  if (e.target.nodeName === "BUTTON") {
    let li = e.target.parentNode;
    //
    const todoIndex = Array.from(ol.children).indexOf(li);
    // console.log(todoIndex);
    //
    if (typeof todos === "string") {
      todos = JSON.parse(todos);
      todos.splice(todoIndex, 1);
      todos = JSON.stringify(todos);
    } else {
      todos.splice(todoIndex, 1);
      todos = JSON.stringify(todos);
    }
    // Need to reset local storage everytime todos updates...
    localStorage.setItem("todos", todos);
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
  if (typeof todos === "string") {
    JSON.parse(todos).forEach(function(todo) {
      // Passing in todo.value rather than just todo since each todo is an object
      generateHTMLNodes(todo.value);
    });
  }
}

function generateHTMLNodes(el) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const content = document.createTextNode(`${el}`);
  button.textContent = "Delete";
  button.className = "hidden";
  li.appendChild(button);
  li.appendChild(content);
  ol.appendChild(li);
}
