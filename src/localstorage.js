import { UI } from './pageevents'
import { Projects } from './projects'
const saveTaskToLocalStorage = (task) => {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {    
        tasks = JSON.parse(localStorage.getItem('tasks'))   
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const getTasks = () => {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const ui = new UI();
    tasks.forEach(task => {
        ui.addNewTask(task)
        const project = new Projects(task._project);
        ui.addNewProject(project);
    })
}

const clearLocalStorage = (task) => {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {  
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    let index = task.parentElement.parentElement.children[1].textContent;
    for(let x in tasks) {
        if(tasks[x]._title === index) {
            tasks.splice(x,1)
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

export {saveTaskToLocalStorage, getTasks, clearLocalStorage}