import { TodoList } from "./TodoList";
class Projects {
    constructor() {
        //Contains list of todo lists.
        this.projects = [];
    }

    addTodoList(todolist) {
        let list = new TodoList(todolist)
        this.projects.push(list)
        return this.projects;
    }

    deleteTodoList(id) {
        let newProjectList = this.projects.splice(id, 1);
        return newProjectList;
    }

    getProjects() {
        return this.projects;
    }
}

export { Projects }