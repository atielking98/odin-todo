export default function initialPageLoad() {
    console.log('I get called from page-load.js!');
    const content = document.createElement('div');
    content.className = 'content';

    // Create Header
    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = `
    <div id ="left">
        <h2>Tasky</h2>
        <button class="sidebar-btn">
            <i class="fas fa-bars"></i>
        </button>
        <button class="home-btn">
            <i class="fas fa-home"></i>
        </button>
    </div>
    <div id = "middle"><h1>Inbox</h1></div>
    <div id = "right">
        <div class = "priority-legend">
            <div class="low">Low</div>
            <div class="medium">Medium</div>
            <div class="high">High</div>
        </div>
    </div>
    `;
    
    
    // Create Main
    const main = document.createElement('div');
    main.className = 'main';
    main.innerHTML = `
    <div id="sidebar">
        <button class="btn active" id="inbox"><i class="fas fa-inbox fa-fw"></i>&nbsp; Inbox</button>
        <button class="btn" id="today"><i class="fas fa-calendar-day fa-fw"></i>&nbsp; Today</button>
        <button class="btn" id="week"><i class="fas fa-calendar-week fa-fw"></i>&nbsp; Upcoming</button>
        <h3 class="project-section-title">Projects</h3>
        <button class="btn" id="create-new-project"><i class="fas fa-plus fa-fw"></i>&nbsp; Create new project</button>
        <div id="projects-list"></div>
    </div>
    <div class="task-container" id="task-container">
        <button class="btn createTask" id="add-task"><i class="fas fa-plus fa-fw"></i>&nbsp; Add task</button>
        <div class="cards" id="cards"></div>
    </div>
    `;
    
    
    // Add Content to Document
    content.appendChild(header);
    content.appendChild(main);
    document.body.appendChild(content);
}