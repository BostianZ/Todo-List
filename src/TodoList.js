import { Todo } from "./Todo";

class TodoList {
    constructor(title) {
        this.title = title,
        this.todos = [];
    }

    addTodo(...todo) {
        let newTodo = new Todo(...todo);
        this.todos.push(newTodo);
        console.log(this.todos)
        return this.todos;
    }

    deleteTodo(id) {
        let newTodoList = this.todos.splice(id, 1);
        return newTodoList;
    }

    editTodo(id, val) {
        id = parseInt(id);
        let todo = this.todos.find((todo, index) => index === id);
        todo.title = val;
        return this.todos;
    }

    editTodoList(val) {
        id = parseInt(id);
        this.title = val;
    }

    setTodoPriority(id) {
        id = parseInt(id);
        let todo = this.todos.find((todo, index) => index === id);
        todo.priority = !todo.priority;
        console.log(todo.priority);

        return this.todos;
    }

    setDueDate(id, date) {
        id = parseInt(id);
        console.log(date);
        date.slice(0, 10);
        let todo = this.todos.find((todo, index) => index === id);
        todo.dueDate = date;
        return this.todos;
    }

    addTodoNotes(id, val) {
        id = parseInt(id);
        let todo = this.todos.find((todo, index) => index === id);
        console.log(todo);
        todo.notes = val;
        return this.todos;
    }

    completeTodo(id) {
        id = parseInt(id);
        let todo = this.todos.find((todo, index) => index === id);
        todo.isComplete = !todo.isComplete;
        console.log(todo);
        return this.todos;
    }

    editTodoListTitle(val) {
       this.title = val;
    }

    getCurrentTodo(index) {
        return this.todos[index];
    }

}


export { TodoList }