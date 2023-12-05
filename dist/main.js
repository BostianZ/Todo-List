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

    setTodoPriority(id) {
        id = parseInt(id);
        let todo = this.todos.find((todo, index) => index === id);
        todo.priority = !todo.priority;
        console.log(todo.priority);

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
                <div>
                    4<label for="dueDate">Due date:</label>
                    <input type="date" id="due" name="dueDate" value="2018-07-22" min="2018-01-01" max="2018-12-31" />
                </div>
                <div class="notes">
                    <p>NOTES</p>
                    <textarea rows="5" placeholder="Insert your notes here...">${todo.notes}</textarea>
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
        el.classList.add("priority-true")
       } else if (todo.priority === false) {
        el.classList.remove("priority-true")
       }
    }

    

    // const editProjectTitle = () => {
    //     console.log("sssss");
    // }

    // const editTodoTitle = () => {

    // }

    function EventsController() {
        const addTodoEl = document.querySelector(".add-todo-btn");
        const projectsAddEl = document.querySelector("#projects-add");
        const projectsTitleForm = document.querySelector(".form");
        const projectsTitleInput = document.querySelector(".projects-title-input")
        const modal = document.querySelector("#dialog");
        const cancelProjectDialogBox = document.querySelector(".project-form-cancel-btn");
        const todoEl = document.querySelector(".todo");
        // const clearPriorityEl = document.querySelector("clear-priority");

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

        projectLabel.addEventListener("change", (e) => editProjectTitle(e));

        projectDeleteBtn.addEventListener("click", (e) => deleteProjectHandler(e.target.id));

        projectsAddEl.addEventListener("click", (e) => modal.showModal());

        cancelProjectDialogBox.addEventListener("click", (e) => modal.close());

        projectsTitleForm.addEventListener("submit", renderProjectsHandler)

        addTodoEl.addEventListener("click", renderTodosHandler)

        document.addEventListener("click", (e) => {
            const priorityBtn = e.target.matches(".priority-btn");
            const btn = document.querySelector(".priority-btn");
            if (priorityBtn) {
                updatePriorityHandler(todoListEl.id, btn.parentElement.parentElement.id);
            }
        })

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcE9BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05zQztBQUNBO0FBQ1k7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Ub2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Ub2RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVmlld0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRvZG9MaXN0IH0gZnJvbSBcIi4vVG9kb0xpc3RcIjtcclxuY2xhc3MgUHJvamVjdHMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy9Db250YWlucyBsaXN0IG9mIHRvZG8gbGlzdHMuXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRvZG9MaXN0KHRvZG9saXN0KSB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBuZXcgVG9kb0xpc3QodG9kb2xpc3QpXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKGxpc3QpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVG9kb0xpc3QoaWQpIHtcclxuICAgICAgICBsZXQgbmV3UHJvamVjdExpc3QgPSB0aGlzLnByb2plY3RzLnNwbGljZShpZCwgMSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1Byb2plY3RMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRQcm9qZWN0KGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByb2plY3RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBQcm9qZWN0cyB9IiwiY2xhc3MgVG9kbyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IGZhbHNlLFxyXG4gICAgICAgIHRoaXMubm90ZXMgPSBcIlwiLFxyXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUb2RvIH0iLCJpbXBvcnQgeyBUb2RvIH0gZnJvbSBcIi4vVG9kb1wiO1xyXG5cclxuY2xhc3MgVG9kb0xpc3Qge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXHJcbiAgICAgICAgdGhpcy50b2RvcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9kbyguLi50b2RvKSB7XHJcbiAgICAgICAgbGV0IG5ld1RvZG8gPSBuZXcgVG9kbyguLi50b2RvKTtcclxuICAgICAgICB0aGlzLnRvZG9zLnB1c2gobmV3VG9kbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50b2RvcylcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUb2RvKGlkKSB7XHJcbiAgICAgICAgbGV0IG5ld1RvZG9MaXN0ID0gdGhpcy50b2Rvcy5zcGxpY2UoaWQsIDEpO1xyXG4gICAgICAgIHJldHVybiBuZXdUb2RvTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBlZGl0VG9kbyhpZCwgdGl0bGUpIHtcclxuICAgICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb3MuZmluZCgodG9kbywgaW5kZXgpID0+IGluZGV4ID09PSBpZCk7XHJcbiAgICAgICAgdG9kby50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRvZG9Qcmlvcml0eShpZCkge1xyXG4gICAgICAgIGlkID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLnByaW9yaXR5ID0gIXRvZG8ucHJpb3JpdHk7XHJcbiAgICAgICAgY29uc29sZS5sb2codG9kby5wcmlvcml0eSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHNldER1ZURhdGUoaWQsIGRhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpIHtcclxuICAgICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb3MuZmluZCgodG9kbywgaW5kZXgpID0+IGluZGV4ID09PSBpZCk7XHJcbiAgICAgICAgdG9kby5kdWVEYXRlID0gZGF0ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJyZW50VG9kbyhpbmRleCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zW2luZGV4XTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBUb2RvTGlzdCB9IiwiaW1wb3J0IHsgUHJvamVjdHMgfSBmcm9tIFwiLi9Qcm9qZWN0c1wiO1xyXG5cclxuZnVuY3Rpb24gVmlld0NvbnRyb2xsZXIoKSB7XHJcbiAgICBsZXQgcHJvamVjdHMgPSBuZXcgUHJvamVjdHMoKTtcclxuICAgIGxldCBwcm9qZWN0c0RhdGEgPSBwcm9qZWN0cy5nZXRQcm9qZWN0cygpO1xyXG4gICAgY29uc3QgdG9kb0xpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0XCIpO1xyXG4gICAgY29uc3QgdG9kb0NvbnRhaW5lckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnN0IHByb2plY3REZWxldGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdC1kZWxldGUtYnRuXCIpO1xyXG4gICAgY29uc3QgcHJvamVjdExhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3QtdGl0bGUtaW5wdXRcIik7XHJcbiAgICBjb25zdCBwcmlvcml0eUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpb3JpdHktYnRuXCIpO1xyXG5cclxuICAgIGNvbnN0IHJlbmRlclRvZG9zID0gKHByb2plY3RJbmRleCkgPT4ge1xyXG4gICAgICAgIHRvZG9MaXN0RWwuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF07XHJcbiAgICAgICAgcHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdG9kb1dyYXBwZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGxldCBkaXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGxldCBkZWxldGVUb2RvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBkZWxldGVUb2RvRWwudGV4dENvbnRlbnQgPSBcIlhcIjtcclxuICAgICAgICAgICAgZGVsZXRlVG9kb0VsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgICAgICAgICBkZWxldGVUb2RvRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVUb2RvaGFuZGxlcihlLCBwcm9qZWN0SW5kZXgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0b2RvV3JhcHBlckVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgICAgICAgICB0b2RvV3JhcHBlckVsLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW1cIik7XHJcbiAgICAgICAgICAgIGRpdkVsLnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcclxuICAgICAgICAgICAgZGl2RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJUb2RvRGlzcGxheSh0b2RvTGlzdEVsLmlkLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRvZG8oaW5kZXgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZW5kZXJQcmlvcml0eSh0b2RvLCBkaXZFbCk7XHJcbiAgICAgICAgICAgIHRvZG9XcmFwcGVyRWwuYXBwZW5kQ2hpbGQoZGl2RWwpO1xyXG4gICAgICAgICAgICB0b2RvV3JhcHBlckVsLmFwcGVuZENoaWxkKGRlbGV0ZVRvZG9FbClcclxuICAgICAgICAgICAgdG9kb0xpc3RFbC5hcHBlbmRDaGlsZCh0b2RvV3JhcHBlckVsKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlZmF1bHRUb0ZpcnN0VG9kbyA9ICh0b2RvcywgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB0b2RvQ29udGFpbmVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGlmICh0b2Rvcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW5kZXJUb2RvRGlzcGxheShpbmRleCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnN0IGRpc3BsYXlUb2RvSW5mbyA9IChwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCkgPT4ge1xyXG4gICAgLy8gICAgIGNvbnN0IHRvZG9UaXRsZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLXRpdGxlLWlucHV0XCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IHRvZG9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb1wiKVxyXG4gICAgLy8gICAgIHRvZG9FbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHt0b2RvSW5kZXh9YCk7XHJcbiAgICAvLyAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAvLyAgICAgbGV0IHRvZG9zID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF0udG9kb3M7XHJcbiAgICAvLyAgICAgbGV0IHRvZG8gPSB0b2Rvc1t0b2RvSW5kZXhdO1xyXG4gICAgLy8gICAgIHRvZG9UaXRsZUVsLnBsYWNlaG9sZGVyID0gdG9kby50aXRsZTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgY29uc3QgcmVuZGVyVG9kb0Rpc3BsYXkgPSAocHJvamVjdEluZGV4LCB0b2RvSW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgdG9kb3MgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XS50b2RvcztcclxuICAgICAgICBsZXQgdG9kbyA9IHRvZG9zW3RvZG9JbmRleF07XHJcbiAgICAgICAgdG9kb0NvbnRhaW5lckVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3Byb2plY3RJbmRleH1gKTtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb1wiIGlkPSR7dG9kb0luZGV4fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9JHt0b2RvLnRpdGxlfSBjbGFzcz1cInRvZG8tdGl0bGUtaW5wdXRcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpb3JpdHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicHJpb3JpdHktYnRuXCI+UHJpb3JpdHk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA0PGxhYmVsIGZvcj1cImR1ZURhdGVcIj5EdWUgZGF0ZTo8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiZHVlXCIgbmFtZT1cImR1ZURhdGVcIiB2YWx1ZT1cIjIwMTgtMDctMjJcIiBtaW49XCIyMDE4LTAxLTAxXCIgbWF4PVwiMjAxOC0xMi0zMVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3Rlc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPk5PVEVTPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiNVwiIHBsYWNlaG9sZGVyPVwiSW5zZXJ0IHlvdXIgbm90ZXMgaGVyZS4uLlwiPiR7dG9kby5ub3Rlc308L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiBgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGlkZVRvZG9JbmZvID0gKCkgPT4ge1xyXG4gICAgICAgIHRvZG9Db250YWluZXJFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRUb2RvID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9kb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvZG8taXRlbVwiKTtcclxuICAgICAgICB0b2Rvcy5mb3JFYWNoKHRvZG8gPT4ge1xyXG4gICAgICAgICAgICB0b2RvLmNsYXNzTGlzdC5yZW1vdmUoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdG9kb3NbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlbGV0ZVRvZG9oYW5kbGVyID0gKGUsIHByb2plY3RJbmRleCkgPT4ge1xyXG4gICAgICAgIC8vUHJvamVjdCBpbmRleCBhbmQgdG9kbyBpbmRleFxyXG4gICAgICAgIGxldCB0b2RvSW5kZXggPSBlLnRhcmdldC5pZFxyXG4gICAgICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF07XHJcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdEluZGV4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0KTtcclxuICAgICAgICBwcm9qZWN0LmRlbGV0ZVRvZG8odG9kb0luZGV4KTtcclxuICAgICAgICBoaWRlVG9kb0luZm8oKTtcclxuICAgICAgICByZW5kZXJUb2Rvcyhwcm9qZWN0SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlclByb2plY3RzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0c1wiKTtcclxuICAgICAgICBwcm9qZWN0c0Rpdi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIGxldCBwcm9qZWN0cyA9IHByb2plY3RzRGF0YS5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGl2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBkaXZFbC50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XHJcbiAgICAgICAgICAgIGRpdkVsLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xyXG4gICAgICAgICAgICBkaXZFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICAgICAgZGl2RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlclByb2plY3QoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0KGluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHByb2plY3RzRGl2LmFwcGVuZENoaWxkKGRpdkVsKVxyXG4gICAgICAgICAgICByZW5kZXJQcm9qZWN0KGluZGV4KTtcclxuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0KGluZGV4KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlclByb2plY3QgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICB0b2RvTGlzdEVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgICAgIHJlbmRlclByb2plY3RMYWJlbChpbmRleCk7XHJcbiAgICAgICAgcmVuZGVyVG9kb3MoaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlclByb2plY3RMYWJlbCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIHByb2plY3RMYWJlbC5wbGFjZWhvbGRlciA9IHByb2plY3RzRGF0YVtpbmRleF0udGl0bGU7XHJcbiAgICAgICAgcHJvamVjdERlbGV0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XHJcbiAgICAgICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICAgICAgcHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKFwicHJvamVjdC1zZWxlY3RlZFwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHByb2plY3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1zZWxlY3RlZFwiKTtcclxuICAgICAgICBkZWZhdWx0VG9GaXJzdFRvZG8ocHJvamVjdHNEYXRhW2luZGV4XS50b2RvcywgaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlclByaW9yaXR5ID0gKHRvZG8sIGVsKSA9PiB7XHJcbiAgICAgICBpZiAodG9kby5wcmlvcml0eSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eS10cnVlXCIpXHJcbiAgICAgICB9IGVsc2UgaWYgKHRvZG8ucHJpb3JpdHkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcInByaW9yaXR5LXRydWVcIilcclxuICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvLyBjb25zdCBlZGl0UHJvamVjdFRpdGxlID0gKCkgPT4ge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwic3Nzc3NcIik7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gY29uc3QgZWRpdFRvZG9UaXRsZSA9ICgpID0+IHtcclxuXHJcbiAgICAvLyB9XHJcblxyXG4gICAgZnVuY3Rpb24gRXZlbnRzQ29udHJvbGxlcigpIHtcclxuICAgICAgICBjb25zdCBhZGRUb2RvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWJ0blwiKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0c0FkZEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1hZGRcIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNUaXRsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1cIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy10aXRsZS1pbnB1dFwiKVxyXG4gICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkaWFsb2dcIik7XHJcbiAgICAgICAgY29uc3QgY2FuY2VsUHJvamVjdERpYWxvZ0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1mb3JtLWNhbmNlbC1idG5cIik7XHJcbiAgICAgICAgY29uc3QgdG9kb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvXCIpO1xyXG4gICAgICAgIC8vIGNvbnN0IGNsZWFyUHJpb3JpdHlFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjbGVhci1wcmlvcml0eVwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVuZGVyUHJvamVjdHNIYW5kbGVyID0gKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBwcm9qZWN0cy5hZGRUb2RvTGlzdChwcm9qZWN0c1RpdGxlSW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICByZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgICAgICAgICBwcm9qZWN0c1RpdGxlRm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgIG1vZGFsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZW5kZXJUb2Rvc0hhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhZGRUb2RvSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWlucHV0XCIpXHJcbiAgICAgICAgICAgIGNvbnN0IHRvZG9MaXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdG9kb0xpc3RFbC5pZDtcclxuICAgICAgICAgICAgbGV0IHRvZG9WYWwgPSBhZGRUb2RvSW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCB0b2RvbGlzdCA9IHByb2plY3RzRGF0YVtpbmRleF07XHJcbiAgICAgICAgICAgIHRvZG9saXN0LmFkZFRvZG8odG9kb1ZhbCk7XHJcbiAgICAgICAgICAgIHJlbmRlclRvZG9zKGluZGV4KTtcclxuICAgICAgICAgICAgYWRkVG9kb0lucHV0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RIYW5kbGVyID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHByb2plY3RzLmRlbGV0ZVRvZG9MaXN0KGluZGV4KTtcclxuICAgICAgICAgICAgcHJvamVjdExhYmVsLnBsYWNlaG9sZGVyID0gXCJcIjtcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdHMoKTtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb3MoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlUHJpb3JpdHlIYW5kbGVyID0gKHByb2plY3RJbmRleCwgdG9kb0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdCA9IHByb2plY3RzLmdldEN1cnJlbnRQcm9qZWN0KHByb2plY3RJbmRleClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudFByb2plY3QpO1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvamVjdC5zZXRUb2RvUHJpb3JpdHkodG9kb0luZGV4KTtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb3MocHJvamVjdEluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb2plY3RMYWJlbC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiBlZGl0UHJvamVjdFRpdGxlKGUpKTtcclxuXHJcbiAgICAgICAgcHJvamVjdERlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGRlbGV0ZVByb2plY3RIYW5kbGVyKGUudGFyZ2V0LmlkKSk7XHJcblxyXG4gICAgICAgIHByb2plY3RzQWRkRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBtb2RhbC5zaG93TW9kYWwoKSk7XHJcblxyXG4gICAgICAgIGNhbmNlbFByb2plY3REaWFsb2dCb3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBtb2RhbC5jbG9zZSgpKTtcclxuXHJcbiAgICAgICAgcHJvamVjdHNUaXRsZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCByZW5kZXJQcm9qZWN0c0hhbmRsZXIpXHJcblxyXG4gICAgICAgIGFkZFRvZG9FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVuZGVyVG9kb3NIYW5kbGVyKVxyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlCdG4gPSBlLnRhcmdldC5tYXRjaGVzKFwiLnByaW9yaXR5LWJ0blwiKTtcclxuICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmlvcml0eS1idG5cIik7XHJcbiAgICAgICAgICAgIGlmIChwcmlvcml0eUJ0bikge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlUHJpb3JpdHlIYW5kbGVyKHRvZG9MaXN0RWwuaWQsIGJ0bi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgRXZlbnRzQ29udHJvbGxlcigpO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IFZpZXdDb250cm9sbGVyIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRvZG9MaXN0IH0gZnJvbSBcIi4vVG9kb0xpc3RcIjtcclxuaW1wb3J0IHsgUHJvamVjdHMgfSBmcm9tIFwiLi9Qcm9qZWN0c1wiO1xyXG5pbXBvcnQgeyBWaWV3Q29udHJvbGxlciB9IGZyb20gXCIuL1ZpZXdDb250cm9sbGVyXCI7XHJcblxyXG5cclxuLy8gY29uc3QgbGlzdCA9IG5ldyBUb2RvTGlzdChcIkZpcnN0IGxpc3RcIik7XHJcbi8vIGxpc3QuYWRkVG9kbyhcImhlbGxvXCIpO1xyXG4vLyBsaXN0LmFkZFRvZG8oXCJ3b3JsZFwiKTtcclxuLy8gbGlzdC5lZGl0VG9kbygxLCBcImFnYWluXCIpO1xyXG4vLyAvLyBjb25zb2xlLmxvZyhsaXN0KTtcclxuLy8gLy8gbGlzdC5kZWxldGVUb2RvKDEpO1xyXG4vLyBjb25zb2xlLmxvZyhsaXN0KTtcclxuLy8gY29uc3QgbGlzdFR3byA9IG5ldyBUb2RvTGlzdChcIlNlY29uZCBsaXN0XCIpO1xyXG4vLyBsaXN0VHdvLmFkZFRvZG8oXCJudW1iZXIyXCIpXHJcbi8vIGxpc3RUd28uc2V0VG9kb1ByaW9yaXR5KDAsIFwiSW1wb3J0YW50XCIpO1xyXG4vLyBsaXN0VHdvLnNldER1ZURhdGUoMCwgRGF0ZS5ub3coKSk7XHJcbi8vIGNvbnNvbGUubG9nKGxpc3RUd28pO1xyXG5cclxuLy8gbGV0IHByb2plY3RzID0gbmV3IFByb2plY3RzKCk7XHJcbi8vIHByb2plY3RzLmFkZFRvZG9MaXN0KGxpc3QpO1xyXG4vLyBwcm9qZWN0cy5hZGRUb2RvTGlzdChsaXN0VHdvKVxyXG4vLyBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XHJcblxyXG5WaWV3Q29udHJvbGxlcigpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=