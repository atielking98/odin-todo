import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all.js';
import { Task } from './todo.js';
import pageLoad from './pageload.js';
import domEvents from './pageevents.js';
import './style.css';
import { getProjects, getTasks } from './localstorage.js';

window.addEventListener('DOMContentLoaded', () => {
    getTasks();
    getProjects();
});

document.addEventListener('DOMContentLoaded', (e) => {
    pageLoad();
    domEvents();
});
