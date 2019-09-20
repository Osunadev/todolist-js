let inputTxt = document.getElementById('input-text');
let addBtn = document.getElementById('add-btn');
let bodyTodoList = document.getElementById('body-todolist');
let todoListMain = document.getElementById('todolist-main');
let deleteBtn;
let isBtnCreated = false;

const addTask = () => {
    if (inputTxt.value != '') {
        let newTask = createNewTask(inputTxt.value);
        bodyTodoList.appendChild(newTask);
        inputTxt.value = '';
    }
}

const createNewTask = (text) => {
    let task = document.createElement('div');
    task.className = 'task';

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'task__check'; 
    checkBox.onclick = () => checkTask(task);

    let textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.className = 'task__text';
    textBox.value = text;

    task.appendChild(checkBox);
    task.appendChild(textBox);
    
    return task;
}

const deleteTasks = () => {
    let tasksToBeDeleted = []

    for (divTask of bodyTodoList.children) {
        if (divTask.children[1].classList.value.includes('task__text--selected')) {
            tasksToBeDeleted.push(divTask);
        }
    }

    for (divTask of tasksToBeDeleted) {
        bodyTodoList.removeChild(divTask);
    }
}

const createDeleteBtn = () => {
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn'; 
    deleteBtn.id = 'delete-btn';
    deleteBtn.innerText = 'Delete Tasks';
    deleteBtn.onclick = () => deleteTasks();

    return deleteBtn;
}

const checkTask = (parentElement) => {
    let task = parentElement.children[1];
    
    if(task.classList.value.includes('task__text--selected')) {
        task.classList.remove('task__text--selected');
    } else {
        task.classList.add('task__text--selected');
    }

    let isAnyTaskSelected = areTasksSelected();

    if (isAnyTaskSelected) {

        if (!isBtnCreated) {
            deleteBtn = createDeleteBtn();
            isBtnCreated = true;
            todoListMain.appendChild(deleteBtn);
        }

    } else {
        if (isBtnCreated) {
            todoListMain.removeChild(deleteBtn)
            isBtnCreated = false;
        }
    }

}

const areTasksSelected = () => {
    let listDivTasks = bodyTodoList.children;

    let isSelected = false;

    for (divTask of listDivTasks) {
        if (divTask.children[1].classList.value.includes('task__text--selected')) {
            isSelected = true;
            break;
        }
    }

    return isSelected;
}