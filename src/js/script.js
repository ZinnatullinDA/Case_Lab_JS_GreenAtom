const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const evenButton = document.getElementById('even-button');
const oddButton = document.getElementById('odd-button');
const removeLastButton = document.getElementById('remove-last-button');
const removeFirstButton = document.getElementById('remove-first-button');

// Функция для добавления задачи в список
function addTodo() {
    const taskText = todoInput.value.trim();
    if (taskText !== '') {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="todo-item">
                <span class="taskText">${taskText}</span>
                <span class="complete-button" onclick="completeTask(this)"> </span>
                <span class="delete-button" onclick="deleteTask(this)"> </span>
            </div>
        `;
        todoList.appendChild(listItem);
        todoInput.value = '';
        saveTodos();
    }
}

// Функция для сохранения задач в локальное хранилище
function saveTodos() {
    const tasks = [];
    const taskElements = document.querySelectorAll('.todo-item span:first-child');
    taskElements.forEach((taskElement) => {
        tasks.push(taskElement.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// Функция для загрузки задач из локального хранилища
function loadTodos() {
    const tasks = JSON.parse(localStorage.getItem('todos')) || [];
    tasks.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="todo-item">
                <span>${task}</span>
                <span class="complete-button" onclick="completeTask(this)"> </span>
                <span class="delete-button" onclick="deleteTask(this)"> </span>
            </div>
        `;
        todoList.appendChild(listItem);
    });
}

// Функция для выполнения задачи
function completeTask(element) {
    element.previousElementSibling.style.textDecoration = 'line-through';
    todoList.appendChild(element.parentElement.parentElement);
    saveTodos();
}

// Функция для удаления задачи
function deleteTask(element) {
    element.parentElement.parentElement.remove();
    saveTodos();
}

// Функция для выделения четных элементов
function highlightEven() {
    const items = document.querySelectorAll('.todo-item');
    items.forEach((item, index) => {
        if (index % 2 === 1) {
            item.style.backgroundColor = 'lightgreen';
        } else {
            item.style.backgroundColor = '';
        }
    });
}

// Функция для выделения нечетных элементов
function highlightOdd() {
    const items = document.querySelectorAll('.todo-item');
    items.forEach((item, index) => {
        if (index % 2 === 0) {
            item.style.backgroundColor = 'lightgreen';
        } else {
            item.style.backgroundColor = '';
        }
    });
}

// Функция для удаления последней задачи
function removeLastTask() {
    const lastItem = todoList.lastElementChild;
    if (lastItem) {
        lastItem.remove();
        saveTodos();
    }
}

// Функция для удаления первой задачи
function removeFirstTask() {
    const firstItem = todoList.firstElementChild;
    if (firstItem) {
        firstItem.remove();
        saveTodos();
    }
}

addButton.addEventListener('click', addTodo);
evenButton.addEventListener('click', highlightEven);
oddButton.addEventListener('click', highlightOdd);
removeLastButton.addEventListener('click', removeLastTask);
removeFirstButton.addEventListener('click', removeFirstTask);

loadTodos();