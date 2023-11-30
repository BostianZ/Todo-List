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
        this.priority = "normal",
        this.notes = ""
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
        //Find todo based on ID
        //set it's priority
        let todo = this.todos.find((todo, index) => index === id);
        todo.priority = priority;
        return this.todos;
    }

    setDueDate(id, date = new Date().toISOString()) {
        let todo = this.todos.find((todo, index) => index === id);
        todo.dueDate = date;
        return this.todos;
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
    

    const renderTodos = (id) => {
        const todoListEl = document.querySelector(".todo-list");
        console.log("test");
        todoListEl.innerHTML = ""
        let project = projectsData[id];
        project.todos.forEach((todo, index) => {
            let divEl = document.createElement("div");
            divEl.setAttribute("id", `${index}`);
            divEl.textContent = todo.title;
            todoListEl.appendChild(divEl);
        })
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
                selectedProject(index)
             });
            projectsDiv.appendChild(divEl)
        })
    } 

    const selectedProject = (index) => {
        //Check to see if class exists on another node
        //IF so, remove it
        //ADD class to clicked node
        const projects = Array.from(document.querySelectorAll(".project"));
        const todoListEl = document.querySelector(".todo-list");
        todoListEl.setAttribute("id", `${index}`);
        renderTodos(index);

    }

    const projectsAddEl = document.querySelector("#projects-add");
    const projectsTitleForm = document.querySelector(".form");
    const projectsTitleInput = document.querySelector(".projects-title-input")
    const modal = document.querySelector("#dialog");



    projectsAddEl.addEventListener("click", function(e) {
        modal.showModal();
    })

    projectsTitleForm.addEventListener("submit", function(e) {
        e.preventDefault();

        console.log(projectsTitleInput.value)
        
        projects.addTodoList(projectsTitleInput.value);

        renderProjects();
        projectsTitleForm.reset()
        modal.close();

    })

    const addTodoEl = document.querySelector(".add-todo-btn");
    addTodoEl.addEventListener("click", function(e) {
        const addTodoInput = document.querySelector(".add-todo-input")
        const todoListEl = document.querySelector(".todo-list");
        console.log(todoListEl.id);
        console.log(projects);
        let index = todoListEl.id;
        let todoVal = addTodoInput.value;
        let todolist = projectsData[index];
        console.log(todolist);
        todolist.addTodo(todoVal);
        renderTodos(index);
    })

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

const view = (0,_ViewController__WEBPACK_IMPORTED_MODULE_2__.ViewController)();
console.log(view);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsK0NBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVDQUFJO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzNDc0M7QUFDdEM7QUFDQTtBQUNBLHVCQUF1QiwrQ0FBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxNQUFNO0FBQzlDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE1BQU07QUFDOUM7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLE1BQU07QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7OztVQ3JGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDQTtBQUNZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLCtEQUFjO0FBQzNCLGtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Ub2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Ub2RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVmlld0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRvZG9MaXN0IH0gZnJvbSBcIi4vVG9kb0xpc3RcIjtcclxuY2xhc3MgUHJvamVjdHMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy9Db250YWlucyBsaXN0IG9mIHRvZG8gbGlzdHMuXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRvZG9MaXN0KHRvZG9saXN0KSB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBuZXcgVG9kb0xpc3QodG9kb2xpc3QpXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKGxpc3QpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVG9kb0xpc3QoaWQpIHtcclxuICAgICAgICBsZXQgbmV3UHJvamVjdExpc3QgPSB0aGlzLnByb2plY3RzLnNwbGljZShpZCwgMSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1Byb2plY3RMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByb2plY3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBQcm9qZWN0cyB9IiwiY2xhc3MgVG9kbyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IFwibm9ybWFsXCIsXHJcbiAgICAgICAgdGhpcy5ub3RlcyA9IFwiXCJcclxuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUb2RvIH0iLCJpbXBvcnQgeyBUb2RvIH0gZnJvbSBcIi4vVG9kb1wiO1xyXG5cclxuY2xhc3MgVG9kb0xpc3Qge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXHJcbiAgICAgICAgdGhpcy50b2RvcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9kbyguLi50b2RvKSB7XHJcbiAgICAgICAgbGV0IG5ld1RvZG8gPSBuZXcgVG9kbyguLi50b2RvKTtcclxuICAgICAgICB0aGlzLnRvZG9zLnB1c2gobmV3VG9kbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50b2RvcylcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUb2RvKGlkKSB7XHJcbiAgICAgICAgbGV0IG5ld1RvZG9MaXN0ID0gdGhpcy50b2Rvcy5zcGxpY2UoaWQsIDEpO1xyXG4gICAgICAgIHJldHVybiBuZXdUb2RvTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBlZGl0VG9kbyhpZCwgdGl0bGUpIHtcclxuICAgICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb3MuZmluZCgodG9kbywgaW5kZXgpID0+IGluZGV4ID09PSBpZCk7XHJcbiAgICAgICAgdG9kby50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRvZG9Qcmlvcml0eShpZCwgcHJpb3JpdHkpIHtcclxuICAgICAgICAvL0ZpbmQgdG9kbyBiYXNlZCBvbiBJRFxyXG4gICAgICAgIC8vc2V0IGl0J3MgcHJpb3JpdHlcclxuICAgICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb3MuZmluZCgodG9kbywgaW5kZXgpID0+IGluZGV4ID09PSBpZCk7XHJcbiAgICAgICAgdG9kby5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHNldER1ZURhdGUoaWQsIGRhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpIHtcclxuICAgICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb3MuZmluZCgodG9kbywgaW5kZXgpID0+IGluZGV4ID09PSBpZCk7XHJcbiAgICAgICAgdG9kby5kdWVEYXRlID0gZGF0ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBUb2RvTGlzdCB9IiwiaW1wb3J0IHsgUHJvamVjdHMgfSBmcm9tIFwiLi9Qcm9qZWN0c1wiO1xyXG5cclxuZnVuY3Rpb24gVmlld0NvbnRyb2xsZXIoKSB7XHJcbiAgICBsZXQgcHJvamVjdHMgPSBuZXcgUHJvamVjdHMoKTtcclxuICAgIGxldCBwcm9qZWN0c0RhdGEgPSBwcm9qZWN0cy5nZXRQcm9qZWN0cygpO1xyXG4gICAgXHJcblxyXG4gICAgY29uc3QgcmVuZGVyVG9kb3MgPSAoaWQpID0+IHtcclxuICAgICAgICBjb25zdCB0b2RvTGlzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0ZXN0XCIpO1xyXG4gICAgICAgIHRvZG9MaXN0RWwuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdHNEYXRhW2lkXTtcclxuICAgICAgICBwcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkaXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGRpdkVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgICAgICAgICBkaXZFbC50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XHJcbiAgICAgICAgICAgIHRvZG9MaXN0RWwuYXBwZW5kQ2hpbGQoZGl2RWwpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzXCIpO1xyXG4gICAgICAgIHByb2plY3RzRGl2LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHByb2plY3RzID0gcHJvamVjdHNEYXRhLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkaXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGRpdkVsLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgICAgICAgICAgZGl2RWwuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XHJcbiAgICAgICAgICAgIGRpdkVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgICAgICAgICBkaXZFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7IFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0KGluZGV4KVxyXG4gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHByb2plY3RzRGl2LmFwcGVuZENoaWxkKGRpdkVsKVxyXG4gICAgICAgIH0pXHJcbiAgICB9IFxyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIC8vQ2hlY2sgdG8gc2VlIGlmIGNsYXNzIGV4aXN0cyBvbiBhbm90aGVyIG5vZGVcclxuICAgICAgICAvL0lGIHNvLCByZW1vdmUgaXRcclxuICAgICAgICAvL0FERCBjbGFzcyB0byBjbGlja2VkIG5vZGVcclxuICAgICAgICBjb25zdCBwcm9qZWN0cyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0XCIpKTtcclxuICAgICAgICBjb25zdCB0b2RvTGlzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XHJcbiAgICAgICAgdG9kb0xpc3RFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICByZW5kZXJUb2RvcyhpbmRleCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByb2plY3RzQWRkRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzLWFkZFwiKTtcclxuICAgIGNvbnN0IHByb2plY3RzVGl0bGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtXCIpO1xyXG4gICAgY29uc3QgcHJvamVjdHNUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy10aXRsZS1pbnB1dFwiKVxyXG4gICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RpYWxvZ1wiKTtcclxuXHJcblxyXG5cclxuICAgIHByb2plY3RzQWRkRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBtb2RhbC5zaG93TW9kYWwoKTtcclxuICAgIH0pXHJcblxyXG4gICAgcHJvamVjdHNUaXRsZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0c1RpdGxlSW5wdXQudmFsdWUpXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvamVjdHMuYWRkVG9kb0xpc3QocHJvamVjdHNUaXRsZUlucHV0LnZhbHVlKTtcclxuXHJcbiAgICAgICAgcmVuZGVyUHJvamVjdHMoKTtcclxuICAgICAgICBwcm9qZWN0c1RpdGxlRm9ybS5yZXNldCgpXHJcbiAgICAgICAgbW9kYWwuY2xvc2UoKTtcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGFkZFRvZG9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRvZG8tYnRuXCIpO1xyXG4gICAgYWRkVG9kb0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29uc3QgYWRkVG9kb0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdG9kby1pbnB1dFwiKVxyXG4gICAgICAgIGNvbnN0IHRvZG9MaXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b2RvTGlzdEVsLmlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdG9kb0xpc3RFbC5pZDtcclxuICAgICAgICBsZXQgdG9kb1ZhbCA9IGFkZFRvZG9JbnB1dC52YWx1ZTtcclxuICAgICAgICBsZXQgdG9kb2xpc3QgPSBwcm9qZWN0c0RhdGFbaW5kZXhdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRvZG9saXN0KTtcclxuICAgICAgICB0b2RvbGlzdC5hZGRUb2RvKHRvZG9WYWwpO1xyXG4gICAgICAgIHJlbmRlclRvZG9zKGluZGV4KTtcclxuICAgIH0pXHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBWaWV3Q29udHJvbGxlciB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUb2RvTGlzdCB9IGZyb20gXCIuL1RvZG9MaXN0XCI7XHJcbmltcG9ydCB7IFByb2plY3RzIH0gZnJvbSBcIi4vUHJvamVjdHNcIjtcclxuaW1wb3J0IHsgVmlld0NvbnRyb2xsZXIgfSBmcm9tIFwiLi9WaWV3Q29udHJvbGxlclwiO1xyXG5cclxuXHJcbi8vIGNvbnN0IGxpc3QgPSBuZXcgVG9kb0xpc3QoXCJGaXJzdCBsaXN0XCIpO1xyXG4vLyBsaXN0LmFkZFRvZG8oXCJoZWxsb1wiKTtcclxuLy8gbGlzdC5hZGRUb2RvKFwid29ybGRcIik7XHJcbi8vIGxpc3QuZWRpdFRvZG8oMSwgXCJhZ2FpblwiKTtcclxuLy8gLy8gY29uc29sZS5sb2cobGlzdCk7XHJcbi8vIC8vIGxpc3QuZGVsZXRlVG9kbygxKTtcclxuLy8gY29uc29sZS5sb2cobGlzdCk7XHJcbi8vIGNvbnN0IGxpc3RUd28gPSBuZXcgVG9kb0xpc3QoXCJTZWNvbmQgbGlzdFwiKTtcclxuLy8gbGlzdFR3by5hZGRUb2RvKFwibnVtYmVyMlwiKVxyXG4vLyBsaXN0VHdvLnNldFRvZG9Qcmlvcml0eSgwLCBcIkltcG9ydGFudFwiKTtcclxuLy8gbGlzdFR3by5zZXREdWVEYXRlKDAsIERhdGUubm93KCkpO1xyXG4vLyBjb25zb2xlLmxvZyhsaXN0VHdvKTtcclxuXHJcbi8vIGxldCBwcm9qZWN0cyA9IG5ldyBQcm9qZWN0cygpO1xyXG4vLyBwcm9qZWN0cy5hZGRUb2RvTGlzdChsaXN0KTtcclxuLy8gcHJvamVjdHMuYWRkVG9kb0xpc3QobGlzdFR3bylcclxuLy8gY29uc29sZS5sb2cocHJvamVjdHMpO1xyXG5cclxuY29uc3QgdmlldyA9IFZpZXdDb250cm9sbGVyKCk7XHJcbmNvbnNvbGUubG9nKHZpZXcpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==