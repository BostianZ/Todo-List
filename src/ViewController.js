import { Projects } from "./Projects";

function ViewController() {
    let projects = new Projects();
    let projectsData = projects.getProjects();
    const todoListEl = document.querySelector(".todo-list");
    const todoContainerEl = document.querySelector(".todo-container");
    
    const renderTodos = (projectIndex) => {
        todoListEl.innerHTML = ""
        let project = projectsData[projectIndex];
        project.todos.forEach((todo, index) => {
            let divEl = document.createElement("div");
            let deleteTodoEl = document.createElement("button");
            deleteTodoEl.textContent = "X";
            deleteTodoEl.setAttribute("id", `${index}`);
            deleteTodoEl.addEventListener("click", function(e) {
                deleteTodohandler(e, projectIndex);
            })
            divEl.setAttribute("id", `${index}`);
            divEl.classList.add("todo-item");
            divEl.textContent = todo.title;
            renderPriority(todo, divEl);
            divEl.addEventListener("click", function(e) {
                displayTodoInfo(todoListEl.id, index);
                selectedTodo(index);
            })
            todoListEl.appendChild(divEl);
            todoListEl.appendChild(deleteTodoEl);
        })
    }

    const defaultToFirstTodo = (todos, index) => {
        const todoContainerEl = document.querySelector(".todo-container");
        if (todos.length === 0) {
            todoContainerEl.style.display = "none";
        } else {
            displayTodoInfo(index, 0);
        }
    }

    const displayTodoInfo = (projectIndex, todoIndex) => {
        const todoTitleEl = document.querySelector(".todo-title-input");
        const todoEl = document.querySelector(".todo")
        todoEl.setAttribute("id", `${todoIndex}`);
        todoContainerEl.style.display = "block";
        let todos = projectsData[projectIndex].todos;
        let todo = todos[todoIndex];
        todoTitleEl.placeholder = todo.title;
    }

    const hideTodoInfo = () => {
        todoContainerEl.style.display = "none";
    }

    const selectedTodo = (index) => {
        const todos = document.querySelectorAll(".todo-item");
        todos.forEach(todo => {
            todo.classList.remove("project-selected");
        })
        todos[index].classList.add("project-selected");
    }

    const deleteTodohandler = (e, projectIndex) => {
        //Project index and todo index
        console.log(e.target.id);
        let todoIndex = e.target.id
        let project = projectsData[projectIndex];
        console.log(projectIndex);
        console.log(project);
        project.deleteTodo(todoIndex);
        // if (project.todos.length === 0) {
        //     hideTodoInfo();
        // }
        hideTodoInfo();
        renderTodos(projectIndex);
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

    const renderProjectLabel = (index) => {
        const projectLabel = document.querySelector(".todo-list-title-input");
        projectLabel.placeholder = projectsData[index].title;
    }

    const selectedProject = (index) => {
        let projects = document.querySelectorAll(".project");
        projects.forEach(project => {
            project.classList.remove("project-selected");
        })
        projects[index].classList.add("project-selected");
        defaultToFirstTodo(projectsData[index].todos, index);
    }

    const renderPriority = (todo, el) => {
        // const urgentBtn = document.querySelector("#urgent");
        // const importantBtn = document.querySelector("#important");
        if (todo.priority === "urgent") {
            el.classList.add("urgent");
        } else if (todo.priority === "important") {
            el.classList.add("important");
        }
    }

    function EventsController() {
        const addTodoEl = document.querySelector(".add-todo-btn");
        const projectsAddEl = document.querySelector("#projects-add");
        const projectsTitleForm = document.querySelector(".form");
        const projectsTitleInput = document.querySelector(".projects-title-input")
        const modal = document.querySelector("#dialog");
        const projectDeleteBtn = document.querySelector(".todo-list-delete-btn");
        const cancelProjectDialogBox = document.querySelector(".project-form-cancel-btn");
        const urgentBtn = document.querySelector("#urgent");
        const importantBtn = document.querySelector("#important");
        const todoEl = document.querySelector(".todo");

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
            let index = todoListEl.id;
            let todoVal = addTodoInput.value;
            let todolist = projectsData[index];
            todolist.addTodo(todoVal);
            renderTodos(index);
            addTodoInput.value = "";
        }

        const deleteProjectHandler = () => {
            console.log("TEST");
            //Get current project
            
            //Is this project currently selected?
            //IF SO DELETE
            //RE RENDER ProJECTS
        }

        const updatePriorityHandler = (projectIndex, todoIndex, priority) => {
            let currentProject = projects.getCurrentProject(projectIndex)
            currentProject.setTodoPriority(todoIndex, priority);
            renderTodos(projectIndex);
        }


        projectDeleteBtn.addEventListener("click", (e) => deleteProjectHandler());

        projectsAddEl.addEventListener("click", (e) => modal.showModal());

        cancelProjectDialogBox.addEventListener("click", (e) => modal.close());

        projectsTitleForm.addEventListener("submit", renderProjectsHandler)
    
        addTodoEl.addEventListener("click", renderTodosHandler)

        urgentBtn.addEventListener("click", (e) => updatePriorityHandler(todoListEl.id, todoEl.id, "urgent"))
        importantBtn.addEventListener("click", (e) => updatePriorityHandler(todoListEl.id, todoEl.id, "important"))
    }

    EventsController();
}



export { ViewController }