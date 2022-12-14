import {Task} from './todo';
import {Projects} from './projects';

const d = document;

export class UI {
    createProjectForm() {
        const container = d.getElementById('sidebar');
        const btn = d.getElementById('create-new-project');
        const form = d.createElement('form');
        form.innerHTML = `
        <input type="text" name="name" 
            placeholder="Project Name" size="20">
        <br><br>
        <div class="btn-group">
            <button class="btn-project" id="add-project">Add</button>
            <button class="btn-project" id="cancel-project">Cancel</button>
        </div>
        `;
        form.classList.add('form-project');
        btn.classList.add('none');
        container.insertBefore(form, btn);
    }

    cancelProjectForm() {
        const projectBtn = d.getElementById('create-new-project');
        const form = d.getElementsByClassName('form-project')[0];
        form.remove();
        projectBtn.classList.remove('none');
    }

    addNewProject(item) {
        const sidebar = d.getElementById('sidebar');
        const container = d.getElementById('projects-list');
        const btn = d.getElementById('create-new-project');
        const form = d.querySelector('.form-project');
        const project = d.createElement('button');
        project.classList.add('btn', 'project');
        project.innerHTML = `
            <i class="fas fa-tasks fa-fw"></i>&nbsp;${item._title}
            <button class="btn-delete-project"><i class="fas fa-times"></i></button>
        `;
        container.appendChild(project);
        if(sidebar.children[4].classList[0] === 'form-project') {
            form.remove();
        }
        btn.classList.remove('none');
    }

    deleteProject(project) {
        project.parentElement.remove();
    }

}

export default function domEvents() {
    const ui = new UI();
    console.log("hi");
    d.addEventListener('click', (e) => {
        console.log(e.target);

        // Click on sidebar icon, toggles collapsing sidebar
        if (e.target.matches('.sidebar-btn')) {
            console.log("toggle sidebar");
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('collapsed');
        }

        // Display create new project form
        if (e.target.matches('#create-new-project')) {
            console.log("create new project form");
            ui.createProjectForm();
        }

        // Cancel add new project form
        if (e.target.matches('#cancel-project')) {
            console.log("cancel new project");
            e.preventDefault();
            ui.cancelProjectForm();
        }

        // Submit add new projects form
        if (e.target.matches('#add-project')) {
            console.log("add new project");
            e.preventDefault();
            const form = d.querySelector('.form-project');
            const title = form.name.value;
            if(title === "") return console.log('Project title can not be blank');
            if(title.length > 15) return console.log('Project title can not be longer than 15 char');
            const project = new Projects(title);
            //saveProjectToLocalStorage(project)
            ui.addNewProject(project);
        }

        // Delete a project
        if (e.target.matches('.btn-delete-project')) {
            console.log("delete selected project");
            ui.deleteProject(e.target);
        }

        // Display add task form
        // Cancel add task form
        // Submit add task form
        // Delete task
        // Edit task
        // Click on inbox
        // Click on today
        // Click on upcoming
        // Click on home
    })
}