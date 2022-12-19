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

const updateTaskToLocalStorage = (newTask, originalTitle) => {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {    
        tasks = JSON.parse(localStorage.getItem('tasks'))   
    }
    console.log(tasks);
    console.log(newTask);
    console.log(originalTitle);
    for (const originalTask of tasks) {
        if (originalTask._title.trim() === originalTitle.trim()) {
            console.log('found original task');
            originalTask._title = newTask._title;
            originalTask._dueDate = newTask._dueDate;
            originalTask._project = newTask._project;
            originalTask._priority = newTask._priority;
          break;
        }
    }
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
        return curr._title.trim() !== taskTitle.trim();
      });
    localStorage.setItem('tasks', JSON.stringify(tasks));
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

const updateTaskCheckedStatus = (taskName, isChecked) => {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {  
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    for (const task of tasks) {
        if (task._title.trim() === taskName.trim()) {
          console.log(task);
          task._checked = isChecked;
          break;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export {updateTaskToLocalStorage, saveTaskToLocalStorage, saveProjectToLocalStorage, getTasks, getProjects, clearLocalStorageTask, clearLocalStorageProject, updateTaskCheckedStatus}