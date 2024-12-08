const todosContainer = document.getElementById("todosContainer");
let todos = [];

fetch("https://dummyjson.com/todos")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    todos = data.todos;
    displayTodos(todos);
  })
  .catch(error => {
    console.error("Error fetching todos:", error);
    todosContainer.innerHTML = `<p style="color: red;">Failed to fetch data. Check console for details.</p>`;
  });


function displayTodos(todosList) {
  todosContainer.innerHTML = "";
  todosList.forEach(todo => {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");
    todoCard.innerHTML = `
      <h3>Todo #${todo.id}</h3>
      <p>${todo.todo}</p>
      <div class="status">
        ${todo.completed 
          ? '<span class="complete">✔</span>' 
          : '<span class="incomplete">✖</span>'}
      </div>
    `;
    todosContainer.appendChild(todoCard);
  });
}


function filterTodos() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filteredTodos = todos.filter(todo =>
    todo.todo.toLowerCase().includes(query)
  );
  displayTodos(filteredTodos);
}
