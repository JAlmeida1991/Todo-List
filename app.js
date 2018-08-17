const form = document.querySelector("#form");
const input = document.querySelector("#input");
const ol = document.querySelector("ol");

// DOM TRANSVERSAL WITH TEXT CONTENT IS BETTER WAY ACCEPT USER INPUT
form.addEventListener("submit", function(e) {
  if (input.value) {
    let li = document.createElement("li");
    let button = document.createElement("button");
    let content = document.createTextNode(`${input.value}`);
    button.textContent = "Delete";
    button.className = "hidden";
    li.appendChild(button);
    li.appendChild(content);
    ol.appendChild(li);
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
    ol.removeChild(li);
  }
});

ol.addEventListener("mouseover", function(e) {
  showDeleteButton(e);
});

ol.addEventListener("mouseout", function(e) {
  hideDeleteButton(e);
});

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

// VERSION 1 without using Form:

// const input = document.querySelector("#input");
// const ol = document.querySelector("ol");

// // DOM TRANSVERSAL WITH TEXT CONTENT IS BETTER WAY ACCEPT USER INPUT
// input.addEventListener("keydown", function(e) {
//   if (e.keyCode === 13 && input.value) {
//     let li = document.createElement("li");
//     let button = document.createElement("button");
//     let content = document.createTextNode(`${input.value}`);
//     button.textContent = "Delete";
//     button.className = "hidden";
//     li.appendChild(button);
//     li.appendChild(content);
//     ol.appendChild(li);
//     input.value = "";
//   }
// });

// ol.addEventListener("click", function(e) {
//   if (e.target.nodeName === "BUTTON") {
//     let li = e.target.parentNode;
//     ol.removeChild(li);
//   }
// });

// ol.addEventListener("mouseover", function(e) {
//   showDeleteButton(e);
// });

// ol.addEventListener("mouseout", function(e) {
//   hideDeleteButton(e);
// });

// ol.addEventListener("click", function(e) {
//   if (e.target.nodeName === "LI" && e.target.className === "") {
//     e.target.className = "done-todo";
//   } else {
//     e.target.className = "";
//   }
// });

// function showDeleteButton(e) {
//   if (e.target.nodeName === "LI") {
//     e.target.firstChild.className = "";
//   } else if (e.target.nodeName === "BUTTON") {
//     e.target.className = "";
//   }
// }

// function hideDeleteButton(e) {
//   if (e.target.nodeName === "LI") {
//     e.target.firstChild.className = "hidden";
//   } else if (e.target.nodeName === "BUTTON") {
//     e.target.className = "hidden";
//   }
// }

// THIS WILL ALLOW THE USER TO INPUT SCRIPT TAGS WHICH CAN CAUSE PROBLEMS TO THIS PROGRAM.
// input.addEventListener("keydown", function (e) {
//     if (e.keyCode === 13 && input.value) {
//         let li = document.createElement("li");
//         li.innerHTML = `<button class="hidden">Delete</button> <span>${this.value}</span>`;
//         ol.appendChild(li);
//         input.value = "";
//     }
// });

// THIS WILL ALLOW THE USER TO INPUT SCRIPT TAGS WHICH CAN CAUSE PROBLEMS TO THIS PROGRAM.
// input.addEventListener("keydown", function (e) {
//     if (e.keyCode === 13 && input.value) {
//         let li = document.createElement("li");
//         li.innerHTML = `<button class="hidden">Delete</button> <span>${this.value}</span>`;
//         ol.appendChild(li);
//         input.value = "";
//     }
// });
