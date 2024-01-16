const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

inputBox.focus();  // Set focus on the input box when the page is loaded

function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
        inputBox.focus();
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        inputBox.value = "";
        saveData();
        inputBox.focus();  // Bring focus back to the input box after adding a task
    }
}

inputBox.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        // Ask for confirmation before deleting
        const confirmed = confirm("Do you want to delete this task?");
        if (confirmed) {
            e.target.parentElement.remove();
            saveData();
        }
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
