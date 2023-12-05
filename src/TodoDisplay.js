function RenderTodoDisplay(projectIndex, todoIndex, projectsData) {
    const todoContainerEl = document.querySelector(".todo-container");
    let todos = projectsData[projectIndex].todos;
    let todo = todos[todoIndex];

    todoContainerEl.setAttribute("id", `${projectIndex}`);
    todoContainerEl.style.display = "block";

    //Div wrapper
    const todoDivEl = document.createElement("div");
    todoDivEl.classList.add("todo");
    todoDivEl.setAttribute("id", `${todoIndex}`)

    //Todo title input
    const todoTitleDivEl = document.createElement("div");
    const todoTitleInputEl = document.createElement("input");
    todoTitleDivEl.classList.add("todo-title");
    todoTitleDivEl.appendChild(todoTitleInputEl);
    todoTitleInputEl.type = "text";
    todoTitleInputEl.placeholder = todo.title;
    todoTitleInputEl.classList.add("todo-title-input");
    todoDivEl.appendChild(todoTitleDivEl)
    
    //Todo priority
    const priorityDivEl = document.createElement("div");
    const urgentBtnEl = document.createElement("button");
    const importantBtnEl = document.createElement("button");
    urgentBtnEl.setAttribute("id", "urgent")
    importantBtnEl.setAttribute("id", "important")
    urgentBtnEl.classList.add("priority-btn");
    importantBtnEl.classList.add("priority-btn");
    urgentBtnEl.textContent = "Urgent";
    importantBtnEl.textContent = "Important";
    priorityDivEl.classList.add("priority");
    priorityDivEl.appendChild(urgentBtnEl);
    priorityDivEl.appendChild(importantBtnEl);
    todoDivEl.appendChild(priorityDivEl);

    //Todo notes
    const notesWrapperEl = document.createElement("div");
    const notesEl = document.createElement("p");
    const notesTextarea = document.createElement("textarea");
    notesTextarea.textContent = todo.notes;
    notesWrapperEl.classList.add("notes");
    notesEl.textContent = "NOTES";
    notesWrapperEl.appendChild(notesEl);
    notesWrapperEl.appendChild(notesTextarea);
    todoDivEl.appendChild(notesWrapperEl);

  
}

export { RenderTodoDisplay }