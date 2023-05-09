const todoList = document.getElementById("todo-list");
const addTaskButton = document.getElementById("add-task-button");
const newTaskInput = document.getElementById("new-task-input");

let tasks = [];

// function to render the tasks on the page
function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach(function (task, index) {
    const taskItem = document.createElement("li");
    taskItem.textContent = task.title;
    taskItem.classList.toggle("completed", task.completed);

    const taskButtons = document.createElement("div");
    taskButtons.classList.add("buttons");

    const completeButton = document.createElement("button");
    completeButton.textContent = "Mark as Complete";
    completeButton.classList.add("complete");
    completeButton.addEventListener("click", function () {
      tasks[index].completed = true;
      renderTasks();
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    editButton.addEventListener("click", function () {
      const newTitle = prompt("Enter the new task title:", task.title);
      if (newTitle !== null && newTitle !== "") {
        tasks[index].title = newTitle;
        renderTasks();
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      renderTasks();
    });

    taskButtons.appendChild(completeButton);
    taskButtons.appendChild(editButton);
    taskButtons.appendChild(deleteButton);
    taskItem.appendChild(taskButtons);
    todoList.appendChild(taskItem);
  });
}

// add task function
function addTask(event) {
  event.preventDefault();
  const taskTitle = newTaskInput.value;
  if (taskTitle !== "") {
    tasks.push({
      title: taskTitle,
      completed: false,
    });
    newTaskInput.value = "";
    renderTasks();
  }
}

addTaskButton.addEventListener("click", addTask);
