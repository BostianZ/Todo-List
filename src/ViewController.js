import { Projects } from "./Projects";

function ViewController() {
    let projects = new Projects();
    let projectsData = projects.getProjects();
    

    const renderTodos = () => {

    }

    const renderProjects = () => {
        const projectsDiv = document.querySelector(".projects");
        projectsDiv.innerHTML = "";
        let projects = projectsData.forEach((project, index) => {
            let divEl = document.createElement("div");
            divEl.textContent = project.title;
            divEl.setAttribute("id", `${index}`);
            projectsDiv.appendChild(divEl)
        })
        return projects;
    }

    // const renderProject = (val) => {
    //     console.log("VAL", val);
    //     const projectsDiv = document.querySelector(".projects");
    //     let divEl = document.createElement("div");
    //     divEl.classList.add("project");
    //     divEl.textContent = val;
    //     projectsDiv.appendChild(divEl)
    // }

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

}

export { ViewController }