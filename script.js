const todos = [];

// Function to add a new to-do item
function addTodo(title, description, dueDate, priority) {
  const newTodo = {
    id: Date.now(), // Unique ID
    title,
    description,
    dueDate,
    priority,
    completed: false,
  };
  todos.push(newTodo);
  saveTodosToLocalStorage(); // Save to local storage
  displayTodos();
}

// Function to mark a to-do item as completed
function toggleComplete(id) {
  const todo = findTodoById(id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodosToLocalStorage();
    displayTodos();
  }
}

// Function to delete a to-do item
function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    saveTodosToLocalStorage();
    displayTodos();
  }
}

// Function to edit a to-do item
function editTodo(
  id,
  updatedTitle,
  updatedDescription,
  updatedDueDate,
  updatedPriority
) {
  const todo = findTodoById(id);
  if (todo) {
    todo.title = updatedTitle;
    todo.description = updatedDescription;
    todo.dueDate = updatedDueDate;
    todo.priority = updatedPriority;
    saveTodosToLocalStorage();
    displayTodos();
  }
}

// Function to filter to-do items by priority
function filterByPriority(priority) {
  const filteredTodos = todos.filter((todo) => todo.priority === priority);
  displayTodos(filteredTodos);
}

// Function to filter to-do items by due date
function filterByDueDate(dueDate) {
  const filteredTodos = todos.filter((todo) => todo.dueDate === dueDate);
  displayTodos(filteredTodos);
}

// Function to find a to-do item by ID
function findTodoById(id) {
  return todos.find((todo) => todo.id === id);
}

// Function to save to-do items to local storage
function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load to-do items from local storage
function loadTodosFromLocalStorage() {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos.push(...JSON.parse(storedTodos));
  }
}

// Function to display to-do items on the page (replace with your HTML structure)
function displayTodos(filteredTodos = todos) {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  filteredTodos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <p>Due Date: ${todo.dueDate}</p>
      <p>Priority: ${todo.priority}</p>
      <button onclick="toggleComplete(${todo.id})">${
      todo.completed ? "Mark Incomplete" : "Mark Complete"
    }</button>
      <button onclick="editTodo(${todo.id})">Edit</button>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    todoList.appendChild(listItem);
  });
}

// Load to-do items on page load
loadTodosFromLocalStorage();
displayTodos();

// Example usage:
addTodo("Learn JavaScript", "Practice daily", "2024-12-31", "High");
addTodo("Go for a run", "30 minutes", "2024-12-25", "Medium");
addTodo("Read a book", 'Finish "The Lord of the Rings"', "2025-01-15", "Low");

// Filter examples (uncomment to use)
// filterByPriority('High');
// filterByDueDate('2024-12-31');. (JavaScript code from the previous response) ...
