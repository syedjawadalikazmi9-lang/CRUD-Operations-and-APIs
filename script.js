// Task 1: CRUD & Local Storage using array of objects
let tasks = JSON.parse(localStorage.getItem('web_tasks')) || [];
let editIndex = null;

window.onload = function() {
    displayTasks(tasks);
};

function addOrUpdateTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    if (editIndex !== null) {
        // Update Record
        tasks[editIndex].text = taskText;
        editIndex = null;
        document.getElementById('addBtn').innerText = "Add Task";
    } else {
        // Create Record
        tasks.push({ id: Date.now(), text: taskText });
    }

    saveAndRefresh();
    input.value = "";
}

// Display tasks using .map() concept and DOM manipulation
function displayTasks(arr) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";

    if (arr.length === 0) {
        taskList.innerHTML = `<li class="text-gray-500 text-center p-2">No tasks found.</li>`;
        return;
    }

    arr.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = "bg-gray-50 p-3 mb-2 border border-gray-200 rounded flex justify-between items-center";
        li.innerHTML = `
            <span class="text-gray-800 font-medium">${task.text}</span>
            <div class="space-x-2">
                <button class="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600" onclick="editTask(${index})">Edit</button>
                <button class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function editTask(index) {
    document.getElementById('taskInput').value = tasks[index].text;
    editIndex = index;
    document.getElementById('addBtn').innerText = "Update Task";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRefresh();
}

// Search and Filter using .filter() array method
function searchTasks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = tasks.filter(task => task.text.toLowerCase().includes(query));
    displayTasks(filtered);
}

// Demonstration of other required array methods (find, some, every) for assignment criteria
function runArrayMethodsDemo() {
    // .find() example
    const foundTask = tasks.find(task => task.text.length > 5);
    console.log("Found task (>5 chars):", foundTask);

    // .some() example
    const hasLongTask = tasks.some(task => task.text.length > 10);
    console.log("Has task longer than 10 chars:", hasLongTask);

    // .every() example
    const allHaveText = tasks.every(task => task.text.trim() !== "");
    console.log("All tasks non-empty:", allHaveText);
}

// Task 2: Fetch and Display Data Using a Free Public API and Axios with Loading/Error states
async function fetchApiData() {
    const loadingEl = document.getElementById('apiLoading');
    const errorEl = document.getElementById('apiError');
    const container = document.getElementById('apiDataContainer');

    // Reset states
    loadingEl.classList.remove('hidden');
    errorEl.classList.add('hidden');
    container.innerHTML = "";

    try {
        // Using a free public API endpoint with Axios GET request
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;

        loadingEl.classList.add('hidden');

        // Display data dynamically using cards UI
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = "bg-gray-50 border border-gray-200 p-4 rounded shadow-sm";
            card.innerHTML = `
                <h3 class="font-bold text-lg text-blue-600">${user.name}</h3>
                <p class="text-sm text-gray-600">Email: ${user.email}</p>
                <p class="text-sm text-gray-600">City: ${user.address.city}</p>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        loadingEl.classList.add('hidden');
        errorEl.classList.remove('hidden');
        errorEl.innerText = "Failed to fetch API data. Please check your internet connection.";
        console.error("API Error:", error);
    }
}

function saveAndRefresh() {
    localStorage.setItem('web_tasks', JSON.stringify(tasks));
    displayTasks(tasks);
    runArrayMethodsDemo();
}