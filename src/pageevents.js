import {Task} from './todo';
import {Projects} from './projects';

const d = document;

export class UI {

}

export default function domEvents() {
    const ui = new UI();
    console.log("hi");
    d.addEventListener('click', (e) => {
        console.log(e.target);

        // Click on sidebar icon, toggles collapsing sidebar
        if (e.target.matches('.sidebar-btn')) {
            console.log("hi");
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('collapsed');
        }
        
        // Display add task form
        // Cancel add task form
        // Submit add task form
        // Delete task
        // Edit task
        // Display create new projects form
        // Submit add new projects form
        // Cancel add new projects form
        // Delete a project
        // Click on inbox
        // Click on today
        // Click on upcoming
        // Click on home
    })
}