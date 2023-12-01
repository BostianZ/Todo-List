import { Projects } from "./Projects";

function ViewController() {
    let projects = new Projects();
    let projectsData = projects.getProjects();
    const todoListEl = document.querySelector(".todo-list");
    
    const renderTodos = (id) => {
        console.log("test");
        todoListEl.innerHTML = ""
        let project = projectsData[id];
        console.log("TODOLIST ID", todoListEl.id);
        project.todos.forEach((todo, index) => {
            let divEl = document.createElement("div");
            divEl.setAttribute("id", `${index}`);
            divEl.classList.add("todo-item");
            divEl.textContent = todo.title;
            divEl.addEventListener("click", function(e) {
                selectedTodo(todoListEl.id, index);
            })
            todoListEl.appendChild(divEl);
        })
    }

    const getCurrentProjectId = () => {

    }

    const renderProjects = () => {
        const projectsDiv = document.querySelector(".projects");
        projectsDiv.innerHTML = "";
        let projects = projectsData.forEach((project, index) => {
            let divEl = document.createElement("div");
            divEl.textContent = project.title;
            divEl.classList.add("project");
            divEl.setAttribute("id", `${index}`);
            divEl.addEventListener("click", function() { 
                renderProject(index);
                selectedProject(index);
             });
            projectsDiv.appendChild(divEl)
            renderProject(index);
            selectedProject(index);
        })
    } 

    const renderProject = (index) => {
        todoListEl.setAttribute("id", `${index}`);
        renderProjectLabel(index);
        renderTodos(index);
    }

    const selectedProject = (index) => {
        let projects = document.querySelectorAll(".project");
        projects.forEach(project => {
            project.classList.remove("project-selected");
        })
        projects[index].classList.add("project-selected");
    }

    const renderProjectLabel = (index) => {
        const projectLabel = document.querySelector(".todo-list-title-input");
        projectLabel.placeholder = projectsData[index].title;
    }

    const selectedTodo = (projectIndex, todoIndex) => {
        const todoEl = document.querySelector(".todo-container");
        const todoTitleEl = document.querySelector(".todo-title-input");
        todoEl.style.display = "block";
        //We need to know what todolist we're on.
        console.log("PROJECTS", projectsData[projectIndex]);
        let todos = projectsData[projectIndex].todos;
        console.log(todos);
        let todo = todos[todoIndex];
        console.log(todo);
        todoTitleEl.placeholder = todo.title;
    }
    
    function EventsController() {
        const addTodoEl = document.querySelector(".add-todo-btn");
        const projectsAddEl = document.querySelector("#projects-add");
        const projectsTitleForm = document.querySelector(".form");
        const projectsTitleInput = document.querySelector(".projects-title-input")
        const modal = document.querySelector("#dialog");

        const renderProjectsHandler = (e) => {
            e.preventDefault();
            projects.addTodoList(projectsTitleInput.value);
            renderProjects();
            projectsTitleForm.reset()
            modal.close();
        }
    
        const renderTodosHandler = (e) => {
            const addTodoInput = document.querySelector(".add-todo-input")
            const todoListEl = document.querySelector(".todo-list");
            console.log(todoListEl.id);
            console.log(projects);
            let index = todoListEl.id;
            let todoVal = addTodoInput.value;
            let todolist = projectsData[index];
            console.log(todolist);
            todolist.addTodo(todoVal);
            renderTodos(index);
        }

        projectsAddEl.addEventListener("click", (e) => modal.showModal());

        projectsTitleForm.addEventListener("submit", renderProjectsHandler)
    
        addTodoEl.addEventListener("click", renderTodosHandler)
    }

    EventsController();
}



export { ViewController }