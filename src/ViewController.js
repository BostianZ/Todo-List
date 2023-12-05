import { Projects } from "./Projects";

function ViewController() {
    let projects = new Projects();
    let projectsData = projects.getProjects();
    const todoListEl = document.querySelector(".todo-list");
    const todoContainerEl = document.querySelector(".todo-container");
    const projectDeleteBtn = document.querySelector(".todo-list-delete-btn");
    const projectLabel = document.querySelector(".todo-list-title-input");
    const priorityBtn = document.querySelector(".priority-btn");

    const renderTodos = (projectIndex) => {
        todoListEl.innerHTML = ""
        let project = projectsData[projectIndex];
        project.todos.forEach((todo, index) => {
            let todoWrapperEl = document.createElement("div");
            let divEl = document.createElement("div");
            let deleteTodoEl = document.createElement("button");
            deleteTodoEl.textContent = "X";
            deleteTodoEl.setAttribute("id", `${index}`);
            deleteTodoEl.addEventListener("click", function (e) {
                deleteTodohandler(e, projectIndex);
            })
            todoWrapperEl.setAttribute("id", `${index}`);
            todoWrapperEl.classList.add("todo-item");
            divEl.textContent = todo.title;
            divEl.addEventListener("click", function (e) {
                renderTodoDisplay(todoListEl.id, index);
                selectedTodo(index);
            })
            todoWrapperEl.appendChild(divEl);
            todoWrapperEl.appendChild(deleteTodoEl)
            todoListEl.appendChild(todoWrapperEl);
        })
    }

    const defaultToFirstTodo = (todos, index) => {
        const todoContainerEl = document.querySelector(".todo-container");
        if (todos.length === 0) {
            todoContainerEl.style.display = "none";
        } else {
            renderTodoDisplay(index, 0);
        }
    }

    // const displayTodoInfo = (projectIndex, todoIndex) => {
    //     const todoTitleEl = document.querySelector(".todo-title-input");
    //     const todoEl = document.querySelector(".todo")
    //     todoEl.setAttribute("id", `${todoIndex}`);
    //     todoContainerEl.style.display = "block";
    //     let todos = projectsData[projectIndex].todos;
    //     let todo = todos[todoIndex];
    //     todoTitleEl.placeholder = todo.title;
    // }
    
    const renderTodoDisplay = (projectIndex, todoIndex) => {
        let todos = projectsData[projectIndex].todos;
        let todo = todos[todoIndex];
        todoContainerEl.setAttribute("id", `${projectIndex}`);
        todoContainerEl.style.display = "block";
        todoContainerEl.innerHTML = `
            <div class="todo" id=${todoIndex}>
                <div class="todo-title">
                    <input type="text" placeholder=${todo.title} class="todo-title-input" />
                </div>
                <div class="priority">
                    <button class="priority-btn">Priority</button>
                </div>
                <div>
                    <label for="dueDate">Due date:</label>
                    <input type="date" id="due" name="dueDate" value="2018-07-22" min="2018-01-01" max="2018-12-31" />
                </div>
                <div class="notes">
                    <p>NOTES</p>
                    <textarea rows="5" placeholder="Insert your notes here...">${todo.notes}</textarea>
                </div>
            </div> `
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
        let todoIndex = e.target.id
        let project = projectsData[projectIndex];
        console.log(projectIndex);
        console.log(project);
        project.deleteTodo(todoIndex);
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
            divEl.addEventListener("click", function () {
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
        projectLabel.placeholder = projectsData[index].title;
        projectDeleteBtn.setAttribute("id", `${index}`);
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
   
    }

    

    // const editProjectTitle = () => {
    //     console.log("sssss");
    // }

    // const editTodoTitle = () => {

    // }

    function EventsController() {
        const addTodoEl = document.querySelector(".add-todo-btn");
        const projectsAddEl = document.querySelector("#projects-add");
        const projectsTitleForm = document.querySelector(".form");
        const projectsTitleInput = document.querySelector(".projects-title-input")
        const modal = document.querySelector("#dialog");
        const cancelProjectDialogBox = document.querySelector(".project-form-cancel-btn");
        const todoEl = document.querySelector(".todo");
        // const clearPriorityEl = document.querySelector("clear-priority");

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

        const deleteProjectHandler = (index) => {
            projects.deleteTodoList(index);
            projectLabel.placeholder = "";
            renderProjects();
            renderTodos(index);
        }

        // const updatePriorityHandler = (projectIndex, todoIndex, priority) => {
        //     console.log("test");
        //     // let currentProject = projects.getCurrentProject(projectIndex)
        //     // currentProject.setTodoPriority(todoIndex, priority);
        //     // renderTodos(projectIndex);
        // }

        const updatePriorityHandler = (projectIndex, todoIndex) => {
            let currentProject = projects.getCurrentProject(projectIndex)
            console.log(currentProject);
            currentProject.setTodoPriority(todoIndex);
            renderTodos(projectIndex);
        }

        projectLabel.addEventListener("change", (e) => editProjectTitle(e));

        projectDeleteBtn.addEventListener("click", (e) => deleteProjectHandler(e.target.id));

        projectsAddEl.addEventListener("click", (e) => modal.showModal());

        cancelProjectDialogBox.addEventListener("click", (e) => modal.close());

        projectsTitleForm.addEventListener("submit", renderProjectsHandler)

        addTodoEl.addEventListener("click", renderTodosHandler)

        document.addEventListener("click", (e) => {
            const priorityBtn = e.target.matches(".priority-btn");
            const btn = document.querySelector(".priority-btn");
            if (priorityBtn) {
                updatePriorityHandler(todoListEl.id, btn.parentElement.parentElement.id);
            }
        })

    }

    EventsController();
}



export { ViewController }