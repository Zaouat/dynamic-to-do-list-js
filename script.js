// Ensure the script runs after the HTML document has fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM elements and store them in constants
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Function to load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach(function (taskText) {
      addTask(taskText, false); // 'false' indicates not to save again to Local Storage
    });
  }

  // Function to add a new task
  function addTask(taskText, save = true) {
    // Create new task elements
    const li = document.createElement("li");
    li.textContent = taskText;
    li.classList.add("task-item"); // Add a class to the task item

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";
    removeButton.classList.add("btn", "btn-remove"); // Add multiple classes to the remove button

    // Set up the remove button to delete the task when clicked
    removeButton.onclick = function () {
      taskList.removeChild(li);
      removeTask(taskText); // Remove task from Local Storage
    };

    // Append the remove button to the task, and the task to the task list
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Clear the input field after adding the task
    taskInput.value = "";

    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  // Function to remove a task from Local Storage
  function removeTask(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks = storedTasks.filter(function (task) {
      return task !== taskText;
    });
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  // Attach event listeners to the "Add Task" button and the input field
  addButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
    } else {
      alert("Please enter a task.");
    }
  });

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
      } else {
        alert("Please enter a task.");
      }
    }
  });

  // Load tasks from Local Storage when the page loads
  loadTasks();
});
