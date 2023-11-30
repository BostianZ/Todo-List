import { Projects } from "./Projects";

function ViewController() {
    let projects = new Projects();
    let projectsData = projects.getProjects();

    const renderProjectLabel = (index) => {
        const projectLabel = document.querySelector(".todo-list-title-input");
        projectLabel.placeholder = projectsData[index].title;
    }
    

    const renderTodos = (id) => {
        const todoListEl = document.querySelector(".todo-list");
        console.log("test");
        todoListEl.innerHTML = ""
        let project = projectsData[id];
        project.todos.forEach((todo, index) => {
            let divEl = document.createElement("div");
            divEl.setAttribute("id", `${index}`);
            divEl.classList.add("todo-item");
            divEl.textContent = todo.title;
            todoListEl.appendChild(divEl);
        })
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
                selectedProject(index)
             });
            projectsDiv.appendChild(divEl)
            selectedProject(index);
        })

    } 

    const selectedProject = (index) => {
        //Check to see if class exists on another node
        //IF so, remove it
        //ADD class to clicked node
        // const projects = Array.from(document.querySelectorAll(".project"));
        const todoListEl = document.querySelector(".todo-list");
        todoListEl.setAttribute("id", `${index}`);
        renderProjectLabel(index);
        renderTodos(index);

    }

    const selectedTodo = (index) => {
        const todoEl = document.querySelector(".todo-container");
        todoEl.display = block;
        //We need to know what todolist we're on.
    

    }
    
    function EventsController() {
        const addTodoEl = document.querySelector(".add-todo-btn");
        const projectsAddEl = document.querySelector("#projects-add");
        const projectsTitleForm = document.querySelector(".form");
        const projectsTitleInput = document.querySelector(".projects-title-input")
        const modal = document.querySelector("#dialog");

        const renderProjectsHandler = (e) => {
            e.preventDefault();
            // console.log(projectsTitleInput.value)
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