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
        this.dueDate = new Date().toISOString(),
        this.priority = "",
        this.notes = "",
        this.isComplete = false;
        this.id;
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
        this.id;
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

    editTodo(id, title) {
        let todo = this.todos.find((todo, index) => index === id);
        todo.title = title;
        return this.todos;
    }

    setTodoPriority(id, priority) {
        id = parseInt(id);
        console.log(id, priority, this.todos);
        let todo = this.todos.find((todo, index) => index === id);
        todo.priority = priority;
        return this.todos;
    }

    setDueDate(id, date = new Date().toISOString()) {
        let todo = this.todos.find((todo, index) => index === id);
        todo.dueDate = date;
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
    
    const renderTodos = (projectIndex) => {
        todoListEl.innerHTML = ""
        let project = projectsData[projectIndex];
        project.todos.forEach((todo, index) => {
            let divEl = document.createElement("div");
            let deleteTodoEl = document.createElement("button");
            deleteTodoEl.textContent = "X";
            deleteTodoEl.setAttribute("id", `${index}`);
            deleteTodoEl.addEventListener("click", function(e) {
                deleteTodohandler(e, projectIndex);
            })
            divEl.setAttribute("id", `${index}`);
            divEl.classList.add("todo-item");
            divEl.textContent = todo.title;
            renderPriority(todo, divEl);
            divEl.addEventListener("click", function(e) {
                displayTodoInfo(todoListEl.id, index);
                selectedTodo(index);
            })
            todoListEl.appendChild(divEl);
            todoListEl.appendChild(deleteTodoEl);
        })
    }

    const defaultToFirstTodo = (todos, index) => {
        const todoContainerEl = document.querySelector(".todo-container");
        if (todos.length === 0) {
            todoContainerEl.style.display = "none";
        } else {
            displayTodoInfo(index, 0);
        }
    }

    const displayTodoInfo = (projectIndex, todoIndex) => {
        const todoTitleEl = document.querySelector(".todo-title-input");
        const todoEl = document.querySelector(".todo")
        todoEl.setAttribute("id", `${todoIndex}`);
        todoContainerEl.style.display = "block";
        let todos = projectsData[projectIndex].todos;
        let todo = todos[todoIndex];
        todoTitleEl.placeholder = todo.title;
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
        console.log(e.target.id);
        let todoIndex = e.target.id
        let project = projectsData[projectIndex];
        console.log(projectIndex);
        console.log(project);
        project.deleteTodo(todoIndex);
        // if (project.todos.length === 0) {
        //     hideTodoInfo();
        // }
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
            divEl.addEventListener("click", function() { 
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
        const projectLabel = document.querySelector(".todo-list-title-input");
        projectLabel.placeholder = projectsData[index].title;
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
        //Want to make these into toggles.
        const urgentBtn = document.querySelector("#urgent");
        const importantBtn = document.querySelector("#important");
        if (todo.priority === "urgent") {
            el.classList.add("urgent-border");
            urgentBtn.classList.add("urgent")
            if (importantBtn.classList.contains("important")) {
                importantBtn.classList.remove("important");
            }
        } else if (todo.priority === "important") {
            el.classList.add("important-border");
            importantBtn.classList.add("important")
            if (urgentBtn.classList.contains("urgent")) {
                urgentBtn.classList.remove("urgent");
            }
        }
    }

    function EventsController() {
        const addTodoEl = document.querySelector(".add-todo-btn");
        const projectsAddEl = document.querySelector("#projects-add");
        const projectsTitleForm = document.querySelector(".form");
        const projectsTitleInput = document.querySelector(".projects-title-input")
        const modal = document.querySelector("#dialog");
        const projectDeleteBtn = document.querySelector(".todo-list-delete-btn");
        const cancelProjectDialogBox = document.querySelector(".project-form-cancel-btn");
        const urgentBtn = document.querySelector("#urgent");
        const importantBtn = document.querySelector("#important");
        const todoEl = document.querySelector(".todo");
        const clearPriorityEl = document.querySelector("clear-priority");

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

        const deleteProjectHandler = () => {
            console.log("TEST");
            //Get current project
            
            //Is this project currently selected?
            //IF SO DELETE
            //RE RENDER ProJECTS
        }

        const updatePriorityHandler = (projectIndex, todoIndex, priority) => {
            let currentProject = projects.getCurrentProject(projectIndex)
            currentProject.setTodoPriority(todoIndex, priority);
            renderTodos(projectIndex);
        }

        const clearProrityhandler = () => {
            
        }


        projectDeleteBtn.addEventListener("click", (e) => deleteProjectHandler());

        projectsAddEl.addEventListener("click", (e) => modal.showModal());

        cancelProjectDialogBox.addEventListener("click", (e) => modal.close());

        projectsTitleForm.addEventListener("submit", renderProjectsHandler)
    
        addTodoEl.addEventListener("click", renderTodosHandler)

        urgentBtn.addEventListener("click", (e) => updatePriorityHandler(todoListEl.id, todoEl.id, "urgent"))
        importantBtn.addEventListener("click", (e) => updatePriorityHandler(todoListEl.id, todoEl.id, "important"))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsK0NBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1Y4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUNBQUk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ3NDO0FBQ3RDO0FBQ0E7QUFDQSx1QkFBdUIsK0NBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxNQUFNO0FBQ3JEO0FBQ0E7QUFDQSxhQUFhO0FBQ2Isd0NBQXdDLE1BQU07QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFVBQVU7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxNQUFNO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLE1BQU07QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzdNQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDQTtBQUNZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBYyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Qcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1ZpZXdDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2RvTGlzdCB9IGZyb20gXCIuL1RvZG9MaXN0XCI7XHJcbmNsYXNzIFByb2plY3RzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vQ29udGFpbnMgbGlzdCBvZiB0b2RvIGxpc3RzLlxyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvTGlzdCh0b2RvbGlzdCkge1xyXG4gICAgICAgIGxldCBsaXN0ID0gbmV3IFRvZG9MaXN0KHRvZG9saXN0KVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChsaXN0KVxyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVRvZG9MaXN0KGlkKSB7XHJcbiAgICAgICAgbGV0IG5ld1Byb2plY3RMaXN0ID0gdGhpcy5wcm9qZWN0cy5zcGxpY2UoaWQsIDEpO1xyXG4gICAgICAgIHJldHVybiBuZXdQcm9qZWN0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJyZW50UHJvamVjdChpbmRleCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9qZWN0cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUHJvamVjdHMgfSIsImNsYXNzIFRvZG8ge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXHJcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBcIlwiLFxyXG4gICAgICAgIHRoaXMubm90ZXMgPSBcIlwiLFxyXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRvZG8gfSIsImltcG9ydCB7IFRvZG8gfSBmcm9tIFwiLi9Ub2RvXCI7XHJcblxyXG5jbGFzcyBUb2RvTGlzdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLnRvZG9zID0gW107XHJcbiAgICAgICAgdGhpcy5pZDtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvKC4uLnRvZG8pIHtcclxuICAgICAgICBsZXQgbmV3VG9kbyA9IG5ldyBUb2RvKC4uLnRvZG8pO1xyXG4gICAgICAgIHRoaXMudG9kb3MucHVzaChuZXdUb2RvKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRvZG9zKVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVRvZG8oaWQpIHtcclxuICAgICAgICBsZXQgbmV3VG9kb0xpc3QgPSB0aGlzLnRvZG9zLnNwbGljZShpZCwgMSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1RvZG9MaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRUb2RvKGlkLCB0aXRsZSkge1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG9kb1ByaW9yaXR5KGlkLCBwcmlvcml0eSkge1xyXG4gICAgICAgIGlkID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlkLCBwcmlvcml0eSwgdGhpcy50b2Rvcyk7XHJcbiAgICAgICAgbGV0IHRvZG8gPSB0aGlzLnRvZG9zLmZpbmQoKHRvZG8sIGluZGV4KSA9PiBpbmRleCA9PT0gaWQpO1xyXG4gICAgICAgIHRvZG8ucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbiAgICBzZXREdWVEYXRlKGlkLCBkYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpKSB7XHJcbiAgICAgICAgbGV0IHRvZG8gPSB0aGlzLnRvZG9zLmZpbmQoKHRvZG8sIGluZGV4KSA9PiBpbmRleCA9PT0gaWQpO1xyXG4gICAgICAgIHRvZG8uZHVlRGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudFRvZG8oaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2Rvc1tpbmRleF07XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgVG9kb0xpc3QgfSIsImltcG9ydCB7IFByb2plY3RzIH0gZnJvbSBcIi4vUHJvamVjdHNcIjtcclxuXHJcbmZ1bmN0aW9uIFZpZXdDb250cm9sbGVyKCkge1xyXG4gICAgbGV0IHByb2plY3RzID0gbmV3IFByb2plY3RzKCk7XHJcbiAgICBsZXQgcHJvamVjdHNEYXRhID0gcHJvamVjdHMuZ2V0UHJvamVjdHMoKTtcclxuICAgIGNvbnN0IHRvZG9MaXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcclxuICAgIGNvbnN0IHRvZG9Db250YWluZXJFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1jb250YWluZXJcIik7XHJcbiAgICBcclxuICAgIGNvbnN0IHJlbmRlclRvZG9zID0gKHByb2plY3RJbmRleCkgPT4ge1xyXG4gICAgICAgIHRvZG9MaXN0RWwuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF07XHJcbiAgICAgICAgcHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGl2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBsZXQgZGVsZXRlVG9kb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgZGVsZXRlVG9kb0VsLnRleHRDb250ZW50ID0gXCJYXCI7XHJcbiAgICAgICAgICAgIGRlbGV0ZVRvZG9FbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICAgICAgZGVsZXRlVG9kb0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVUb2RvaGFuZGxlcihlLCBwcm9qZWN0SW5kZXgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBkaXZFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICAgICAgZGl2RWwuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcclxuICAgICAgICAgICAgZGl2RWwudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xyXG4gICAgICAgICAgICByZW5kZXJQcmlvcml0eSh0b2RvLCBkaXZFbCk7XHJcbiAgICAgICAgICAgIGRpdkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5VG9kb0luZm8odG9kb0xpc3RFbC5pZCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRUb2RvKGluZGV4KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdG9kb0xpc3RFbC5hcHBlbmRDaGlsZChkaXZFbCk7XHJcbiAgICAgICAgICAgIHRvZG9MaXN0RWwuYXBwZW5kQ2hpbGQoZGVsZXRlVG9kb0VsKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlZmF1bHRUb0ZpcnN0VG9kbyA9ICh0b2RvcywgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB0b2RvQ29udGFpbmVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGlmICh0b2Rvcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaXNwbGF5VG9kb0luZm8oaW5kZXgsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkaXNwbGF5VG9kb0luZm8gPSAocHJvamVjdEluZGV4LCB0b2RvSW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB0b2RvVGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby10aXRsZS1pbnB1dFwiKTtcclxuICAgICAgICBjb25zdCB0b2RvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9cIilcclxuICAgICAgICB0b2RvRWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7dG9kb0luZGV4fWApO1xyXG4gICAgICAgIHRvZG9Db250YWluZXJFbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGxldCB0b2RvcyA9IHByb2plY3RzRGF0YVtwcm9qZWN0SW5kZXhdLnRvZG9zO1xyXG4gICAgICAgIGxldCB0b2RvID0gdG9kb3NbdG9kb0luZGV4XTtcclxuICAgICAgICB0b2RvVGl0bGVFbC5wbGFjZWhvbGRlciA9IHRvZG8udGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGlkZVRvZG9JbmZvID0gKCkgPT4ge1xyXG4gICAgICAgIHRvZG9Db250YWluZXJFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRUb2RvID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9kb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvZG8taXRlbVwiKTtcclxuICAgICAgICB0b2Rvcy5mb3JFYWNoKHRvZG8gPT4ge1xyXG4gICAgICAgICAgICB0b2RvLmNsYXNzTGlzdC5yZW1vdmUoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdG9kb3NbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlbGV0ZVRvZG9oYW5kbGVyID0gKGUsIHByb2plY3RJbmRleCkgPT4ge1xyXG4gICAgICAgIC8vUHJvamVjdCBpbmRleCBhbmQgdG9kbyBpbmRleFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmlkKTtcclxuICAgICAgICBsZXQgdG9kb0luZGV4ID0gZS50YXJnZXQuaWRcclxuICAgICAgICBsZXQgcHJvamVjdCA9IHByb2plY3RzRGF0YVtwcm9qZWN0SW5kZXhdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RJbmRleCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdCk7XHJcbiAgICAgICAgcHJvamVjdC5kZWxldGVUb2RvKHRvZG9JbmRleCk7XHJcbiAgICAgICAgLy8gaWYgKHByb2plY3QudG9kb3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgLy8gICAgIGhpZGVUb2RvSW5mbygpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBoaWRlVG9kb0luZm8oKTtcclxuICAgICAgICByZW5kZXJUb2Rvcyhwcm9qZWN0SW5kZXgpO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIGNvbnN0IHJlbmRlclByb2plY3RzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0c1wiKTtcclxuICAgICAgICBwcm9qZWN0c0Rpdi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIGxldCBwcm9qZWN0cyA9IHByb2plY3RzRGF0YS5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGl2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBkaXZFbC50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XHJcbiAgICAgICAgICAgIGRpdkVsLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xyXG4gICAgICAgICAgICBkaXZFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICAgICAgZGl2RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkgeyBcclxuICAgICAgICAgICAgICAgIHJlbmRlclByb2plY3QoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0KGluZGV4KTtcclxuICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChkaXZFbClcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0gXHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIHRvZG9MaXN0RWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICAgICAgcmVuZGVyUHJvamVjdExhYmVsKGluZGV4KTtcclxuICAgICAgICByZW5kZXJUb2RvcyhpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdExhYmVsID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdExhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3QtdGl0bGUtaW5wdXRcIik7XHJcbiAgICAgICAgcHJvamVjdExhYmVsLnBsYWNlaG9sZGVyID0gcHJvamVjdHNEYXRhW2luZGV4XS50aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XHJcbiAgICAgICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICAgICAgcHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKFwicHJvamVjdC1zZWxlY3RlZFwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHByb2plY3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1zZWxlY3RlZFwiKTtcclxuICAgICAgICBkZWZhdWx0VG9GaXJzdFRvZG8ocHJvamVjdHNEYXRhW2luZGV4XS50b2RvcywgaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlclByaW9yaXR5ID0gKHRvZG8sIGVsKSA9PiB7XHJcbiAgICAgICAgLy9XYW50IHRvIG1ha2UgdGhlc2UgaW50byB0b2dnbGVzLlxyXG4gICAgICAgIGNvbnN0IHVyZ2VudEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXJnZW50XCIpO1xyXG4gICAgICAgIGNvbnN0IGltcG9ydGFudEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW1wb3J0YW50XCIpO1xyXG4gICAgICAgIGlmICh0b2RvLnByaW9yaXR5ID09PSBcInVyZ2VudFwiKSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJ1cmdlbnQtYm9yZGVyXCIpO1xyXG4gICAgICAgICAgICB1cmdlbnRCdG4uY2xhc3NMaXN0LmFkZChcInVyZ2VudFwiKVxyXG4gICAgICAgICAgICBpZiAoaW1wb3J0YW50QnRuLmNsYXNzTGlzdC5jb250YWlucyhcImltcG9ydGFudFwiKSkge1xyXG4gICAgICAgICAgICAgICAgaW1wb3J0YW50QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJpbXBvcnRhbnRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRvZG8ucHJpb3JpdHkgPT09IFwiaW1wb3J0YW50XCIpIHtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImltcG9ydGFudC1ib3JkZXJcIik7XHJcbiAgICAgICAgICAgIGltcG9ydGFudEJ0bi5jbGFzc0xpc3QuYWRkKFwiaW1wb3J0YW50XCIpXHJcbiAgICAgICAgICAgIGlmICh1cmdlbnRCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwidXJnZW50XCIpKSB7XHJcbiAgICAgICAgICAgICAgICB1cmdlbnRCdG4uY2xhc3NMaXN0LnJlbW92ZShcInVyZ2VudFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBFdmVudHNDb250cm9sbGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGFkZFRvZG9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRvZG8tYnRuXCIpO1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RzQWRkRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzLWFkZFwiKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0c1RpdGxlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybVwiKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0c1RpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzLXRpdGxlLWlucHV0XCIpXHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RpYWxvZ1wiKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0RGVsZXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3QtZGVsZXRlLWJ0blwiKTtcclxuICAgICAgICBjb25zdCBjYW5jZWxQcm9qZWN0RGlhbG9nQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWZvcm0tY2FuY2VsLWJ0blwiKTtcclxuICAgICAgICBjb25zdCB1cmdlbnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VyZ2VudFwiKTtcclxuICAgICAgICBjb25zdCBpbXBvcnRhbnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ltcG9ydGFudFwiKTtcclxuICAgICAgICBjb25zdCB0b2RvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9cIik7XHJcbiAgICAgICAgY29uc3QgY2xlYXJQcmlvcml0eUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNsZWFyLXByaW9yaXR5XCIpO1xyXG5cclxuICAgICAgICBjb25zdCByZW5kZXJQcm9qZWN0c0hhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHByb2plY3RzLmFkZFRvZG9MaXN0KHByb2plY3RzVGl0bGVJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHJlbmRlclByb2plY3RzKCk7XHJcbiAgICAgICAgICAgIHByb2plY3RzVGl0bGVGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgbW9kYWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjb25zdCByZW5kZXJUb2Rvc0hhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhZGRUb2RvSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWlucHV0XCIpXHJcbiAgICAgICAgICAgIGNvbnN0IHRvZG9MaXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdG9kb0xpc3RFbC5pZDtcclxuICAgICAgICAgICAgbGV0IHRvZG9WYWwgPSBhZGRUb2RvSW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCB0b2RvbGlzdCA9IHByb2plY3RzRGF0YVtpbmRleF07XHJcbiAgICAgICAgICAgIHRvZG9saXN0LmFkZFRvZG8odG9kb1ZhbCk7XHJcbiAgICAgICAgICAgIHJlbmRlclRvZG9zKGluZGV4KTtcclxuICAgICAgICAgICAgYWRkVG9kb0lucHV0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRFU1RcIik7XHJcbiAgICAgICAgICAgIC8vR2V0IGN1cnJlbnQgcHJvamVjdFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9JcyB0aGlzIHByb2plY3QgY3VycmVudGx5IHNlbGVjdGVkP1xyXG4gICAgICAgICAgICAvL0lGIFNPIERFTEVURVxyXG4gICAgICAgICAgICAvL1JFIFJFTkRFUiBQcm9KRUNUU1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlUHJpb3JpdHlIYW5kbGVyID0gKHByb2plY3RJbmRleCwgdG9kb0luZGV4LCBwcmlvcml0eSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFByb2plY3QgPSBwcm9qZWN0cy5nZXRDdXJyZW50UHJvamVjdChwcm9qZWN0SW5kZXgpXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0LnNldFRvZG9Qcmlvcml0eSh0b2RvSW5kZXgsIHByaW9yaXR5KTtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb3MocHJvamVjdEluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNsZWFyUHJvcml0eWhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByb2plY3REZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBkZWxldGVQcm9qZWN0SGFuZGxlcigpKTtcclxuXHJcbiAgICAgICAgcHJvamVjdHNBZGRFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IG1vZGFsLnNob3dNb2RhbCgpKTtcclxuXHJcbiAgICAgICAgY2FuY2VsUHJvamVjdERpYWxvZ0JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IG1vZGFsLmNsb3NlKCkpO1xyXG5cclxuICAgICAgICBwcm9qZWN0c1RpdGxlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHJlbmRlclByb2plY3RzSGFuZGxlcilcclxuICAgIFxyXG4gICAgICAgIGFkZFRvZG9FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVuZGVyVG9kb3NIYW5kbGVyKVxyXG5cclxuICAgICAgICB1cmdlbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB1cGRhdGVQcmlvcml0eUhhbmRsZXIodG9kb0xpc3RFbC5pZCwgdG9kb0VsLmlkLCBcInVyZ2VudFwiKSlcclxuICAgICAgICBpbXBvcnRhbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB1cGRhdGVQcmlvcml0eUhhbmRsZXIodG9kb0xpc3RFbC5pZCwgdG9kb0VsLmlkLCBcImltcG9ydGFudFwiKSlcclxuICAgIH1cclxuXHJcbiAgICBFdmVudHNDb250cm9sbGVyKCk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgVmlld0NvbnRyb2xsZXIgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9kb0xpc3QgfSBmcm9tIFwiLi9Ub2RvTGlzdFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0cyB9IGZyb20gXCIuL1Byb2plY3RzXCI7XHJcbmltcG9ydCB7IFZpZXdDb250cm9sbGVyIH0gZnJvbSBcIi4vVmlld0NvbnRyb2xsZXJcIjtcclxuXHJcblxyXG4vLyBjb25zdCBsaXN0ID0gbmV3IFRvZG9MaXN0KFwiRmlyc3QgbGlzdFwiKTtcclxuLy8gbGlzdC5hZGRUb2RvKFwiaGVsbG9cIik7XHJcbi8vIGxpc3QuYWRkVG9kbyhcIndvcmxkXCIpO1xyXG4vLyBsaXN0LmVkaXRUb2RvKDEsIFwiYWdhaW5cIik7XHJcbi8vIC8vIGNvbnNvbGUubG9nKGxpc3QpO1xyXG4vLyAvLyBsaXN0LmRlbGV0ZVRvZG8oMSk7XHJcbi8vIGNvbnNvbGUubG9nKGxpc3QpO1xyXG4vLyBjb25zdCBsaXN0VHdvID0gbmV3IFRvZG9MaXN0KFwiU2Vjb25kIGxpc3RcIik7XHJcbi8vIGxpc3RUd28uYWRkVG9kbyhcIm51bWJlcjJcIilcclxuLy8gbGlzdFR3by5zZXRUb2RvUHJpb3JpdHkoMCwgXCJJbXBvcnRhbnRcIik7XHJcbi8vIGxpc3RUd28uc2V0RHVlRGF0ZSgwLCBEYXRlLm5vdygpKTtcclxuLy8gY29uc29sZS5sb2cobGlzdFR3byk7XHJcblxyXG4vLyBsZXQgcHJvamVjdHMgPSBuZXcgUHJvamVjdHMoKTtcclxuLy8gcHJvamVjdHMuYWRkVG9kb0xpc3QobGlzdCk7XHJcbi8vIHByb2plY3RzLmFkZFRvZG9MaXN0KGxpc3RUd28pXHJcbi8vIGNvbnNvbGUubG9nKHByb2plY3RzKTtcclxuXHJcblZpZXdDb250cm9sbGVyKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==