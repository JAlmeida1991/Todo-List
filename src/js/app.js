import "@fortawesome/fontawesome-free/css/all.min.css";
import { form, ol } from "./globals";
import {
  addTodo,
  storageForTodos,
  completeTodo,
  deleteTodo,
  showDeleteButton,
  hideDeleteButton
} from "./helpers";

form.addEventListener("submit", addTodo);

window.addEventListener("storage", storageForTodos);

ol.addEventListener("click", completeTodo);

ol.addEventListener("click", deleteTodo);

ol.addEventListener("mouseover", showDeleteButton);

ol.addEventListener("mouseout", hideDeleteButton);
