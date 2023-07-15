// Select the necessary HTML elements
const form = document.querySelector('form');
const input = document.querySelector('input');
const todoList = document.querySelector('.todo-list');

// Define an empty array to store the to-do items
let todos = [];

// Function to create a new to-do item
function createTodoItem(text) {
	// Create a new li element
	const todoItem = document.createElement('li');

	// Add the to-do text to the li element
	todoItem.innerHTML = `
		<span class="todo-text">${text}</span>
		<div class="button-container">
			<button class="edit-button">Edit</button>
			<button class="delete-button">Delete</button>
		</div>
	`;

	// Add the new li element to the to-do list
	todoList.appendChild(todoItem);

	// Add the new to-do item to the todos array
	todos.push({
		text: text,
		completed: false
	});

	// Save the updated todos array to local storage
	localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to render the existing to-do items
function renderTodoItems() {
	// Get the todos array from local storage
	const todosFromStorage = localStorage.getItem('todos');
	if (todosFromStorage) {
		todos = JSON.parse(todosFromStorage);
	}

	// Clear the existing to-do items
	todoList.innerHTML = '';

	// Loop through the todos array and create a new li element for each item
	todos.forEach((todo, index) => {
		const todoItem = document.createElement('li');
		todoItem.innerHTML = `
			<span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
			<div class="button-container">
				<button class="edit-button">Edit</button>
				<button class="delete-button">Delete</button>
			</div>
		`;
		todoList.appendChild(todoItem);

		// Add event listeners to the edit and delete buttons
		const editButton = todoItem.querySelector('.edit-button');
		const deleteButton = todoItem.querySelector('.delete-button');
		editButton.addEventListener('click', () => editTodoItem(index));
		deleteButton.addEventListener('click', () => deleteTodoItem(index));
	});
}

// Function to edit a to-do item
function editTodoItem(index) {
	// Get the current to-do text from the todos array
	const currentText = todos[index].text;

	// Show a prompt to allow the user to edit the text
	const editText = prompt('Edit to-do:', currentText);

	// If the user entered a new text, update the to-do text and save to local storage
	if (editText) {
		todos[index].text = editText;
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	// Re-render the to-do items
	renderTodoItems();
}

// Function to delete a to-do item
function deleteTodoItem(index) {
	// Remove the to-do item from the todos array
	todos.splice(index, 1);

	// Save the updated todos array to local storage
	localStorage.setItem('todos', JSON.stringify(todos));

	// Re-render the to-do items
	renderTodoItems();
}

// Add an event listener to the form to create a new to-do item
form.addEventListener('submit', event => {
	event.preventDefault();
	const text = input.value.trim();
	if (text) {
		createTodoItem(text);
		input.value = '';
	}
});

// Call the renderTodoItems function to render the existing to do list

renderTodoItems();