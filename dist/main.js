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
            let project = projectsData[projectIndex];
            console.log(project);
            project.editProject(projectIndex, val);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN6VUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ0E7QUFDWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvUHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1RvZG9MaXN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9WaWV3Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9kb0xpc3QgfSBmcm9tIFwiLi9Ub2RvTGlzdFwiO1xyXG5jbGFzcyBQcm9qZWN0cyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL0NvbnRhaW5zIGxpc3Qgb2YgdG9kbyBsaXN0cy5cclxuICAgICAgICB0aGlzLnByb2plY3RzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9kb0xpc3QodG9kb2xpc3QpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IG5ldyBUb2RvTGlzdCh0b2RvbGlzdClcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobGlzdClcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUb2RvTGlzdChpZCkge1xyXG4gICAgICAgIGxldCBuZXdQcm9qZWN0TGlzdCA9IHRoaXMucHJvamVjdHMuc3BsaWNlKGlkLCAxKTtcclxuICAgICAgICByZXR1cm4gbmV3UHJvamVjdExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudFByb2plY3QoaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1tpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJvamVjdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFByb2plY3RzIH0iLCJjbGFzcyBUb2RvIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlLFxyXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IFwiXCIsXHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IGZhbHNlLFxyXG4gICAgICAgIHRoaXMubm90ZXMgPSBcIlwiLFxyXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUb2RvIH0iLCJpbXBvcnQgeyBUb2RvIH0gZnJvbSBcIi4vVG9kb1wiO1xyXG5cclxuY2xhc3MgVG9kb0xpc3Qge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXHJcbiAgICAgICAgdGhpcy50b2RvcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRvZG8oLi4udG9kbykge1xyXG4gICAgICAgIGxldCBuZXdUb2RvID0gbmV3IFRvZG8oLi4udG9kbyk7XHJcbiAgICAgICAgdGhpcy50b2Rvcy5wdXNoKG5ld1RvZG8pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudG9kb3MpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVG9kbyhpZCkge1xyXG4gICAgICAgIGxldCBuZXdUb2RvTGlzdCA9IHRoaXMudG9kb3Muc3BsaWNlKGlkLCAxKTtcclxuICAgICAgICByZXR1cm4gbmV3VG9kb0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFRvZG8oaWQsIHZhbCkge1xyXG4gICAgICAgIGlkID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLnRpdGxlID0gdmFsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRUb2RvTGlzdCh2YWwpIHtcclxuICAgICAgICBpZCA9IHBhcnNlSW50KGlkKTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRvZG9Qcmlvcml0eShpZCkge1xyXG4gICAgICAgIGlkID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLnByaW9yaXR5ID0gIXRvZG8ucHJpb3JpdHk7XHJcbiAgICAgICAgY29uc29sZS5sb2codG9kby5wcmlvcml0eSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHNldER1ZURhdGUoaWQsIGRhdGUpIHtcclxuICAgICAgICBpZCA9IHBhcnNlSW50KGlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRlKTtcclxuICAgICAgICBkYXRlLnNsaWNlKDAsIDEwKTtcclxuICAgICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb3MuZmluZCgodG9kbywgaW5kZXgpID0+IGluZGV4ID09PSBpZCk7XHJcbiAgICAgICAgdG9kby5kdWVEYXRlID0gZGF0ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvTm90ZXMoaWQsIHZhbCkge1xyXG4gICAgICAgIGlkID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b2RvKTtcclxuICAgICAgICB0b2RvLm5vdGVzID0gdmFsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBsZXRlVG9kbyhpZCkge1xyXG4gICAgICAgIGlkID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLmlzQ29tcGxldGUgPSAhdG9kby5pc0NvbXBsZXRlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRvZG8pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRUb2RvKGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3NbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IFRvZG9MaXN0IH0iLCJpbXBvcnQgeyBQcm9qZWN0cyB9IGZyb20gXCIuL1Byb2plY3RzXCI7XHJcblxyXG5mdW5jdGlvbiBWaWV3Q29udHJvbGxlcigpIHtcclxuICAgIGxldCBwcm9qZWN0cyA9IG5ldyBQcm9qZWN0cygpO1xyXG4gICAgbGV0IHByb2plY3RzRGF0YSA9IHByb2plY3RzLmdldFByb2plY3RzKCk7XHJcbiAgICBjb25zdCB0b2RvTGlzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XHJcbiAgICBjb25zdCB0b2RvQ29udGFpbmVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcHJvamVjdERlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0LWRlbGV0ZS1idG5cIik7XHJcbiAgICBjb25zdCBwcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdC10aXRsZS1pbnB1dFwiKTtcclxuICAgIGNvbnN0IHByaW9yaXR5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmlvcml0eS1idG5cIik7XHJcblxyXG4gICAgY29uc3QgcmVuZGVyVG9kb3MgPSAocHJvamVjdEluZGV4KSA9PiB7XHJcbiAgICAgICAgdG9kb0xpc3RFbC5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XTtcclxuICAgICAgICBwcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0b2RvV3JhcHBlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbGV0IGRpdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbGV0IGRlbGV0ZVRvZG9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIGxldCBjb21wbGV0ZVRvZG9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgZGl2RWwuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbS10ZXh0XCIpO1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRvZG9FbC50eXBlID0gXCJyYWRpb1wiO1xyXG4gICAgICAgICAgICBjb21wbGV0ZVRvZG9FbC5jbGFzc0xpc3QuYWRkKFwidG9kby1jb21wbGV0ZS1idG5cIilcclxuICAgICAgICAgICAgY29tcGxldGVUb2RvRWwudmFsdWUgPSBcImlzQ29tcGxldGVcIjtcclxuICAgICAgICAgICAgZGVsZXRlVG9kb0VsLnRleHRDb250ZW50ID0gXCJYXCI7XHJcbiAgICAgICAgICAgIGRlbGV0ZVRvZG9FbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICAgICAgZGVsZXRlVG9kb0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlVG9kb2hhbmRsZXIoZSwgcHJvamVjdEluZGV4KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdG9kb1dyYXBwZXJFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICAgICAgdG9kb1dyYXBwZXJFbC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpO1xyXG4gICAgICAgICAgICBkaXZFbC50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XHJcbiAgICAgICAgICAgIGRpdkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyVG9kb0Rpc3BsYXkodG9kb0xpc3RFbC5pZCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRUb2RvKGluZGV4KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmVuZGVyUHJpb3JpdHkodG9kbywgZGl2RWwpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2RvQ29tcGxldGUodG9kbywgZGl2RWwsIGNvbXBsZXRlVG9kb0VsKTtcclxuICAgICAgICAgICAgdG9kb1dyYXBwZXJFbC5hcHBlbmRDaGlsZChjb21wbGV0ZVRvZG9FbCk7XHJcbiAgICAgICAgICAgIHRvZG9XcmFwcGVyRWwuYXBwZW5kQ2hpbGQoZGl2RWwpO1xyXG4gICAgICAgICAgICB0b2RvV3JhcHBlckVsLmFwcGVuZENoaWxkKGRlbGV0ZVRvZG9FbClcclxuICAgICAgICAgICAgdG9kb0xpc3RFbC5hcHBlbmRDaGlsZCh0b2RvV3JhcHBlckVsKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlZmF1bHRUb0ZpcnN0VG9kbyA9ICh0b2RvcywgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB0b2RvQ29udGFpbmVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGlmICh0b2Rvcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW5kZXJUb2RvRGlzcGxheShpbmRleCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnN0IGRpc3BsYXlUb2RvSW5mbyA9IChwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCkgPT4ge1xyXG4gICAgLy8gICAgIGNvbnN0IHRvZG9UaXRsZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLXRpdGxlLWlucHV0XCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IHRvZG9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb1wiKVxyXG4gICAgLy8gICAgIHRvZG9FbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHt0b2RvSW5kZXh9YCk7XHJcbiAgICAvLyAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAvLyAgICAgbGV0IHRvZG9zID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF0udG9kb3M7XHJcbiAgICAvLyAgICAgbGV0IHRvZG8gPSB0b2Rvc1t0b2RvSW5kZXhdO1xyXG4gICAgLy8gICAgIHRvZG9UaXRsZUVsLnBsYWNlaG9sZGVyID0gdG9kby50aXRsZTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgY29uc3QgcmVuZGVyVG9kb0Rpc3BsYXkgPSAocHJvamVjdEluZGV4LCB0b2RvSW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgdG9kb3MgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XS50b2RvcztcclxuICAgICAgICBsZXQgdG9kbyA9IHRvZG9zW3RvZG9JbmRleF07XHJcbiAgICAgICAgdG9kb0NvbnRhaW5lckVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3Byb2plY3RJbmRleH1gKTtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb1wiIGlkPSR7dG9kb0luZGV4fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9JHt0b2RvLnRpdGxlfSBjbGFzcz1cInRvZG8tdGl0bGUtaW5wdXRcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpb3JpdHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicHJpb3JpdHktYnRuXCI+UHJpb3JpdHk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tZGF0ZS13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImR1ZURhdGVcIiBjbGFzcz1cInRvZG8tZGF0ZS1sYWJlbFwiPkR1ZSBkYXRlOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwidG9kby1kYXRlXCIgdHlwZT1cImRhdGVcIiBpZD1cImR1ZVwiIG5hbWU9XCJkdWVEYXRlXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PiR7dG9kby5kdWVEYXRlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90ZXNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5OT1RFUzwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjhcIiBjbGFzcz1cInRvZG8tbm90ZXNcIj4ke3RvZG8ubm90ZXN9PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4gYFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhpZGVUb2RvSW5mbyA9ICgpID0+IHtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkVG9kbyA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRvZG9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWl0ZW1cIik7XHJcbiAgICAgICAgdG9kb3MuZm9yRWFjaCh0b2RvID0+IHtcclxuICAgICAgICAgICAgdG9kby5jbGFzc0xpc3QucmVtb3ZlKFwicHJvamVjdC1zZWxlY3RlZFwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRvZG9zW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1zZWxlY3RlZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWxldGVUb2RvaGFuZGxlciA9IChlLCBwcm9qZWN0SW5kZXgpID0+IHtcclxuICAgICAgICAvL1Byb2plY3QgaW5kZXggYW5kIHRvZG8gaW5kZXhcclxuICAgICAgICBsZXQgdG9kb0luZGV4ID0gZS50YXJnZXQuaWRcclxuICAgICAgICBsZXQgcHJvamVjdCA9IHByb2plY3RzRGF0YVtwcm9qZWN0SW5kZXhdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RJbmRleCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdCk7XHJcbiAgICAgICAgcHJvamVjdC5kZWxldGVUb2RvKHRvZG9JbmRleCk7XHJcbiAgICAgICAgaGlkZVRvZG9JbmZvKCk7XHJcbiAgICAgICAgcmVuZGVyVG9kb3MocHJvamVjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0cyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHNcIik7XHJcbiAgICAgICAgcHJvamVjdHNEaXYuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBsZXQgcHJvamVjdHMgPSBwcm9qZWN0c0RhdGEuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRpdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgZGl2RWwudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xyXG4gICAgICAgICAgICBkaXZFbC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcclxuICAgICAgICAgICAgZGl2RWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICAgICAgICAgIGRpdkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9qZWN0KGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChkaXZFbClcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgdG9kb0xpc3RFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICByZW5kZXJQcm9qZWN0TGFiZWwoaW5kZXgpO1xyXG4gICAgICAgIHJlbmRlclRvZG9zKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0TGFiZWwgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBwcm9qZWN0TGFiZWwucGxhY2Vob2xkZXIgPSBwcm9qZWN0c0RhdGFbaW5kZXhdLnRpdGxlO1xyXG4gICAgICAgIHByb2plY3REZWxldGVCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0XCIpO1xyXG4gICAgICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgICAgIHByb2plY3QuY2xhc3NMaXN0LnJlbW92ZShcInByb2plY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBwcm9qZWN0c1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInByb2plY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgZGVmYXVsdFRvRmlyc3RUb2RvKHByb2plY3RzRGF0YVtpbmRleF0udG9kb3MsIGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcmlvcml0eSA9ICh0b2RvLCBlbCkgPT4ge1xyXG4gICAgICAgaWYgKHRvZG8ucHJpb3JpdHkgPT09IHRydWUpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHktdHJ1ZVwiKTtcclxuICAgICAgIH0gZWxzZSBpZiAodG9kby5wcmlvcml0eSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwicHJpb3JpdHktdHJ1ZVwiKTtcclxuICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJUb2RvQ29tcGxldGUgPSAodG9kbywgdG9kb0VsLCByYWRpb0VsKSA9PiB7XHJcbiAgICAgICAgaWYgKHRvZG8uaXNDb21wbGV0ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0b2RvRWwuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICByYWRpb0VsLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodG9kby5pc0NvbXBsZXRlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0b2RvRWwuY2xhc3NMaXN0LnJlbW92ZShcImNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICByYWRpb0VsLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gRXZlbnRzQ29udHJvbGxlcigpIHtcclxuICAgICAgICBjb25zdCBhZGRUb2RvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWJ0blwiKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0c0FkZEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1hZGRcIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNUaXRsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1cIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy10aXRsZS1pbnB1dFwiKVxyXG4gICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkaWFsb2dcIik7XHJcbiAgICAgICAgY29uc3QgY2FuY2VsUHJvamVjdERpYWxvZ0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1mb3JtLWNhbmNlbC1idG5cIik7XHJcblxyXG4gICAgICAgIGNvbnN0IGVkaXRQcm9qZWN0VGl0bGUgPSAoZSwgcHJvamVjdEluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWwgPSBlLnRhcmdldC52YWx1ZVxyXG4gICAgICAgICAgICBsZXQgcHJvamVjdCA9IHByb2plY3RzRGF0YVtwcm9qZWN0SW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0KTtcclxuICAgICAgICAgICAgcHJvamVjdC5lZGl0UHJvamVjdChwcm9qZWN0SW5kZXgsIHZhbCk7XHJcbiAgICAgICAgICAgIHJlbmRlclByb2plY3RzKClcclxuICAgICAgICB9ICBcclxuXHJcbiAgICAgICAgY29uc3QgZWRpdFRvZG9IYW5kbGVyID0gKGUsIHByb2plY3RJbmRleCwgdG9kb0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWwgPSBlLnRhcmdldC52YWx1ZVxyXG4gICAgICAgICAgICBsZXQgdG9kb0xpc3QgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XTtcclxuICAgICAgICAgICAgdG9kb0xpc3QuZWRpdFRvZG8odG9kb0luZGV4LCB2YWwpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2Rvcyhwcm9qZWN0SW5kZXgpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2RvRGlzcGxheShwcm9qZWN0SW5kZXgsIHRvZG9JbmRleClcclxuICAgICAgICB9ICAgXHJcblxyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlVG9kb2hhbmRsZXIgPSAocHJvamVjdEluZGV4LCB0b2RvSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRvZG9MaXN0ID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF07XHJcbiAgICAgICAgICAgIHRvZG9MaXN0LmNvbXBsZXRlVG9kbyh0b2RvSW5kZXgpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2Rvcyhwcm9qZWN0SW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2V0VG9kb0RhdGVIYW5kbGVyID0gKGUsIHByb2plY3RJbmRleCwgdG9kb0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgbGV0IGRhdGUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IHRvZG9MaXN0ID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF07XHJcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0b2RvTGlzdCk7XHJcbiAgICAgICAgICAgIHRvZG9MaXN0LnNldER1ZURhdGUodG9kb0luZGV4LCBkYXRlKVxyXG4gICAgICAgICAgICByZW5kZXJUb2RvRGlzcGxheShwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhZGRUb2RvTm90ZXNIYW5kbGVyID0gKGUsIHByb2plY3RJbmRleCwgdG9kb0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnZhbHVlKVxyXG4gICAgICAgICAgICBsZXQgdmFsID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCB0b2RvTGlzdCA9IHByb2plY3RzRGF0YVtwcm9qZWN0SW5kZXhdO1xyXG4gICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codG9kb0xpc3QpO1xyXG4gICAgICAgICAgICB0b2RvTGlzdC5hZGRUb2RvTm90ZXModG9kb0luZGV4LCB2YWwpXHJcbiAgICAgICAgICAgIHJlbmRlclRvZG9EaXNwbGF5KHByb2plY3RJbmRleCwgdG9kb0luZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlbmRlclByb2plY3RzSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcHJvamVjdHMuYWRkVG9kb0xpc3QocHJvamVjdHNUaXRsZUlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdHMoKTtcclxuICAgICAgICAgICAgcHJvamVjdHNUaXRsZUZvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICBtb2RhbC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVuZGVyVG9kb3NIYW5kbGVyID0gKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYWRkVG9kb0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdG9kby1pbnB1dFwiKVxyXG4gICAgICAgICAgICBjb25zdCB0b2RvTGlzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRvZG9MaXN0RWwuaWQ7XHJcbiAgICAgICAgICAgIGxldCB0b2RvVmFsID0gYWRkVG9kb0lucHV0LnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgdG9kb2xpc3QgPSBwcm9qZWN0c0RhdGFbaW5kZXhdO1xyXG4gICAgICAgICAgICB0b2RvbGlzdC5hZGRUb2RvKHRvZG9WYWwpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2RvcyhpbmRleCk7XHJcbiAgICAgICAgICAgIGFkZFRvZG9JbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWxldGVQcm9qZWN0SGFuZGxlciA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0cy5kZWxldGVUb2RvTGlzdChpbmRleCk7XHJcbiAgICAgICAgICAgIHByb2plY3RMYWJlbC5wbGFjZWhvbGRlciA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJlbmRlclByb2plY3RzKCk7XHJcbiAgICAgICAgICAgIHJlbmRlclRvZG9zKGluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZVByaW9yaXR5SGFuZGxlciA9IChwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFByb2plY3QgPSBwcm9qZWN0cy5nZXRDdXJyZW50UHJvamVjdChwcm9qZWN0SW5kZXgpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0KTtcclxuICAgICAgICAgICAgY3VycmVudFByb2plY3Quc2V0VG9kb1ByaW9yaXR5KHRvZG9JbmRleCk7XHJcbiAgICAgICAgICAgIHJlbmRlclRvZG9zKHByb2plY3RJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9qZWN0RGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gZGVsZXRlUHJvamVjdEhhbmRsZXIoZS50YXJnZXQuaWQpKTtcclxuXHJcbiAgICAgICAgcHJvamVjdHNBZGRFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IG1vZGFsLnNob3dNb2RhbCgpKTtcclxuXHJcbiAgICAgICAgY2FuY2VsUHJvamVjdERpYWxvZ0JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IG1vZGFsLmNsb3NlKCkpO1xyXG5cclxuICAgICAgICBwcm9qZWN0c1RpdGxlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHJlbmRlclByb2plY3RzSGFuZGxlcilcclxuXHJcbiAgICAgICAgYWRkVG9kb0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW5kZXJUb2Rvc0hhbmRsZXIpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlCdG4gPSBlLnRhcmdldC5tYXRjaGVzKFwiLnByaW9yaXR5LWJ0blwiKTtcclxuICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmlvcml0eS1idG5cIik7XHJcbiAgICAgICAgICAgIGlmIChwcmlvcml0eUJ0bikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvZG9JbmRleCA9IGJ0bi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVQcmlvcml0eUhhbmRsZXIodG9kb0xpc3RFbC5pZCwgdG9kb0luZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b2RvQ29tcGxldGVNYXRjaCA9IGUudGFyZ2V0Lm1hdGNoZXMoXCIudG9kby1jb21wbGV0ZS1idG5cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvZG9Db21wbGV0ZUJ0biA9IGUudGFyZ2V0O1xyXG4gICAgICAgICAgICBpZiAodG9kb0NvbXBsZXRlTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2RvSW5kZXggPSB0b2RvQ29tcGxldGVCdG4ucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b2RvSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGVUb2RvaGFuZGxlcih0b2RvTGlzdEVsLmlkLCB0b2RvSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvZG9Ob3Rlc0VsID0gZS50YXJnZXQubWF0Y2hlcyhcIi50b2RvLW5vdGVzXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0eHRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLW5vdGVzXCIpXHJcbiAgICAgICAgICAgIGlmICh0b2RvTm90ZXNFbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvZG9JbmRleCA9IHR4dEFyZWEucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgICAgICAgICAgYWRkVG9kb05vdGVzSGFuZGxlcihlLCB0b2RvTGlzdEVsLmlkLCB0b2RvSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBlLnRhcmdldC5tYXRjaGVzKFwiLnRvZG8tZGF0ZVwiKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWRhdGVcIik7XHJcbiAgICAgICAgICAgIGlmIChkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9kb0luZGV4ID0gZGF0ZUVsLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICAgICAgICAgIHNldFRvZG9EYXRlSGFuZGxlcihlLCB0b2RvTGlzdEVsLmlkLCB0b2RvSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvZG8gPSBlLnRhcmdldC5tYXRjaGVzKFwiLnRvZG8tdGl0bGUtaW5wdXRcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvZG9UaXRsZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLXRpdGxlLWlucHV0XCIpO1xyXG4gICAgICAgICAgICBpZiAodG9kbykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvZG9JbmRleCA9IHRvZG9UaXRsZUVsLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICAgICAgICAgIGVkaXRUb2RvSGFuZGxlcihlLCB0b2RvTGlzdEVsLmlkLCB0b2RvSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvZG9saXN0ID0gZS50YXJnZXQubWF0Y2hlcyhcIi50b2RvLWxpc3QtdGl0bGUtaW5wdXRcIik7XHJcbiAgICAgICAgICAgIGlmICh0b2RvbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgZWRpdFByb2plY3RUaXRsZShlLCB0b2RvTGlzdEVsLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIGNvbnN0IG5vblJlbmRlcmVkRXZlbnRIYW5kbGluZyA9IChlbE1hdGNoLCBlbCwgaGFuZGxlciwgZSwgY2xhc3NOYW1lKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGVsTWF0Y2ggPSBlLnRhcmdldC5tYXRjaGVzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpO1xyXG4gICAgICAgIC8vICAgICBpZiAoZWxNYXRjaCkge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHRvZG9JbmRleCA9IGVsLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICAvLyAgICAgICAgIGhhbmRsZXIoZSwgdG9kb0xpc3RFbC5pZCwgdG9kb0luZGV4KVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBFdmVudHNDb250cm9sbGVyKCk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgVmlld0NvbnRyb2xsZXIgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9kb0xpc3QgfSBmcm9tIFwiLi9Ub2RvTGlzdFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0cyB9IGZyb20gXCIuL1Byb2plY3RzXCI7XHJcbmltcG9ydCB7IFZpZXdDb250cm9sbGVyIH0gZnJvbSBcIi4vVmlld0NvbnRyb2xsZXJcIjtcclxuXHJcblxyXG4vLyBjb25zdCBsaXN0ID0gbmV3IFRvZG9MaXN0KFwiRmlyc3QgbGlzdFwiKTtcclxuLy8gbGlzdC5hZGRUb2RvKFwiaGVsbG9cIik7XHJcbi8vIGxpc3QuYWRkVG9kbyhcIndvcmxkXCIpO1xyXG4vLyBsaXN0LmVkaXRUb2RvKDEsIFwiYWdhaW5cIik7XHJcbi8vIC8vIGNvbnNvbGUubG9nKGxpc3QpO1xyXG4vLyAvLyBsaXN0LmRlbGV0ZVRvZG8oMSk7XHJcbi8vIGNvbnNvbGUubG9nKGxpc3QpO1xyXG4vLyBjb25zdCBsaXN0VHdvID0gbmV3IFRvZG9MaXN0KFwiU2Vjb25kIGxpc3RcIik7XHJcbi8vIGxpc3RUd28uYWRkVG9kbyhcIm51bWJlcjJcIilcclxuLy8gbGlzdFR3by5zZXRUb2RvUHJpb3JpdHkoMCwgXCJJbXBvcnRhbnRcIik7XHJcbi8vIGxpc3RUd28uc2V0RHVlRGF0ZSgwLCBEYXRlLm5vdygpKTtcclxuLy8gY29uc29sZS5sb2cobGlzdFR3byk7XHJcblxyXG4vLyBsZXQgcHJvamVjdHMgPSBuZXcgUHJvamVjdHMoKTtcclxuLy8gcHJvamVjdHMuYWRkVG9kb0xpc3QobGlzdCk7XHJcbi8vIHByb2plY3RzLmFkZFRvZG9MaXN0KGxpc3RUd28pXHJcbi8vIGNvbnNvbGUubG9nKHByb2plY3RzKTtcclxuXHJcblZpZXdDb250cm9sbGVyKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==