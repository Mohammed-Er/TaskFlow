const API_URL = "https://task-flow-five-gray.vercel.app/api/todos";
const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", loadTodos);

if (!token) {
  window.location.href = "../forms/login.html";
}

let todos = [];
let currentFilter = "all";

const progressBar = document.getElementById("progress-bar");
const logoutBtn = document.getElementById("logout-btn");
const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const counter = document.getElementById("count-heading");
const itemsLeft = document.getElementById("items-left");
const clearBtn = document.getElementById("clear-btn");
const filterButtons = document.querySelectorAll(".filter-btn");

async function loadTodos() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    todos = data.data;

    refreshUI();
  } catch (err) {
    console.error(err);
  }
}

function renderTodos() {
  todoList.innerHTML = "";
  let filteredTodos = todos;
  if (currentFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (currentFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }
  for (const todo of filteredTodos) {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) {
      li.className = "todo-item done";
    }
    li.innerHTML = `
    <button class="checkbox" data-id=${todo._id}>
    ${todo.completed ? "✔" : ""}
    </button>
    <span class="todo-text">${todo.title}</span>
    <button class="delete-btn" data-id=${todo._id}>✕</button>
    `;

    todoList.appendChild(li);
  }
}

todoInput.addEventListener("input", () => {
  addBtn.disabled = todoInput.value.trim() === "";
});

todoForm.addEventListener("submit", addTodo);

async function addTodo(e) {
  e.preventDefault();
  addBtn.disabled = true;
  const todoData = {
    title: todoInput.value.trim(),
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    todos.push(data.data);

    todoInput.value = "";
    refreshUI();
  } catch (err) {
    console.error(err);
  } finally {
    addBtn.disabled = false;
  }
}

todoList.addEventListener("click", handleTodoClick);
async function handleTodoClick(e) {
  const button = e.target;

  try {
    if (button.classList.contains("checkbox")) {
      const id = button.dataset.id;
      const todo = todos.find((todo) => todo._id === id);

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      const index = todos.findIndex((todo) => todo._id === id);
      todos[index] = data.data;

      refreshUI();
    } else if (button.classList.contains("delete-btn")) {
      const id = button.dataset.id;
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      todos = todos.filter((todo) => todo._id !== id);
      refreshUI();
    }
  } catch (error) {
    console.error(error);
  }
}

function updateCounter() {
  let shownTodos = todos;

  if (currentFilter === "active") {
    shownTodos = todos.filter((todo) => !todo.completed);
  } else if (currentFilter === "completed") {
    shownTodos = todos.filter((todo) => todo.completed);
  }

  counter.textContent = `${shownTodos.length} ${currentFilter}`;

  const remaining = todos.filter((todo) => !todo.completed).length;

  itemsLeft.textContent =
    remaining === 1 ? "1 item left" : `${remaining} items left`;
  const completed = todos.filter((todo) => todo.completed).length;

  const progress = todos.length === 0 ? 0 : (completed / todos.length) * 100;

  progressBar.style.width = `${progress}%`;
}

function filterTodo() {
  try {
    for (const button of filterButtons) {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        currentFilter = button.dataset.filter;
        button.classList.add("active");
        refreshUI();
      });
    }
  } catch (err) {
    console.error(err);
  }
}
filterTodo();

function refreshUI() {
  renderTodos();
  updateCounter();
}

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href = "/forms/login.html";
});
