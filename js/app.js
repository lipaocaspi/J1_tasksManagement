let tasksPending = [];
let tasksDone = [];
let tasksFailed = [];
const submitButton = document.querySelector('.creation__button');
const tasksList = document.querySelector('.management');
const listDone = document.querySelector('.list__done');
const listFailed = document.querySelector('.list__failed');

const deleteTask = (id) => {
    tasksPending = tasksPending.filter(function(task) {
        return task.id !== id;
    });
}

const confirm = (id) => {
    const task = tasksPending.find(task => task.id == id);
    deleteTask(id);
    updatePendingList(tasksPending);
    task.id = tasksDone.length + 1;
    tasksDone.push(task);
    listDone.innerHTML += `
    <div class="list__task">
        <p class="list__title">${task.task}</p>
    </div>
    `
    console.log(tasksDone);
}

const discard = (id) => {
    const task = tasksPending.find(task => task.id == id);
    deleteTask(id);
    updatePendingList(tasksPending);
    task.id = tasksFailed.length + 1;
    tasksFailed.push(task);
    listFailed.innerHTML += `
    <div class="list__task">
        <p class="list__title">${task.task}</p>
    </div>
    `
    console.log(tasksFailed);
}

const updatePendingList = (listTasks) => {
    tasksList.innerHTML = `<h1 class="titulo">Tareas Pendientes</h1>`;
    for (taskElement of listTasks) {
        tasksList.innerHTML += `
        <div class="management__task">
            <p class="management__title">${taskElement.task}</p>
            <div class="management__buttons">
                <button onclick="confirm(${taskElement.id})" class="management__button green" type="button">
                    <i class='bx bx-check bx-sm'></i>
                </button>
                <button onclick="discard(${taskElement.id})" class="management__button red" type="button">
                    <i class='bx bx-x bx-sm'></i>
                </button>
            </div>
        </div>
    `
    }
}

document.querySelector('.creation__button').addEventListener('click', function (event) {
    let form = document.getElementById('registerForm');
    let radioOptions = document.getElementsByName('level');
    let tasksData = {};
    for (let i = 0; i < form.elements.length; i++) {
        let element = form.elements[i];
        if (element.name && element.type !== 'submit') {
            if (element.name == 'level') {
                for (let j = 0; j < radioOptions.length; j++) {
                    if (radioOptions[j].checked) {
                        let selectedValue = radioOptions[j].value;
                        tasksData[element.name] = selectedValue;
                        break;
                    }
                }
            }
            else {
                tasksData[element.name] = element.value;
            }
        }
    }
    tasksData['id'] = tasksPending.length + 1;
    tasksPending.push(tasksData);
    form.reset();
    event.preventDefault();
    updatePendingList(tasksPending);
    console.log(tasksPending);
});