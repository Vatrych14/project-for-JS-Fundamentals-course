const addButton = document.querySelector(".add");
const clearAllTasks = document.querySelector(".clear-all");
const input = document.querySelector("input");
const list = document.querySelector(".tasks-list");
const taskStats = document.querySelector(".taskStats");
const maxTasks = 10;

let tasks = getTasks();
let currentListId = 1;

addButton.addEventListener("click", () => {
    const minChars = 3;
    const maxChars = 30;

    const taskText = input.value.trim();

    if (taskText.length < minChars) {
        alert(`The task text must contain at least ${minChars} characters!`);
        return;
    }

    if (taskText.length > maxChars) {
        alert(`The task text must contain at least ${maxChars} characters!`);
        return;
    }
    if (tasks.length < maxTasks) {
        const taskText = input.value.trim();
        if (taskText === "") {
            return;
        }

        const task = {
            id: currentListId,
            text: taskText,
            completed: false,
        };

        tasks.push(task);
        currentListId++;

        input.value = "";

        saveTasks();
        updateTasksList();

    } else {
        alert("You've reached the maximum number of tasks.");
    }
});

clearAllTasks.addEventListener("click", () => {
    tasks = [];
    currentListId = 1;
    saveTasks();
    updateTasksList();
});

function updateTasksList() {
    list.innerHTML = "";

    tasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.className = "tasks-list-item";
        listItem.innerHTML = `
        <button class="complete ${task.completed ? 'completed' : 'incompleted'}">${task.completed ? "Completed" : "Completed"}</button>
        <span>${task.text}</span>
        <button class="delete">Delete</button> 
        `;

        list.appendChild(listItem);

        const deleteButton = listItem.querySelector(".delete");
        const completeButton = listItem.querySelector(".complete");

        deleteButton.addEventListener("click", () => {
            const taskIndex = tasks.findIndex((t) => t.id === task.id);
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);
                saveTasks();
                updateTasksList();
            }
        });

        completeButton.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            updateTasksList();
        });
    });

    updateTaskStats();
}

function updateTaskStats() {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;

    const completionPercentage = (completedTasks / totalTasks) * 100;

    taskStats.textContent = `Completed tasks: ${completedTasks} / Total tasks: ${totalTasks} / (${completionPercentage.toFixed(2)}%)`;
}

function getTasks() {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

updateTasksList();

