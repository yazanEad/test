const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const clearDone = document.getElementById("clearDone");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
  const remaining = tasks.filter((task) => !task.done).length;

  if (tasks.length === 0) {
    taskCount.textContent = "لا توجد مهام";
  } else if (remaining === 0) {
    taskCount.textContent = "كل المهام مكتملة";
  } else {
    taskCount.textContent = `${remaining} مهمة متبقية`;
  }
}

function renderTasks() {
  todoList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `todo-item${task.done ? " done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "تحديد المهمة كمكتملة");
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const text = document.createElement("span");
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", "حذف المهمة");
    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((currentTask) => currentTask.id !== task.id);
      saveTasks();
      renderTasks();
    });

    item.append(checkbox, text, deleteButton);
    todoList.appendChild(item);
  });

  updateCount();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();

  if (!text) {
    return;
  }

  tasks.unshift({
    id: Date.now(),
    text,
    done: false,
  });

  todoInput.value = "";
  saveTasks();
  renderTasks();
});

clearDone.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.done);
  saveTasks();
  renderTasks();
});

renderTasks();
