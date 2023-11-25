import { Todo } from "./Todo";

class TodoList {
    constructor(title) {
        this.title = title,
        this.todoList = [];
    }

    addTodo(...todo) {
        let newTodo = new Todo(...todo);
        this.todoList.push(newTodo);
        console.log(this.todoList)
        return this.todoList;
    }

    deleteTodo(id) {
        let newTodoList = this.todoList.splice(id, 1);
        return newTodoList;
    }

}


export { TodoList }