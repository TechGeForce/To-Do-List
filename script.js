const TODO_KEY = "todo-lists";
const inputVal = document.querySelector('.inputVal')
let taskList;

const formInput = document.getElementById('formInput')

formInput.addEventListener('submit', (event) => {
    event.preventDefault()

    if (inputVal.value.trim() !== '') {
        let localItems = JSON.parse(localStorage.getItem(TODO_KEY))
        if (localItems === null) {
            taskList = []
        }

        else {
            taskList = localItems
        }

        taskList.push(inputVal.value)
        localStorage.setItem(TODO_KEY, JSON.stringify(taskList))
    }

    showItems()
})

function showItems() {
    taskList = JSON.parse(localStorage.getItem(TODO_KEY)) ?? []

    let html = ''
    let itemShow = document.querySelector('.todoLists')
    if (taskList.length === 0) {
        html = `
            <div class="no-todo">
                No Todo's
            </div>
        `
    }

    else {
        taskList.forEach((data, index) => {
            html += `
                <div class="todoList">
                    <p class="pText">${data}</p>
                    <button class="deleteTask" onClick="deleteItem(${index})">x</button>
                </div>
            `
        })
    }

    itemShow.innerHTML = html
}

function deleteItem(index) {
    const answer = confirm(`Are you sure you want to delete "${taskList[index]}"`)

    if (answer === true) {
        taskList.splice(index, 1)
        localStorage.setItem(TODO_KEY, JSON.stringify(taskList))
        showItems()
    }

}

function clearTask() {
    const answer = confirm("Are you sure to clear all tasks?")

    if (answer === true) {
        localStorage.removeItem(TODO_KEY)
        showItems()
    }

}

showItems()