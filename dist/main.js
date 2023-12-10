/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Projects.js":
/*!*************************!*\
  !*** ./src/Projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Projects: () => (/* binding */ Projects)
/* harmony export */ });
/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoList */ "./src/TodoList.js");

class Projects {
    constructor() {
        //Contains list of todo lists.
        this.projects = [];
    }

    addTodoList(todolist) {
        let list = new _TodoList__WEBPACK_IMPORTED_MODULE_0__.TodoList(todolist)
        this.projects.push(list)
        return this.projects;
    }

    deleteTodoList(id) {
        let newProjectList = this.projects.splice(id, 1);
        return newProjectList;
    }

    getCurrentProject(index) {
        return this.projects[index];
    }

    getProjects() {
        return this.projects;
    }
}



/***/ }),

/***/ "./src/Todo.js":
/*!*********************!*\
  !*** ./src/Todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Todo: () => (/* binding */ Todo)
/* harmony export */ });
class Todo {
    constructor(title) {
        this.title = title,
        this.dueDate = "",
        this.priority = false,
        this.notes = "",
        this.isComplete = false;
    }
}



/***/ }),

/***/ "./src/TodoList.js":
/*!*************************!*\
  !*** ./src/TodoList.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TodoList: () => (/* binding */ TodoList)
/* harmony export */ });
/* harmony import */ var _Todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Todo */ "./src/Todo.js");


class TodoList {
    constructor(title) {
        this.title = title,
        this.todos = [];
    }

    addTodo(...todo) {
        let newTodo = new _Todo__WEBPACK_IMPORTED_MODULE_0__.Todo(...todo);
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




/***/ }),

/***/ "./src/ViewController.js":
/*!*******************************!*\
  !*** ./src/ViewController.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewController: () => (/* binding */ ViewController)
/* harmony export */ });
/* harmony import */ var _Projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Projects */ "./src/Projects.js");


function ViewController() {
    let projects = new _Projects__WEBPACK_IMPORTED_MODULE_0__.Projects();
    let projectsData = projects.getProjects();
    const todoListEl = document.querySelector(".todo-list");
    const todoContainerEl = document.querySelector(".todo-container");
    const projectDeleteBtn = document.querySelector(".todo-list-delete-btn");
    const projectLabel = document.querySelector(".todo-list-title-input");
    const priorityBtn = document.querySelector(".priority-btn");

    const renderTodos = (projectIndex) => {
        todoListEl.innerHTML = ""
        let project = projectsData[projectIndex];
        project.todos.forEach((todo, index) => {
            let todoWrapperEl = document.createElement("div");
            let divEl = document.createElement("div");
            let deleteTodoEl = document.createElement("button");
            let completeTodoEl = document.createElement("input");
            divEl.classList.add("todo-item-text");
            completeTodoEl.type = "radio";
            completeTodoEl.classList.add("todo-complete-btn")
            completeTodoEl.value = "isComplete";
            deleteTodoEl.textContent = "X";
            deleteTodoEl.setAttribute("id", `${index}`);
            deleteTodoEl.addEventListener("click", function (e) {
                deleteTodohandler(e, projectIndex);
            })
            todoWrapperEl.setAttribute("id", `${index}`);
            todoWrapperEl.classList.add("todo-item");
            divEl.textContent = todo.title;
            divEl.addEventListener("click", function (e) {
                renderTodoDisplay(todoListEl.id, index);
                selectedTodo(index);
            })
            renderPriority(todo, divEl);
            renderTodoComplete(todo, divEl, completeTodoEl);
            todoWrapperEl.appendChild(completeTodoEl);
            todoWrapperEl.appendChild(divEl);
            todoWrapperEl.appendChild(deleteTodoEl)
            todoListEl.appendChild(todoWrapperEl);
        })
    }

    const defaultToFirstTodo = (todos, index) => {
        const todoContainerEl = document.querySelector(".todo-container");
        if (todos.length === 0) {
            todoContainerEl.style.display = "none";
        } else {
            renderTodoDisplay(index, 0);
        }
    }

    // const displayTodoInfo = (projectIndex, todoIndex) => {
    //     const todoTitleEl = document.querySelector(".todo-title-input");
    //     const todoEl = document.querySelector(".todo")
    //     todoEl.setAttribute("id", `${todoIndex}`);
    //     todoContainerEl.style.display = "block";
    //     let todos = projectsData[projectIndex].todos;
    //     let todo = todos[todoIndex];
    //     todoTitleEl.placeholder = todo.title;
    // }
    
    const renderTodoDisplay = (projectIndex, todoIndex) => {
        let todos = projectsData[projectIndex].todos;
        let todo = todos[todoIndex];
        todoContainerEl.setAttribute("id", `${projectIndex}`);
        todoContainerEl.style.display = "block";
        todoContainerEl.innerHTML = `
            <div class="todo" id=${todoIndex}>
                <div class="todo-title">
                    <input type="text" placeholder=${todo.title} class="todo-title-input" />
                </div>
                <div class="priority">
                    <button class="priority-btn">Priority</button>
                </div>
                <div class="todo-date-wrapper">
                    <label for="dueDate" class="todo-date-label">Due date:</label>
                    <input class="todo-date" type="date" id="due" name="dueDate" />
                    <div>${todo.dueDate}</div>
                </div>
                <div class="notes">
                    <p>NOTES</p>
                    <textarea rows="8" class="todo-notes">${todo.notes}</textarea>
                </div>
            </div> `
    }

    const hideTodoInfo = () => {
        todoContainerEl.style.display = "none";
    }

    const selectedTodo = (index) => {
        const todos = document.querySelectorAll(".todo-item");
        todos.forEach(todo => {
            todo.classList.remove("project-selected");
        })
        todos[index].classList.add("project-selected");
    }

    const deleteTodohandler = (e, projectIndex) => {
        //Project index and todo index
        let todoIndex = e.target.id
        let project = projectsData[projectIndex];
        console.log(projectIndex);
        console.log(project);
        project.deleteTodo(todoIndex);
        hideTodoInfo();
        renderTodos(projectIndex);
    }

    const renderProjects = () => {
        const projectsDiv = document.querySelector(".projects");
        projectsDiv.innerHTML = "";
        let projects = projectsData.forEach((project, index) => {
            let divEl = document.createElement("div");
            divEl.textContent = project.title;
            divEl.classList.add("project");
            divEl.setAttribute("id", `${index}`);
            divEl.addEventListener("click", function () {
                renderProject(index);
                selectedProject(index);
            });
            projectsDiv.appendChild(divEl)
            renderProject(index);
            selectedProject(index);
        })
    }

    const renderProject = (index) => {
        todoListEl.setAttribute("id", `${index}`);
        renderProjectLabel(index);
        renderTodos(index);
    }

    const renderProjectLabel = (index) => {
        projectLabel.placeholder = projectsData[index].title;
        projectDeleteBtn.setAttribute("id", `${index}`);
    }

    const selectedProject = (index) => {
        let projects = document.querySelectorAll(".project");
        projects.forEach(project => {
            project.classList.remove("project-selected");
        })
        projects[index].classList.add("project-selected");
        defaultToFirstTodo(projectsData[index].todos, index);
    }

    const renderPriority = (todo, el) => {
       if (todo.priority === true) {
        el.classList.add("priority-true");
       } else if (todo.priority === false) {
        el.classList.remove("priority-true");
       }
    }

    const renderTodoComplete = (todo, todoEl, radioEl) => {
        if (todo.isComplete === true) {
            todoEl.classList.add("complete");
            radioEl.checked = true;
        } else if (todo.isComplete === false) {
            todoEl.classList.remove("complete");
            radioEl.checked = false;
        }
    }

    function EventsController() {
        const addTodoEl = document.querySelector(".add-todo-btn");
        const projectsAddEl = document.querySelector("#projects-add");
        const projectsTitleForm = document.querySelector(".form");
        const projectsTitleInput = document.querySelector(".projects-title-input")
        const modal = document.querySelector("#dialog");
        const cancelProjectDialogBox = document.querySelector(".project-form-cancel-btn");

        const editProjectTitle = (e, projectIndex) => {
            let val = e.target.value
            let todoList = projectsData[projectIndex];
            console.log(todoList);
            todoList.editTodoListTitle(val);
            renderProjects()
        }  

        const editTodoHandler = (e, projectIndex, todoIndex) => {
            let val = e.target.value
            let todoList = projectsData[projectIndex];
            todoList.editTodo(todoIndex, val);
            renderTodos(projectIndex);
            renderTodoDisplay(projectIndex, todoIndex)
        }   

        const completeTodohandler = (projectIndex, todoIndex) => {
            let todoList = projectsData[projectIndex];
            todoList.completeTodo(todoIndex);
            renderTodos(projectIndex);
        }

        const setTodoDateHandler = (e, projectIndex, todoIndex) => {
            console.log(e.target.value);
            let date = e.target.value;
            let todoList = projectsData[projectIndex];
            // debugger;
            console.log(todoList);
            todoList.setDueDate(todoIndex, date)
            renderTodoDisplay(projectIndex, todoIndex);
        }

        const addTodoNotesHandler = (e, projectIndex, todoIndex) => {
            console.log(e.target.value)
            let val = e.target.value;
            let todoList = projectsData[projectIndex];
            // debugger;
            console.log(todoList);
            todoList.addTodoNotes(todoIndex, val)
            renderTodoDisplay(projectIndex, todoIndex);
        }

        const renderProjectsHandler = (e) => {
            e.preventDefault();
            projects.addTodoList(projectsTitleInput.value);
            renderProjects();
            projectsTitleForm.reset()
            modal.close();
        }

        const renderTodosHandler = (e) => {
            const addTodoInput = document.querySelector(".add-todo-input")
            const todoListEl = document.querySelector(".todo-list");
            let index = todoListEl.id;
            let todoVal = addTodoInput.value;
            let todolist = projectsData[index];
            todolist.addTodo(todoVal);
            renderTodos(index);
            addTodoInput.value = "";
        }

        const deleteProjectHandler = (index) => {
            projects.deleteTodoList(index);
            projectLabel.placeholder = "";
            renderProjects();
            renderTodos(index);
        }

        const updatePriorityHandler = (projectIndex, todoIndex) => {
            let currentProject = projects.getCurrentProject(projectIndex)
            console.log(currentProject);
            currentProject.setTodoPriority(todoIndex);
            renderTodos(projectIndex);
        }

        projectDeleteBtn.addEventListener("click", (e) => deleteProjectHandler(e.target.id));

        projectsAddEl.addEventListener("click", (e) => modal.showModal());

        cancelProjectDialogBox.addEventListener("click", (e) => modal.close());

        projectsTitleForm.addEventListener("submit", renderProjectsHandler)

        addTodoEl.addEventListener("click", renderTodosHandler);

        document.addEventListener("click", (e) => {
            const priorityBtn = e.target.matches(".priority-btn");
            const btn = document.querySelector(".priority-btn");
            if (priorityBtn) {
                let todoIndex = btn.parentElement.parentElement.id;
                updatePriorityHandler(todoListEl.id, todoIndex);
            }
        })

        document.addEventListener("click", (e) => {
            const todoCompleteMatch = e.target.matches(".todo-complete-btn");
            const todoCompleteBtn = e.target;
            if (todoCompleteMatch) {
                let todoIndex = todoCompleteBtn.parentElement.id;
               
                console.log(todoIndex);
                completeTodohandler(todoListEl.id, todoIndex);
            }
        })

        document.addEventListener("focusout", (e) => {
            const todoNotesEl = e.target.matches(".todo-notes");
            const txtArea = document.querySelector(".todo-notes")
            if (todoNotesEl) {
                let todoIndex = txtArea.parentElement.parentElement.id;
                addTodoNotesHandler(e, todoListEl.id, todoIndex);
            }
        })

        document.addEventListener("focusout", (e) => {
            const date = e.target.matches(".todo-date");
            const dateEl = document.querySelector(".todo-date");
            if (date) {
                let todoIndex = dateEl.parentElement.parentElement.id;
                setTodoDateHandler(e, todoListEl.id, todoIndex);
            }
        })

        document.addEventListener("focusout", (e) => {
            const todo = e.target.matches(".todo-title-input");
            const todoTitleEl = document.querySelector(".todo-title-input");
            if (todo) {
                let todoIndex = todoTitleEl.parentElement.parentElement.id;
                editTodoHandler(e, todoListEl.id, todoIndex);
            }
        })

        document.addEventListener("focusout", (e) => {
            const todolist = e.target.matches(".todo-list-title-input");
            if (todolist) {
                editProjectTitle(e, todoListEl.id);
            }
        })

        document.addEventListener("DOMContentLoaded", (e) => {
            projects.addTodoList("My First List");
            renderProjects();
        })

        // const nonRenderedEventHandling = (elMatch, el, handler, e, className) => {
        //     const elMatch = e.target.matches(className);
        //     const el = document.querySelector(className);
        //     if (elMatch) {
        //         let todoIndex = el.parentElement.parentElement.id;
        //         handler(e, todoListEl.id, todoIndex)
        //     }
        // }   

    }

    EventsController();
}





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoList */ "./src/TodoList.js");
/* harmony import */ var _Projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Projects */ "./src/Projects.js");
/* harmony import */ var _ViewController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewController */ "./src/ViewController.js");





// const list = new TodoList("First list");
// list.addTodo("hello");
// list.addTodo("world");
// list.editTodo(1, "again");
// // console.log(list);
// // list.deleteTodo(1);
// console.log(list);
// const listTwo = new TodoList("Second list");
// listTwo.addTodo("number2")
// listTwo.setTodoPriority(0, "Important");
// listTwo.setDueDate(0, Date.now());
// console.log(listTwo);

// let projects = new Projects();
// projects.addTodoList(list);
// projects.addTodoList(listTwo)
// console.log(projects);

(0,_ViewController__WEBPACK_IMPORTED_MODULE_2__.ViewController)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsK0NBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix1Q0FBSTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzVFc0M7QUFDdEM7QUFDQTtBQUNBLHVCQUF1QiwrQ0FBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLE1BQU07QUFDckQ7QUFDQTtBQUNBLGFBQWE7QUFDYixnREFBZ0QsTUFBTTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsVUFBVTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsYUFBYTtBQUMzRDtBQUNBO0FBQ0EsbUNBQW1DLFVBQVU7QUFDN0M7QUFDQSxxREFBcUQsWUFBWTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixhQUFhO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxXQUFXO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsTUFBTTtBQUM5QztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxNQUFNO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxNQUFNO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzlVQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDQTtBQUNZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBYyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Qcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1ZpZXdDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2RvTGlzdCB9IGZyb20gXCIuL1RvZG9MaXN0XCI7XHJcbmNsYXNzIFByb2plY3RzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vQ29udGFpbnMgbGlzdCBvZiB0b2RvIGxpc3RzLlxyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvTGlzdCh0b2RvbGlzdCkge1xyXG4gICAgICAgIGxldCBsaXN0ID0gbmV3IFRvZG9MaXN0KHRvZG9saXN0KVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChsaXN0KVxyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVRvZG9MaXN0KGlkKSB7XHJcbiAgICAgICAgbGV0IG5ld1Byb2plY3RMaXN0ID0gdGhpcy5wcm9qZWN0cy5zcGxpY2UoaWQsIDEpO1xyXG4gICAgICAgIHJldHVybiBuZXdQcm9qZWN0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJyZW50UHJvamVjdChpbmRleCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9qZWN0cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUHJvamVjdHMgfSIsImNsYXNzIFRvZG8ge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXHJcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gXCJcIixcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gZmFsc2UsXHJcbiAgICAgICAgdGhpcy5ub3RlcyA9IFwiXCIsXHJcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRvZG8gfSIsImltcG9ydCB7IFRvZG8gfSBmcm9tIFwiLi9Ub2RvXCI7XHJcblxyXG5jbGFzcyBUb2RvTGlzdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLnRvZG9zID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9kbyguLi50b2RvKSB7XHJcbiAgICAgICAgbGV0IG5ld1RvZG8gPSBuZXcgVG9kbyguLi50b2RvKTtcclxuICAgICAgICB0aGlzLnRvZG9zLnB1c2gobmV3VG9kbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50b2RvcylcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUb2RvKGlkKSB7XHJcbiAgICAgICAgbGV0IG5ld1RvZG9MaXN0ID0gdGhpcy50b2Rvcy5zcGxpY2UoaWQsIDEpO1xyXG4gICAgICAgIHJldHVybiBuZXdUb2RvTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBlZGl0VG9kbyhpZCwgdmFsKSB7XHJcbiAgICAgICAgaWQgPSBwYXJzZUludChpZCk7XHJcbiAgICAgICAgbGV0IHRvZG8gPSB0aGlzLnRvZG9zLmZpbmQoKHRvZG8sIGluZGV4KSA9PiBpbmRleCA9PT0gaWQpO1xyXG4gICAgICAgIHRvZG8udGl0bGUgPSB2YWw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFRvZG9MaXN0KHZhbCkge1xyXG4gICAgICAgIGlkID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG9kb1ByaW9yaXR5KGlkKSB7XHJcbiAgICAgICAgaWQgPSBwYXJzZUludChpZCk7XHJcbiAgICAgICAgbGV0IHRvZG8gPSB0aGlzLnRvZG9zLmZpbmQoKHRvZG8sIGluZGV4KSA9PiBpbmRleCA9PT0gaWQpO1xyXG4gICAgICAgIHRvZG8ucHJpb3JpdHkgPSAhdG9kby5wcmlvcml0eTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b2RvLnByaW9yaXR5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RHVlRGF0ZShpZCwgZGF0ZSkge1xyXG4gICAgICAgIGlkID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGUpO1xyXG4gICAgICAgIGRhdGUuc2xpY2UoMCwgMTApO1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLmR1ZURhdGUgPSBkYXRlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRvZG9Ob3RlcyhpZCwgdmFsKSB7XHJcbiAgICAgICAgaWQgPSBwYXJzZUludChpZCk7XHJcbiAgICAgICAgbGV0IHRvZG8gPSB0aGlzLnRvZG9zLmZpbmQoKHRvZG8sIGluZGV4KSA9PiBpbmRleCA9PT0gaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRvZG8pO1xyXG4gICAgICAgIHRvZG8ubm90ZXMgPSB2YWw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcGxldGVUb2RvKGlkKSB7XHJcbiAgICAgICAgaWQgPSBwYXJzZUludChpZCk7XHJcbiAgICAgICAgbGV0IHRvZG8gPSB0aGlzLnRvZG9zLmZpbmQoKHRvZG8sIGluZGV4KSA9PiBpbmRleCA9PT0gaWQpO1xyXG4gICAgICAgIHRvZG8uaXNDb21wbGV0ZSA9ICF0b2RvLmlzQ29tcGxldGU7XHJcbiAgICAgICAgY29uc29sZS5sb2codG9kbyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFRvZG9MaXN0VGl0bGUodmFsKSB7XHJcbiAgICAgICB0aGlzLnRpdGxlID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRUb2RvKGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3NbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IFRvZG9MaXN0IH0iLCJpbXBvcnQgeyBQcm9qZWN0cyB9IGZyb20gXCIuL1Byb2plY3RzXCI7XHJcblxyXG5mdW5jdGlvbiBWaWV3Q29udHJvbGxlcigpIHtcclxuICAgIGxldCBwcm9qZWN0cyA9IG5ldyBQcm9qZWN0cygpO1xyXG4gICAgbGV0IHByb2plY3RzRGF0YSA9IHByb2plY3RzLmdldFByb2plY3RzKCk7XHJcbiAgICBjb25zdCB0b2RvTGlzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XHJcbiAgICBjb25zdCB0b2RvQ29udGFpbmVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcHJvamVjdERlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0LWRlbGV0ZS1idG5cIik7XHJcbiAgICBjb25zdCBwcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdC10aXRsZS1pbnB1dFwiKTtcclxuICAgIGNvbnN0IHByaW9yaXR5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmlvcml0eS1idG5cIik7XHJcblxyXG4gICAgY29uc3QgcmVuZGVyVG9kb3MgPSAocHJvamVjdEluZGV4KSA9PiB7XHJcbiAgICAgICAgdG9kb0xpc3RFbC5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XTtcclxuICAgICAgICBwcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0b2RvV3JhcHBlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbGV0IGRpdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbGV0IGRlbGV0ZVRvZG9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIGxldCBjb21wbGV0ZVRvZG9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgZGl2RWwuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS10ZXh0XCIpO1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRvZG9FbC50eXBlID0gXCJyYWRpb1wiO1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRvZG9FbC5jbGFzc0xpc3QuYWRkKFwidG9kby1jb21wbGV0ZS1idG5cIilcclxuICAgICAgICAgICAgY29tcGxldGVUb2RvRWwudmFsdWUgPSBcImlzQ29tcGxldGVcIjtcclxuICAgICAgICAgICAgZGVsZXRlVG9kb0VsLnRleHRDb250ZW50ID0gXCJYXCI7XHJcbiAgICAgICAgICAgIGRlbGV0ZVRvZG9FbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICAgICAgZGVsZXRlVG9kb0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlVG9kb2hhbmRsZXIoZSwgcHJvamVjdEluZGV4KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdG9kb1dyYXBwZXJFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICAgICAgdG9kb1dyYXBwZXJFbC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpO1xyXG4gICAgICAgICAgICBkaXZFbC50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XHJcbiAgICAgICAgICAgIGRpdkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyVG9kb0Rpc3BsYXkodG9kb0xpc3RFbC5pZCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRUb2RvKGluZGV4KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmVuZGVyUHJpb3JpdHkodG9kbywgZGl2RWwpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2RvQ29tcGxldGUodG9kbywgZGl2RWwsIGNvbXBsZXRlVG9kb0VsKTtcclxuICAgICAgICAgICAgdG9kb1dyYXBwZXJFbC5hcHBlbmRDaGlsZChjb21wbGV0ZVRvZG9FbCk7XHJcbiAgICAgICAgICAgIHRvZG9XcmFwcGVyRWwuYXBwZW5kQ2hpbGQoZGl2RWwpO1xyXG4gICAgICAgICAgICB0b2RvV3JhcHBlckVsLmFwcGVuZENoaWxkKGRlbGV0ZVRvZG9FbClcclxuICAgICAgICAgICAgdG9kb0xpc3RFbC5hcHBlbmRDaGlsZCh0b2RvV3JhcHBlckVsKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlZmF1bHRUb0ZpcnN0VG9kbyA9ICh0b2RvcywgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB0b2RvQ29udGFpbmVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGlmICh0b2Rvcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW5kZXJUb2RvRGlzcGxheShpbmRleCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnN0IGRpc3BsYXlUb2RvSW5mbyA9IChwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCkgPT4ge1xyXG4gICAgLy8gICAgIGNvbnN0IHRvZG9UaXRsZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLXRpdGxlLWlucHV0XCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IHRvZG9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb1wiKVxyXG4gICAgLy8gICAgIHRvZG9FbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHt0b2RvSW5kZXh9YCk7XHJcbiAgICAvLyAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAvLyAgICAgbGV0IHRvZG9zID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF0udG9kb3M7XHJcbiAgICAvLyAgICAgbGV0IHRvZG8gPSB0b2Rvc1t0b2RvSW5kZXhdO1xyXG4gICAgLy8gICAgIHRvZG9UaXRsZUVsLnBsYWNlaG9sZGVyID0gdG9kby50aXRsZTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgY29uc3QgcmVuZGVyVG9kb0Rpc3BsYXkgPSAocHJvamVjdEluZGV4LCB0b2RvSW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgdG9kb3MgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XS50b2RvcztcclxuICAgICAgICBsZXQgdG9kbyA9IHRvZG9zW3RvZG9JbmRleF07XHJcbiAgICAgICAgdG9kb0NvbnRhaW5lckVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3Byb2plY3RJbmRleH1gKTtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb1wiIGlkPSR7dG9kb0luZGV4fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9JHt0b2RvLnRpdGxlfSBjbGFzcz1cInRvZG8tdGl0bGUtaW5wdXRcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpb3JpdHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicHJpb3JpdHktYnRuXCI+UHJpb3JpdHk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tZGF0ZS13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImR1ZURhdGVcIiBjbGFzcz1cInRvZG8tZGF0ZS1sYWJlbFwiPkR1ZSBkYXRlOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwidG9kby1kYXRlXCIgdHlwZT1cImRhdGVcIiBpZD1cImR1ZVwiIG5hbWU9XCJkdWVEYXRlXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PiR7dG9kby5kdWVEYXRlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90ZXNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5OT1RFUzwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjhcIiBjbGFzcz1cInRvZG8tbm90ZXNcIj4ke3RvZG8ubm90ZXN9PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4gYFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhpZGVUb2RvSW5mbyA9ICgpID0+IHtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkVG9kbyA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRvZG9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWl0ZW1cIik7XHJcbiAgICAgICAgdG9kb3MuZm9yRWFjaCh0b2RvID0+IHtcclxuICAgICAgICAgICAgdG9kby5jbGFzc0xpc3QucmVtb3ZlKFwicHJvamVjdC1zZWxlY3RlZFwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRvZG9zW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1zZWxlY3RlZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWxldGVUb2RvaGFuZGxlciA9IChlLCBwcm9qZWN0SW5kZXgpID0+IHtcclxuICAgICAgICAvL1Byb2plY3QgaW5kZXggYW5kIHRvZG8gaW5kZXhcclxuICAgICAgICBsZXQgdG9kb0luZGV4ID0gZS50YXJnZXQuaWRcclxuICAgICAgICBsZXQgcHJvamVjdCA9IHByb2plY3RzRGF0YVtwcm9qZWN0SW5kZXhdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RJbmRleCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdCk7XHJcbiAgICAgICAgcHJvamVjdC5kZWxldGVUb2RvKHRvZG9JbmRleCk7XHJcbiAgICAgICAgaGlkZVRvZG9JbmZvKCk7XHJcbiAgICAgICAgcmVuZGVyVG9kb3MocHJvamVjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0cyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHNcIik7XHJcbiAgICAgICAgcHJvamVjdHNEaXYuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBsZXQgcHJvamVjdHMgPSBwcm9qZWN0c0RhdGEuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRpdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgZGl2RWwudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xyXG4gICAgICAgICAgICBkaXZFbC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcclxuICAgICAgICAgICAgZGl2RWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICAgICAgICAgIGRpdkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9qZWN0KGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChkaXZFbClcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgdG9kb0xpc3RFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICByZW5kZXJQcm9qZWN0TGFiZWwoaW5kZXgpO1xyXG4gICAgICAgIHJlbmRlclRvZG9zKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0TGFiZWwgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBwcm9qZWN0TGFiZWwucGxhY2Vob2xkZXIgPSBwcm9qZWN0c0RhdGFbaW5kZXhdLnRpdGxlO1xyXG4gICAgICAgIHByb2plY3REZWxldGVCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0XCIpO1xyXG4gICAgICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgICAgIHByb2plY3QuY2xhc3NMaXN0LnJlbW92ZShcInByb2plY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBwcm9qZWN0c1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInByb2plY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgZGVmYXVsdFRvRmlyc3RUb2RvKHByb2plY3RzRGF0YVtpbmRleF0udG9kb3MsIGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcmlvcml0eSA9ICh0b2RvLCBlbCkgPT4ge1xyXG4gICAgICAgaWYgKHRvZG8ucHJpb3JpdHkgPT09IHRydWUpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHktdHJ1ZVwiKTtcclxuICAgICAgIH0gZWxzZSBpZiAodG9kby5wcmlvcml0eSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwicHJpb3JpdHktdHJ1ZVwiKTtcclxuICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJUb2RvQ29tcGxldGUgPSAodG9kbywgdG9kb0VsLCByYWRpb0VsKSA9PiB7XHJcbiAgICAgICAgaWYgKHRvZG8uaXNDb21wbGV0ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0b2RvRWwuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICByYWRpb0VsLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodG9kby5pc0NvbXBsZXRlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0b2RvRWwuY2xhc3NMaXN0LnJlbW92ZShcImNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICByYWRpb0VsLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gRXZlbnRzQ29udHJvbGxlcigpIHtcclxuICAgICAgICBjb25zdCBhZGRUb2RvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWJ0blwiKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0c0FkZEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1hZGRcIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNUaXRsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1cIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy10aXRsZS1pbnB1dFwiKVxyXG4gICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkaWFsb2dcIik7XHJcbiAgICAgICAgY29uc3QgY2FuY2VsUHJvamVjdERpYWxvZ0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1mb3JtLWNhbmNlbC1idG5cIik7XHJcblxyXG4gICAgICAgIGNvbnN0IGVkaXRQcm9qZWN0VGl0bGUgPSAoZSwgcHJvamVjdEluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWwgPSBlLnRhcmdldC52YWx1ZVxyXG4gICAgICAgICAgICBsZXQgdG9kb0xpc3QgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codG9kb0xpc3QpO1xyXG4gICAgICAgICAgICB0b2RvTGlzdC5lZGl0VG9kb0xpc3RUaXRsZSh2YWwpO1xyXG4gICAgICAgICAgICByZW5kZXJQcm9qZWN0cygpXHJcbiAgICAgICAgfSAgXHJcblxyXG4gICAgICAgIGNvbnN0IGVkaXRUb2RvSGFuZGxlciA9IChlLCBwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmFsID0gZS50YXJnZXQudmFsdWVcclxuICAgICAgICAgICAgbGV0IHRvZG9MaXN0ID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF07XHJcbiAgICAgICAgICAgIHRvZG9MaXN0LmVkaXRUb2RvKHRvZG9JbmRleCwgdmFsKTtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb3MocHJvamVjdEluZGV4KTtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb0Rpc3BsYXkocHJvamVjdEluZGV4LCB0b2RvSW5kZXgpXHJcbiAgICAgICAgfSAgIFxyXG5cclxuICAgICAgICBjb25zdCBjb21wbGV0ZVRvZG9oYW5kbGVyID0gKHByb2plY3RJbmRleCwgdG9kb0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0b2RvTGlzdCA9IHByb2plY3RzRGF0YVtwcm9qZWN0SW5kZXhdO1xyXG4gICAgICAgICAgICB0b2RvTGlzdC5jb21wbGV0ZVRvZG8odG9kb0luZGV4KTtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb3MocHJvamVjdEluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNldFRvZG9EYXRlSGFuZGxlciA9IChlLCBwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgIGxldCBkYXRlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCB0b2RvTGlzdCA9IHByb2plY3RzRGF0YVtwcm9qZWN0SW5kZXhdO1xyXG4gICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codG9kb0xpc3QpO1xyXG4gICAgICAgICAgICB0b2RvTGlzdC5zZXREdWVEYXRlKHRvZG9JbmRleCwgZGF0ZSlcclxuICAgICAgICAgICAgcmVuZGVyVG9kb0Rpc3BsYXkocHJvamVjdEluZGV4LCB0b2RvSW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYWRkVG9kb05vdGVzSGFuZGxlciA9IChlLCBwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC52YWx1ZSlcclxuICAgICAgICAgICAgbGV0IHZhbCA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgdG9kb0xpc3QgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XTtcclxuICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvZG9MaXN0KTtcclxuICAgICAgICAgICAgdG9kb0xpc3QuYWRkVG9kb05vdGVzKHRvZG9JbmRleCwgdmFsKVxyXG4gICAgICAgICAgICByZW5kZXJUb2RvRGlzcGxheShwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZW5kZXJQcm9qZWN0c0hhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHByb2plY3RzLmFkZFRvZG9MaXN0KHByb2plY3RzVGl0bGVJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHJlbmRlclByb2plY3RzKCk7XHJcbiAgICAgICAgICAgIHByb2plY3RzVGl0bGVGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgbW9kYWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlbmRlclRvZG9zSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFRvZG9JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRvZG8taW5wdXRcIilcclxuICAgICAgICAgICAgY29uc3QgdG9kb0xpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0b2RvTGlzdEVsLmlkO1xyXG4gICAgICAgICAgICBsZXQgdG9kb1ZhbCA9IGFkZFRvZG9JbnB1dC52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IHRvZG9saXN0ID0gcHJvamVjdHNEYXRhW2luZGV4XTtcclxuICAgICAgICAgICAgdG9kb2xpc3QuYWRkVG9kbyh0b2RvVmFsKTtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb3MoaW5kZXgpO1xyXG4gICAgICAgICAgICBhZGRUb2RvSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVsZXRlUHJvamVjdEhhbmRsZXIgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcHJvamVjdHMuZGVsZXRlVG9kb0xpc3QoaW5kZXgpO1xyXG4gICAgICAgICAgICBwcm9qZWN0TGFiZWwucGxhY2Vob2xkZXIgPSBcIlwiO1xyXG4gICAgICAgICAgICByZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2RvcyhpbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cGRhdGVQcmlvcml0eUhhbmRsZXIgPSAocHJvamVjdEluZGV4LCB0b2RvSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHMuZ2V0Q3VycmVudFByb2plY3QocHJvamVjdEluZGV4KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50UHJvamVjdCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0LnNldFRvZG9Qcmlvcml0eSh0b2RvSW5kZXgpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2Rvcyhwcm9qZWN0SW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvamVjdERlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGRlbGV0ZVByb2plY3RIYW5kbGVyKGUudGFyZ2V0LmlkKSk7XHJcblxyXG4gICAgICAgIHByb2plY3RzQWRkRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBtb2RhbC5zaG93TW9kYWwoKSk7XHJcblxyXG4gICAgICAgIGNhbmNlbFByb2plY3REaWFsb2dCb3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBtb2RhbC5jbG9zZSgpKTtcclxuXHJcbiAgICAgICAgcHJvamVjdHNUaXRsZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCByZW5kZXJQcm9qZWN0c0hhbmRsZXIpXHJcblxyXG4gICAgICAgIGFkZFRvZG9FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVuZGVyVG9kb3NIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5QnRuID0gZS50YXJnZXQubWF0Y2hlcyhcIi5wcmlvcml0eS1idG5cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpb3JpdHktYnRuXCIpO1xyXG4gICAgICAgICAgICBpZiAocHJpb3JpdHlCdG4pIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2RvSW5kZXggPSBidG4ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlUHJpb3JpdHlIYW5kbGVyKHRvZG9MaXN0RWwuaWQsIHRvZG9JbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdG9kb0NvbXBsZXRlTWF0Y2ggPSBlLnRhcmdldC5tYXRjaGVzKFwiLnRvZG8tY29tcGxldGUtYnRuXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0b2RvQ29tcGxldGVCdG4gPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgaWYgKHRvZG9Db21wbGV0ZU1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9kb0luZGV4ID0gdG9kb0NvbXBsZXRlQnRuLnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9kb0luZGV4KTtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlVG9kb2hhbmRsZXIodG9kb0xpc3RFbC5pZCwgdG9kb0luZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b2RvTm90ZXNFbCA9IGUudGFyZ2V0Lm1hdGNoZXMoXCIudG9kby1ub3Rlc1wiKTtcclxuICAgICAgICAgICAgY29uc3QgdHh0QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1ub3Rlc1wiKVxyXG4gICAgICAgICAgICBpZiAodG9kb05vdGVzRWwpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2RvSW5kZXggPSB0eHRBcmVhLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICAgICAgICAgIGFkZFRvZG9Ob3Rlc0hhbmRsZXIoZSwgdG9kb0xpc3RFbC5pZCwgdG9kb0luZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlID0gZS50YXJnZXQubWF0Y2hlcyhcIi50b2RvLWRhdGVcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1kYXRlXCIpO1xyXG4gICAgICAgICAgICBpZiAoZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvZG9JbmRleCA9IGRhdGVFbC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICBzZXRUb2RvRGF0ZUhhbmRsZXIoZSwgdG9kb0xpc3RFbC5pZCwgdG9kb0luZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b2RvID0gZS50YXJnZXQubWF0Y2hlcyhcIi50b2RvLXRpdGxlLWlucHV0XCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0b2RvVGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby10aXRsZS1pbnB1dFwiKTtcclxuICAgICAgICAgICAgaWYgKHRvZG8pIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2RvSW5kZXggPSB0b2RvVGl0bGVFbC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICBlZGl0VG9kb0hhbmRsZXIoZSwgdG9kb0xpc3RFbC5pZCwgdG9kb0luZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b2RvbGlzdCA9IGUudGFyZ2V0Lm1hdGNoZXMoXCIudG9kby1saXN0LXRpdGxlLWlucHV0XCIpO1xyXG4gICAgICAgICAgICBpZiAodG9kb2xpc3QpIHtcclxuICAgICAgICAgICAgICAgIGVkaXRQcm9qZWN0VGl0bGUoZSwgdG9kb0xpc3RFbC5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0cy5hZGRUb2RvTGlzdChcIk15IEZpcnN0IExpc3RcIik7XHJcbiAgICAgICAgICAgIHJlbmRlclByb2plY3RzKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gY29uc3Qgbm9uUmVuZGVyZWRFdmVudEhhbmRsaW5nID0gKGVsTWF0Y2gsIGVsLCBoYW5kbGVyLCBlLCBjbGFzc05hbWUpID0+IHtcclxuICAgICAgICAvLyAgICAgY29uc3QgZWxNYXRjaCA9IGUudGFyZ2V0Lm1hdGNoZXMoY2xhc3NOYW1lKTtcclxuICAgICAgICAvLyAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgLy8gICAgIGlmIChlbE1hdGNoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgdG9kb0luZGV4ID0gZWwucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIC8vICAgICAgICAgaGFuZGxlcihlLCB0b2RvTGlzdEVsLmlkLCB0b2RvSW5kZXgpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9ICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIEV2ZW50c0NvbnRyb2xsZXIoKTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBWaWV3Q29udHJvbGxlciB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUb2RvTGlzdCB9IGZyb20gXCIuL1RvZG9MaXN0XCI7XHJcbmltcG9ydCB7IFByb2plY3RzIH0gZnJvbSBcIi4vUHJvamVjdHNcIjtcclxuaW1wb3J0IHsgVmlld0NvbnRyb2xsZXIgfSBmcm9tIFwiLi9WaWV3Q29udHJvbGxlclwiO1xyXG5cclxuXHJcbi8vIGNvbnN0IGxpc3QgPSBuZXcgVG9kb0xpc3QoXCJGaXJzdCBsaXN0XCIpO1xyXG4vLyBsaXN0LmFkZFRvZG8oXCJoZWxsb1wiKTtcclxuLy8gbGlzdC5hZGRUb2RvKFwid29ybGRcIik7XHJcbi8vIGxpc3QuZWRpdFRvZG8oMSwgXCJhZ2FpblwiKTtcclxuLy8gLy8gY29uc29sZS5sb2cobGlzdCk7XHJcbi8vIC8vIGxpc3QuZGVsZXRlVG9kbygxKTtcclxuLy8gY29uc29sZS5sb2cobGlzdCk7XHJcbi8vIGNvbnN0IGxpc3RUd28gPSBuZXcgVG9kb0xpc3QoXCJTZWNvbmQgbGlzdFwiKTtcclxuLy8gbGlzdFR3by5hZGRUb2RvKFwibnVtYmVyMlwiKVxyXG4vLyBsaXN0VHdvLnNldFRvZG9Qcmlvcml0eSgwLCBcIkltcG9ydGFudFwiKTtcclxuLy8gbGlzdFR3by5zZXREdWVEYXRlKDAsIERhdGUubm93KCkpO1xyXG4vLyBjb25zb2xlLmxvZyhsaXN0VHdvKTtcclxuXHJcbi8vIGxldCBwcm9qZWN0cyA9IG5ldyBQcm9qZWN0cygpO1xyXG4vLyBwcm9qZWN0cy5hZGRUb2RvTGlzdChsaXN0KTtcclxuLy8gcHJvamVjdHMuYWRkVG9kb0xpc3QobGlzdFR3bylcclxuLy8gY29uc29sZS5sb2cocHJvamVjdHMpO1xyXG5cclxuVmlld0NvbnRyb2xsZXIoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9