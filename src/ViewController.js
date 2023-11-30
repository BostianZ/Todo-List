import { Projects } from "./Projects";

function ViewController() {
    let projects = new Projects();
    let projectsData = projects.getProjects();
    

    const renderTodos = (id) => {
        const todoListEl = document.querySelector(".todo-list");
        console.log("test");
        todoListEl.innerHTML = ""
        let project = projectsData[id];
        project.todos.forEach((todo, index) => {
            let divEl = document.createElement("div");
            divEl.setAttribute("id", `${index}`);
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
        })
    } 

    const selectedProject = (index) => {
        //Check to see if class exists on another node
        //IF so, remove it
        //ADD class to clicked node
        const projects = Array.from(document.querySelectorAll(".project"));
        const todoListEl = document.querySelector(".todo-list");
        todoListEl.setAttribute("id", `${index}`);
        renderTodos(index);

    }

    const projectsAddEl = document.querySelector("#projects-add");
    const projectsTitleForm = document.querySelector(".form");
    const projectsTitleInput = document.querySelector(".projects-title-input")
    const modal = document.querySelector("#dialog");



    projectsAddEl.addEventListener("click", function(e) {
        modal.showModal();
    })

    projectsTitleForm.addEventListener("submit", function(e) {
        e.preventDefault();

        console.log(projectsTitleInput.value)
        
        projects.addTodoList(projectsTitleInput.value);

        renderProjects();
        projectsTitleForm.reset()
        modal.close();

    })

    const addTodoEl = document.querySelector(".add-todo-btn");
    addTodoEl.addEventListener("click", function(e) {
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
    })

}

export { ViewController }