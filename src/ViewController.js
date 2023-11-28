import { Projects } from "./Projects";

function ViewController() {
    let projects = new Projects();
    let projectsData = projects.getProjects();
    

    const renderTodos = () => {

    }

    const renderProjects = () => {
        const projectsDiv = document.querySelector(".projects");
        for (let i = 0; i < projects.length; i++) {
            let divEl = document.createElement("div");
            divEl.textContent = projects[i];
            projectsDiv.appendChild(divEl)
        }
        console.log(projectsData);
        
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
        projectsTitleForm.reset()
        modal.close();
        renderProjects();
    })

    renderProjects();

    return {
        renderTodos,
        renderProjects
    }

}

export { ViewController }