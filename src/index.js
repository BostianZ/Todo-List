import { TodoList } from "./TodoList";
import { Projects } from "./Projects";


const list = new TodoList("First list");
list.addTodo("hello");
list.addTodo("world");
list.editTodo(1, "again");
// console.log(list);
// list.deleteTodo(1);
console.log(list);
const listTwo = new TodoList("Second list");
listTwo.addTodo("number2")
listTwo.setTodoPriority(0, "Important");
listTwo.setDueDate(0, Date.now());
console.log(listTwo);

let projects = new Projects();
projects.addTodoList(list);
projects.addTodoList(listTwo)
console.log(projects);