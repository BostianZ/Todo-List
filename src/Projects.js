import { TodoList } from "./TodoList";

class Projects {
    constructor() {
        this.projects = [];
    }

    addTodoList(todolist) {
        this.projects.push(todolist)
        return this.projects;
    }

    deleteProject(id) {
        let newProjectList = this.projects.splice(id, 1);
        return newProjectList;
    }
}

export { Projects }