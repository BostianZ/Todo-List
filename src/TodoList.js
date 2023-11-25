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

    editTodo(id) {

    }

    setTodoPriority(id, priority) {
        //Find todo based on ID
        //set it's priority
        let todo = this.todoList.find((todo, index) => index === id);
        todo.priority = priority;
        return this.todoList;
    }
    setDueDate(id, date) {
        let todo = this.todoList.find((todo, index) => index === id);
        todo.dueDate = date;
        return this.todoList;
    }




}


export { TodoList }