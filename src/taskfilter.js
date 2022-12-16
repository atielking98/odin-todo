import { isThisWeek } from 'date-fns'

const thisWeek = () => {
    const tasks = document.querySelectorAll('#cards .card .task-date');
    Array.from(tasks).forEach(task => {
        task.parentElement.parentElement.style.display = "flex";
        let result = isThisWeek(new Date(task.textContent));
        if (!result) {
            task.parentElement.parentElement.style.display = "none";
        }
    })
}

const thisDay = () => {
    const tasks = document.querySelectorAll('#cards .card .task-date');
    Array.from(tasks).forEach(task => {
        task.parentElement.parentElement.style.display = "flex";
        let [,,taskDate] = task.textContent.split('-');
        let todayDay = new Date().getDate().toString();
        let result = todayDay === taskDate;
        if (!result) {
            task.parentElement.parentElement.style.display = "none";
        }
    })
}

const showAll = () => {
    const tasks = document.querySelectorAll('#cards .card');
    Array.from(tasks).forEach(task => {
        task.style.display = "flex";
    })
}

const filterByProject = (target) => {
    const tasks = document.querySelectorAll('#cards .card .task-project');
    Array.from(tasks).forEach(task => {
        task.parentElement.parentElement.style.display = "flex";
        if (!target.textContent.includes(task.firstElementChild.textContent)) {
            task.parentElement.parentElement.style.display = "none";
        }
    })
}

export { thisWeek, thisDay, showAll, filterByProject }