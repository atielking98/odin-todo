import { UI } from './pageevents'

const saveTaskToLocalStorage = (task) => {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {    
        tasks = JSON.parse(localStorage.getItem('tasks'))   
    }
    const found = tasks.some(el => el._title === task._title);
    if (!found) tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const saveProjectToLocalStorage = (project) => {
    let projects;
    if(localStorage.getItem('projects') === null) {
        projects = [];
    } else {    
        projects = JSON.parse(localStorage.getItem('projects'))   
    }
    console.log(projects);
    const found = projects.some(el => el._title === project._title);
    if (!found) projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects))
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
    })
}

const getProjects = () => {
    let projects;
    if(localStorage.getItem('projects') === null) {
        projects = [];
    } else {
        projects = JSON.parse(localStorage.getItem('projects'));
    }
    const ui = new UI();
    projects.forEach(project => {
        ui.addNewProject(project)
    })
}


const clearLocalStorageTask = (taskBtn) => {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {  
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    let taskTitle = taskBtn.parentElement.parentElement.children[1].textContent.trim();
    tasks = tasks.filter(curr => {
        return curr._title !== taskTitle;
      });
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const clearLocalStorageProject = (projectBtn) => {
    let projects;
    if(localStorage.getItem('projects') === null) {
        projects = [];
    } else {  
        projects = JSON.parse(localStorage.getItem('projects'))
    }
    let project = projectBtn.parentElement;
    projects = projects.filter(curr => {
        return curr._title !== project.textContent.trim();
      });
    localStorage.setItem('projects', JSON.stringify(projects))
}

export {saveTaskToLocalStorage, saveProjectToLocalStorage, getTasks, getProjects, clearLocalStorageTask, clearLocalStorageProject}