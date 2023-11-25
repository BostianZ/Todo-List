import { TodoList } from "./TodoList";

class Projects {
    constructor() {
        this.projects = [];
    }

    addTodoList(todolist) {
        this.projects.push(todolist)
        return this.projects;
    }
}

export { Projects }