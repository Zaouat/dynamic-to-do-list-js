// Ensure the script runs after the HTML document has fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements and store them in constants
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Function to add a new task
  const addTask = () => {
    const taskText = taskInput.value.trim(); // Retrieve and trim the input value

    // Check if the input value is empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create new task elements
    const li = document.createElement("li");
    li.textContent = taskText;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    // Set up the remove button to delete the task when clicked
    removeButton.onclick = () => {
      taskList.removeChild(li);
    };

    // Append the remove button to the task, and the task to the task list
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Clear the input field after adding the task
    taskInput.value = "";
  };

  // Attach event listeners to the "Add Task" button and the input field
  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
