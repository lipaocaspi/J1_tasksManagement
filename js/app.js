let tasks = [];
const tasksList = document.querySelector('.management');
const listDone = document.querySelector('.list__done');
const listFailed = document.querySelector('.list__failed');

const confirm = (id) => {
    listDone.innerHTML += `
    <div class="management__task">
        <p class="management__title">${id}</p>
    </div>
    `
}

const discard = (id) => {
    listFailed.innerHTML += `
    <div class="management__task">
        <p class="management__title">${id}</p>
    </div>
    `
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
    tasksData['id'] = tasks.length + 1;
    tasksData['state'] = 'pending';
    tasks.push(tasksData);
    form.reset();
    event.preventDefault();
    tasksList.innerHTML += `
        <div class="management__task">
            <p class="management__title">${tasksData.task}</p>
            <div class="management__buttons">
                <button onclick="confirm(${tasksData.id})" class="management__button green" type="button">
                    <i class='bx bx-check bx-sm'></i>
                </button>
                <button onclick="discard(${tasksData.id})" class="management__button red" type="button">
                    <i class='bx bx-x bx-sm'></i>
                </button>
            </div>
        </div>
    `
    // console.log(tasks);
});