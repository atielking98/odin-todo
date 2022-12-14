import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all.js';
import { Task } from './todo.js';
import pageLoad from './pageload.js';
import './style.css';

pageLoad();
console.log(new Task("hi"));