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

        //If the priority is urgent we add selected class
        //If user changes to important, we re-add urgent class and add selected to important class

        const urgentBtn = document.querySelector(".urgent");
        const importantBtn = document.querySelector(".important");
        if (todo.priority === "urgent") {
            el.classList.add("urgent-border");
            urgentBtn.classList.add("priority-btn-selected")
            if (importantBtn.classList.contains("priority-btn-selected")) {
                importantBtn.classList.remove("priority-btn-selected");
            }
        } else if (todo.priority === "important") {
            el.classList.add("important-border");
             importantBtn.classList.add("priority-btn-selected")
             if (urgentBtn.classList.contains("priority-btn-selected")) {
                urgentBtn.classList.remove("priority-btn-selected");
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
        const urgentBtn = document.querySelector(".urgent");
        const importantBtn = document.querySelector(".important");
        const todoEl = document.querySelector(".todo");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsK0NBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1Y4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUNBQUk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ3NDO0FBQ3RDO0FBQ0E7QUFDQSx1QkFBdUIsK0NBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxNQUFNO0FBQ3JEO0FBQ0E7QUFDQSxhQUFhO0FBQ2Isd0NBQXdDLE1BQU07QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFVBQVU7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxNQUFNO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLE1BQU07QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDM01BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05zQztBQUNBO0FBQ1k7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Ub2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Ub2RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVmlld0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRvZG9MaXN0IH0gZnJvbSBcIi4vVG9kb0xpc3RcIjtcclxuY2xhc3MgUHJvamVjdHMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy9Db250YWlucyBsaXN0IG9mIHRvZG8gbGlzdHMuXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRvZG9MaXN0KHRvZG9saXN0KSB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBuZXcgVG9kb0xpc3QodG9kb2xpc3QpXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKGxpc3QpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVG9kb0xpc3QoaWQpIHtcclxuICAgICAgICBsZXQgbmV3UHJvamVjdExpc3QgPSB0aGlzLnByb2plY3RzLnNwbGljZShpZCwgMSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1Byb2plY3RMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRQcm9qZWN0KGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByb2plY3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBQcm9qZWN0cyB9IiwiY2xhc3MgVG9kbyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IFwiXCIsXHJcbiAgICAgICAgdGhpcy5ub3RlcyA9IFwiXCIsXHJcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pZDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVG9kbyB9IiwiaW1wb3J0IHsgVG9kbyB9IGZyb20gXCIuL1RvZG9cIjtcclxuXHJcbmNsYXNzIFRvZG9MaXN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlLFxyXG4gICAgICAgIHRoaXMudG9kb3MgPSBbXTtcclxuICAgICAgICB0aGlzLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRvZG8oLi4udG9kbykge1xyXG4gICAgICAgIGxldCBuZXdUb2RvID0gbmV3IFRvZG8oLi4udG9kbyk7XHJcbiAgICAgICAgdGhpcy50b2Rvcy5wdXNoKG5ld1RvZG8pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudG9kb3MpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVG9kbyhpZCkge1xyXG4gICAgICAgIGxldCBuZXdUb2RvTGlzdCA9IHRoaXMudG9kb3Muc3BsaWNlKGlkLCAxKTtcclxuICAgICAgICByZXR1cm4gbmV3VG9kb0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFRvZG8oaWQsIHRpdGxlKSB7XHJcbiAgICAgICAgbGV0IHRvZG8gPSB0aGlzLnRvZG9zLmZpbmQoKHRvZG8sIGluZGV4KSA9PiBpbmRleCA9PT0gaWQpO1xyXG4gICAgICAgIHRvZG8udGl0bGUgPSB0aXRsZTtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRUb2RvUHJpb3JpdHkoaWQsIHByaW9yaXR5KSB7XHJcbiAgICAgICAgaWQgPSBwYXJzZUludChpZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaWQsIHByaW9yaXR5LCB0aGlzLnRvZG9zKTtcclxuICAgICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb3MuZmluZCgodG9kbywgaW5kZXgpID0+IGluZGV4ID09PSBpZCk7XHJcbiAgICAgICAgdG9kby5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHNldER1ZURhdGUoaWQsIGRhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpIHtcclxuICAgICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb3MuZmluZCgodG9kbywgaW5kZXgpID0+IGluZGV4ID09PSBpZCk7XHJcbiAgICAgICAgdG9kby5kdWVEYXRlID0gZGF0ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJyZW50VG9kbyhpbmRleCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zW2luZGV4XTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBUb2RvTGlzdCB9IiwiaW1wb3J0IHsgUHJvamVjdHMgfSBmcm9tIFwiLi9Qcm9qZWN0c1wiO1xyXG5cclxuZnVuY3Rpb24gVmlld0NvbnRyb2xsZXIoKSB7XHJcbiAgICBsZXQgcHJvamVjdHMgPSBuZXcgUHJvamVjdHMoKTtcclxuICAgIGxldCBwcm9qZWN0c0RhdGEgPSBwcm9qZWN0cy5nZXRQcm9qZWN0cygpO1xyXG4gICAgY29uc3QgdG9kb0xpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xyXG4gICAgY29uc3QgdG9kb0NvbnRhaW5lckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWNvbnRhaW5lclwiKTtcclxuICAgIFxyXG4gICAgY29uc3QgcmVuZGVyVG9kb3MgPSAocHJvamVjdEluZGV4KSA9PiB7XHJcbiAgICAgICAgdG9kb0xpc3RFbC5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XTtcclxuICAgICAgICBwcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkaXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGxldCBkZWxldGVUb2RvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBkZWxldGVUb2RvRWwudGV4dENvbnRlbnQgPSBcIlhcIjtcclxuICAgICAgICAgICAgZGVsZXRlVG9kb0VsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgICAgICAgICBkZWxldGVUb2RvRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZVRvZG9oYW5kbGVyKGUsIHByb2plY3RJbmRleCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGRpdkVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgICAgICAgICBkaXZFbC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpO1xyXG4gICAgICAgICAgICBkaXZFbC50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XHJcbiAgICAgICAgICAgIHJlbmRlclByaW9yaXR5KHRvZG8sIGRpdkVsKTtcclxuICAgICAgICAgICAgZGl2RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlUb2RvSW5mbyh0b2RvTGlzdEVsLmlkLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRvZG8oaW5kZXgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0b2RvTGlzdEVsLmFwcGVuZENoaWxkKGRpdkVsKTtcclxuICAgICAgICAgICAgdG9kb0xpc3RFbC5hcHBlbmRDaGlsZChkZWxldGVUb2RvRWwpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVmYXVsdFRvRmlyc3RUb2RvID0gKHRvZG9zLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRvZG9Db250YWluZXJFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1jb250YWluZXJcIik7XHJcbiAgICAgICAgaWYgKHRvZG9zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0b2RvQ29udGFpbmVyRWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXlUb2RvSW5mbyhpbmRleCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlUb2RvSW5mbyA9IChwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRvZG9UaXRsZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLXRpdGxlLWlucHV0XCIpO1xyXG4gICAgICAgIGNvbnN0IHRvZG9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb1wiKVxyXG4gICAgICAgIHRvZG9FbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHt0b2RvSW5kZXh9YCk7XHJcbiAgICAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgbGV0IHRvZG9zID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF0udG9kb3M7XHJcbiAgICAgICAgbGV0IHRvZG8gPSB0b2Rvc1t0b2RvSW5kZXhdO1xyXG4gICAgICAgIHRvZG9UaXRsZUVsLnBsYWNlaG9sZGVyID0gdG9kby50aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoaWRlVG9kb0luZm8gPSAoKSA9PiB7XHJcbiAgICAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZFRvZG8gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB0b2RvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1pdGVtXCIpO1xyXG4gICAgICAgIHRvZG9zLmZvckVhY2godG9kbyA9PiB7XHJcbiAgICAgICAgICAgIHRvZG8uY2xhc3NMaXN0LnJlbW92ZShcInByb2plY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0b2Rvc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInByb2plY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVsZXRlVG9kb2hhbmRsZXIgPSAoZSwgcHJvamVjdEluZGV4KSA9PiB7XHJcbiAgICAgICAgLy9Qcm9qZWN0IGluZGV4IGFuZCB0b2RvIGluZGV4XHJcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQuaWQpO1xyXG4gICAgICAgIGxldCB0b2RvSW5kZXggPSBlLnRhcmdldC5pZFxyXG4gICAgICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF07XHJcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdEluZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0KTtcclxuICAgICAgICBwcm9qZWN0LmRlbGV0ZVRvZG8odG9kb0luZGV4KTtcclxuICAgICAgICAvLyBpZiAocHJvamVjdC50b2Rvcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAvLyAgICAgaGlkZVRvZG9JbmZvKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGhpZGVUb2RvSW5mbygpO1xyXG4gICAgICAgIHJlbmRlclRvZG9zKHByb2plY3RJbmRleCk7XHJcbiAgICB9ICAgXHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzXCIpO1xyXG4gICAgICAgIHByb2plY3RzRGl2LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHByb2plY3RzID0gcHJvamVjdHNEYXRhLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkaXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGRpdkVsLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgICAgICAgICAgZGl2RWwuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XHJcbiAgICAgICAgICAgIGRpdkVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgICAgICAgICBkaXZFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7IFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFByb2plY3QoaW5kZXgpO1xyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHByb2plY3RzRGl2LmFwcGVuZENoaWxkKGRpdkVsKVxyXG4gICAgICAgICAgICByZW5kZXJQcm9qZWN0KGluZGV4KTtcclxuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0KGluZGV4KTtcclxuICAgICAgICB9KVxyXG4gICAgfSBcclxuXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgdG9kb0xpc3RFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICByZW5kZXJQcm9qZWN0TGFiZWwoaW5kZXgpO1xyXG4gICAgICAgIHJlbmRlclRvZG9zKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0TGFiZWwgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdC10aXRsZS1pbnB1dFwiKTtcclxuICAgICAgICBwcm9qZWN0TGFiZWwucGxhY2Vob2xkZXIgPSBwcm9qZWN0c0RhdGFbaW5kZXhdLnRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcclxuICAgICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcHJvamVjdHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgIGRlZmF1bHRUb0ZpcnN0VG9kbyhwcm9qZWN0c0RhdGFbaW5kZXhdLnRvZG9zLCBpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJpb3JpdHkgPSAodG9kbywgZWwpID0+IHtcclxuXHJcbiAgICAgICAgLy9JZiB0aGUgcHJpb3JpdHkgaXMgdXJnZW50IHdlIGFkZCBzZWxlY3RlZCBjbGFzc1xyXG4gICAgICAgIC8vSWYgdXNlciBjaGFuZ2VzIHRvIGltcG9ydGFudCwgd2UgcmUtYWRkIHVyZ2VudCBjbGFzcyBhbmQgYWRkIHNlbGVjdGVkIHRvIGltcG9ydGFudCBjbGFzc1xyXG5cclxuICAgICAgICBjb25zdCB1cmdlbnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVyZ2VudFwiKTtcclxuICAgICAgICBjb25zdCBpbXBvcnRhbnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmltcG9ydGFudFwiKTtcclxuICAgICAgICBpZiAodG9kby5wcmlvcml0eSA9PT0gXCJ1cmdlbnRcIikge1xyXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwidXJnZW50LWJvcmRlclwiKTtcclxuICAgICAgICAgICAgdXJnZW50QnRuLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eS1idG4tc2VsZWN0ZWRcIilcclxuICAgICAgICAgICAgaWYgKGltcG9ydGFudEJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmlvcml0eS1idG4tc2VsZWN0ZWRcIikpIHtcclxuICAgICAgICAgICAgICAgIGltcG9ydGFudEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwicHJpb3JpdHktYnRuLXNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b2RvLnByaW9yaXR5ID09PSBcImltcG9ydGFudFwiKSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJpbXBvcnRhbnQtYm9yZGVyXCIpO1xyXG4gICAgICAgICAgICAgaW1wb3J0YW50QnRuLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eS1idG4tc2VsZWN0ZWRcIilcclxuICAgICAgICAgICAgIGlmICh1cmdlbnRCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJpb3JpdHktYnRuLXNlbGVjdGVkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB1cmdlbnRCdG4uY2xhc3NMaXN0LnJlbW92ZShcInByaW9yaXR5LWJ0bi1zZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBFdmVudHNDb250cm9sbGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGFkZFRvZG9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRvZG8tYnRuXCIpO1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RzQWRkRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzLWFkZFwiKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0c1RpdGxlRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybVwiKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0c1RpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzLXRpdGxlLWlucHV0XCIpXHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RpYWxvZ1wiKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0RGVsZXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3QtZGVsZXRlLWJ0blwiKTtcclxuICAgICAgICBjb25zdCBjYW5jZWxQcm9qZWN0RGlhbG9nQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWZvcm0tY2FuY2VsLWJ0blwiKTtcclxuICAgICAgICBjb25zdCB1cmdlbnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVyZ2VudFwiKTtcclxuICAgICAgICBjb25zdCBpbXBvcnRhbnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmltcG9ydGFudFwiKTtcclxuICAgICAgICBjb25zdCB0b2RvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9cIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlbmRlclByb2plY3RzSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcHJvamVjdHMuYWRkVG9kb0xpc3QocHJvamVjdHNUaXRsZUlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdHMoKTtcclxuICAgICAgICAgICAgcHJvamVjdHNUaXRsZUZvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICBtb2RhbC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNvbnN0IHJlbmRlclRvZG9zSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFRvZG9JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRvZG8taW5wdXRcIilcclxuICAgICAgICAgICAgY29uc3QgdG9kb0xpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0b2RvTGlzdEVsLmlkO1xyXG4gICAgICAgICAgICBsZXQgdG9kb1ZhbCA9IGFkZFRvZG9JbnB1dC52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IHRvZG9saXN0ID0gcHJvamVjdHNEYXRhW2luZGV4XTtcclxuICAgICAgICAgICAgdG9kb2xpc3QuYWRkVG9kbyh0b2RvVmFsKTtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb3MoaW5kZXgpO1xyXG4gICAgICAgICAgICBhZGRUb2RvSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVsZXRlUHJvamVjdEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVEVTVFwiKTtcclxuICAgICAgICAgICAgLy9HZXQgY3VycmVudCBwcm9qZWN0XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL0lzIHRoaXMgcHJvamVjdCBjdXJyZW50bHkgc2VsZWN0ZWQ/XHJcbiAgICAgICAgICAgIC8vSUYgU08gREVMRVRFXHJcbiAgICAgICAgICAgIC8vUkUgUkVOREVSIFByb0pFQ1RTXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cGRhdGVQcmlvcml0eUhhbmRsZXIgPSAocHJvamVjdEluZGV4LCB0b2RvSW5kZXgsIHByaW9yaXR5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdCA9IHByb2plY3RzLmdldEN1cnJlbnRQcm9qZWN0KHByb2plY3RJbmRleClcclxuICAgICAgICAgICAgY3VycmVudFByb2plY3Quc2V0VG9kb1ByaW9yaXR5KHRvZG9JbmRleCwgcHJpb3JpdHkpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2Rvcyhwcm9qZWN0SW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByb2plY3REZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBkZWxldGVQcm9qZWN0SGFuZGxlcigpKTtcclxuXHJcbiAgICAgICAgcHJvamVjdHNBZGRFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IG1vZGFsLnNob3dNb2RhbCgpKTtcclxuXHJcbiAgICAgICAgY2FuY2VsUHJvamVjdERpYWxvZ0JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IG1vZGFsLmNsb3NlKCkpO1xyXG5cclxuICAgICAgICBwcm9qZWN0c1RpdGxlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHJlbmRlclByb2plY3RzSGFuZGxlcilcclxuICAgIFxyXG4gICAgICAgIGFkZFRvZG9FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVuZGVyVG9kb3NIYW5kbGVyKVxyXG5cclxuICAgICAgICB1cmdlbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB1cGRhdGVQcmlvcml0eUhhbmRsZXIodG9kb0xpc3RFbC5pZCwgdG9kb0VsLmlkLCBcInVyZ2VudFwiKSlcclxuICAgICAgICBpbXBvcnRhbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB1cGRhdGVQcmlvcml0eUhhbmRsZXIodG9kb0xpc3RFbC5pZCwgdG9kb0VsLmlkLCBcImltcG9ydGFudFwiKSlcclxuICAgIH1cclxuXHJcbiAgICBFdmVudHNDb250cm9sbGVyKCk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgVmlld0NvbnRyb2xsZXIgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9kb0xpc3QgfSBmcm9tIFwiLi9Ub2RvTGlzdFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0cyB9IGZyb20gXCIuL1Byb2plY3RzXCI7XHJcbmltcG9ydCB7IFZpZXdDb250cm9sbGVyIH0gZnJvbSBcIi4vVmlld0NvbnRyb2xsZXJcIjtcclxuXHJcblxyXG4vLyBjb25zdCBsaXN0ID0gbmV3IFRvZG9MaXN0KFwiRmlyc3QgbGlzdFwiKTtcclxuLy8gbGlzdC5hZGRUb2RvKFwiaGVsbG9cIik7XHJcbi8vIGxpc3QuYWRkVG9kbyhcIndvcmxkXCIpO1xyXG4vLyBsaXN0LmVkaXRUb2RvKDEsIFwiYWdhaW5cIik7XHJcbi8vIC8vIGNvbnNvbGUubG9nKGxpc3QpO1xyXG4vLyAvLyBsaXN0LmRlbGV0ZVRvZG8oMSk7XHJcbi8vIGNvbnNvbGUubG9nKGxpc3QpO1xyXG4vLyBjb25zdCBsaXN0VHdvID0gbmV3IFRvZG9MaXN0KFwiU2Vjb25kIGxpc3RcIik7XHJcbi8vIGxpc3RUd28uYWRkVG9kbyhcIm51bWJlcjJcIilcclxuLy8gbGlzdFR3by5zZXRUb2RvUHJpb3JpdHkoMCwgXCJJbXBvcnRhbnRcIik7XHJcbi8vIGxpc3RUd28uc2V0RHVlRGF0ZSgwLCBEYXRlLm5vdygpKTtcclxuLy8gY29uc29sZS5sb2cobGlzdFR3byk7XHJcblxyXG4vLyBsZXQgcHJvamVjdHMgPSBuZXcgUHJvamVjdHMoKTtcclxuLy8gcHJvamVjdHMuYWRkVG9kb0xpc3QobGlzdCk7XHJcbi8vIHByb2plY3RzLmFkZFRvZG9MaXN0KGxpc3RUd28pXHJcbi8vIGNvbnNvbGUubG9nKHByb2plY3RzKTtcclxuXHJcblZpZXdDb250cm9sbGVyKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==