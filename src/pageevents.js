import {Task} from './todo';
import {Projects} from './projects';

const d = document;
let editing = false;
let isTaskChecked = false;

export class UI {
    // PROJECTS
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

    // TASKS
    createTaskForm() {
        const container = d.getElementById('task-container');
        const btn = d.getElementById('add-task');
        const form = d.createElement('form');
        const select = d.createElement('select');
        const options = ['Inbox', ...d.getElementById('projects-list').children];
        options.forEach(op => {
            const option = d.createElement('option')
            option.value = op.textContent || op;
            option.textContent = op.textContent || op;
            select.appendChild(option);
        })

        form.innerHTML = `
            <div>
            <input type="text" id="title" placeholder="Task Info">
            <input type="text" id="dueDate" placeholder="Schedule" onfocus="(this.type='date')" onblur="(this.type='text')">
            <select id="projectSelect">
            ${select.innerHTML}</select>
            </div>
            <div>
            <select id="prioritySelect">
                <option value="none">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button class="btn addTaskFormBtn" id="addTaskFormBtn">Add</button>
            <button class="btn cancelTaskFormBtn" id="cancelTaskFormBtn">Cancel</button>
            </div>
        `;
        form.classList.add('form-task');
        btn.classList.add('none');
        container.insertBefore(form, btn);
    }

    cancelTaskForm() {
        const projectBtn = d.getElementById('add-task');
        const form = d.getElementsByClassName('form-task')[0];
        form.remove();
        if(editing) {
            d.querySelector('.card.editing').remove();
            isTaskChecked = false;
            editing = false;
        }
        projectBtn.classList.remove('none');
    }

    addNewTask(item) {
        const taskContainer = d.getElementById('cards');
        const taskCard = d.createElement('div');
        taskCard.innerHTML = `
            <div class="card-show">
                <button class="check-btn"><i class="far fa-circle fa-fw"></i></button>
                <h3 class="task-el task-title" name="name">&nbsp;${item._title}</h3>
                <h3 class="task-el task-date" name="date">${item._dueDate}</h3>
            <div class="card-btns">
                <button class="btn-task btn-expand-task"><i class="fas fa-angle-double-down"></i></button>
                <button class="btn-task btn-delete-task"><i class="fas fa-trash-alt"></i></button>
                </div>
                </div>    
            <div class="card-hidden">
                <h3 class="task-el task-project" name="project">Project: <b>${item._project}</b></h3>
                <h3 class="task-el task-priority" name="priority">Priority: <b>${item._priority}</b></h3>
                <button class="btn-task btn-edit-task"><i class="fas fa-edit"></i></button>
            </div>
        `;
        taskCard.classList.add('card', item._priority);
        if(editing) {
            d.querySelector('.card.editing').remove();
            if (isTaskChecked) {
                taskCard.classList.add('checked');
                isTaskChecked = false;
            }
            editing = false;
        }
        taskContainer.appendChild(taskCard);
        this.removeTaskForm();
        const btn = d.getElementById('add-task');
        btn.classList.remove('none');
    }

    deleteTask(task) {
        task.parentElement.parentElement.parentElement.remove();
    }

    editTask(task) {
        this.removeTaskForm();
        task.classList.add('editing');
        editing = true;
        this.createTaskForm();
        // Grab current task values
        const title = task.children[0].children.name.textContent;
        const dueDate = task.children[0].children.date.textContent;
        const project = task.children[1].children.project.firstElementChild.textContent;
        const priority = task.children[1].children.priority.firstElementChild.textContent;
        // Populate task form with current task values
        d.getElementById('title').value = title;
        d.getElementById('dueDate').value = dueDate;
        d.getElementById('projectSelect').value = project;
        d.getElementById('prioritySelect').value = priority;
        task.style.display = "none";
    }

    // FORMS
    removeTaskForm() {
        const container = d.getElementById('task-container')
        const form = d.querySelector('.form-task');
        if(container.children[0] === form) {
            container.classList.remove('active');
            container.removeChild(form);
        }
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
        if (e.target.matches('#add-task')) {
            console.log("create new task form");
            ui.createTaskForm();
        }

        // Cancel add task form
        if (e.target.matches('#cancelTaskFormBtn')) {
            console.log("cancel new task form");
            ui.cancelTaskForm();
        }

        // Submit add task form
        if (e.target.matches('#addTaskFormBtn')) {
            console.log("add new task");
            e.preventDefault();
            const form = d.querySelector('.form-task');
            const title = form.title.value;
            let dueDate = form.dueDate.value;
            const project = document.getElementById('projectSelect').value;
            const priority = document.getElementById('prioritySelect').value;
            if(title === "") return console.log('Task title can not be blank');
            if(dueDate === "") dueDate = 'No due date';
            const task = new Task(title, dueDate, project, priority);
            
            console.log(form);
            console.log(task);
            ui.addNewTask(task);
        }

        // Expand a task
        if (e.target.matches('.btn-expand-task')) {
            console.log("expand selected task");
            console.log(e.target.parentElement.parentElement.parentElement);
            e.target.parentElement.parentElement.parentElement.classList.toggle('show')
        }

        // Delete a task
        if (e.target.matches('.btn-delete-task')) {
            console.log("delete selected task");
            ui.deleteTask(e.target);
        }

        // Edit a task
        if (e.target.matches('.btn-edit-task')) {
            console.log("edit selected task");
            isTaskChecked = e.target.parentElement.parentElement.classList.contains('checked');
            ui.editTask(e.target.parentElement.parentElement);
        }

        // Check off a task
        if (e.target.matches('.check-btn')) {
            console.log("check off selected task");
            console.log(e.target.children[0].classList);
            if(e.target.children[0].classList.contains('fa-circle')) {
                console.log("hi");
                e.target.children[0].classList.replace('fa-circle', 'fa-circle-check');
                e.target.children[0].classList.add('fa-regular');
                e.target.parentElement.parentElement.classList.add('checked');
                return;
            }
            if(e.target.children[0].classList.contains('fa-circle-check')) {
                e.target.children[0].classList.replace('fa-circle-check', 'fa-circle');
                e.target.children[0].classList.add('fa-regular');
                e.target.parentElement.parentElement.classList.remove('checked');
                return;
            }
        }

        // Click on inbox
        // Click on today
        // Click on upcoming
        // Click on home
        // Click on other project
    })
}