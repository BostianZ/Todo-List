import { Todo } from "./Todo";
import { TodoList } from "./TodoList";


const list = new TodoList("First list");
list.addTodo("hello", "hello", "hello", "hello", "hello");
list.addTodo("world", "world", "world", "world", "world");
// console.log(list);
// list.deleteTodo(1);
console.log(list);
const listTwo = new TodoList("Second list");
listTwo.addTodo("number2","number2","number2","number2","number2")
console.log(listTwo);