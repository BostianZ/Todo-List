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
    const projectDeleteBtn = document.querySelector(".todo-list-delete-btn");
    const projectLabel = document.querySelector(".todo-list-title-input");

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
            // divEl.setAttribute("id", `${index}`);
            todoWrapperEl.setAttribute("id", `${index}`);
            todoWrapperEl.classList.add("todo-item");
            divEl.textContent = todo.title;
            renderPriority(todo, divEl);
            divEl.addEventListener("click", function (e) {
                renderTodoDisplay(todoListEl.id, index);
                selectedTodo(index);
            })
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
                <div class="priority" id=${todo.priority}>
                    <button class="clear-priority">Clear</button>
                    <button id="urgent" class="priority-btn">Urgent</button>
                    <button id="important" class="priority-btn">Important</button>
                </div>
                <div class="notes">
                    <p>NOTES</p>
                    <textarea rows="5">${todo.notes}</textarea>
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
        console.log(e.target.id);
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

    const editProjectTitle = (e) => {
        console.log("sssss")
    }

    // const editTodoTitle = () => {

    // }

    function EventsController() {
        const addTodoEl = document.querySelector(".add-todo-btn");
        const projectsAddEl = document.querySelector("#projects-add");
        const projectsTitleForm = document.querySelector(".form");
        const projectsTitleInput = document.querySelector(".projects-title-input")
        const modal = document.querySelector("#dialog");
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

        const deleteProjectHandler = (index) => {
            projects.deleteTodoList(index);
            projectLabel.placeholder = "";
            renderProjects();
            renderTodos(index);
        }

        const updatePriorityHandler = (projectIndex, todoIndex, priority) => {
            let currentProject = projects.getCurrentProject(projectIndex)
            currentProject.setTodoPriority(todoIndex, priority);
            renderTodos(projectIndex);
        }

        projectLabel.addEventListener("change", (e) => editProjectTitle(e));

        projectDeleteBtn.addEventListener("click", (e) => deleteProjectHandler(e.target.id));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3RPQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDQTtBQUNZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBYyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Qcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1ZpZXdDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2RvTGlzdCB9IGZyb20gXCIuL1RvZG9MaXN0XCI7XHJcbmNsYXNzIFByb2plY3RzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vQ29udGFpbnMgbGlzdCBvZiB0b2RvIGxpc3RzLlxyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvTGlzdCh0b2RvbGlzdCkge1xyXG4gICAgICAgIGxldCBsaXN0ID0gbmV3IFRvZG9MaXN0KHRvZG9saXN0KVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChsaXN0KVxyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVRvZG9MaXN0KGlkKSB7XHJcbiAgICAgICAgbGV0IG5ld1Byb2plY3RMaXN0ID0gdGhpcy5wcm9qZWN0cy5zcGxpY2UoaWQsIDEpO1xyXG4gICAgICAgIHJldHVybiBuZXdQcm9qZWN0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJyZW50UHJvamVjdChpbmRleCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9qZWN0cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUHJvamVjdHMgfSIsImNsYXNzIFRvZG8ge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXHJcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBcIlwiLFxyXG4gICAgICAgIHRoaXMubm90ZXMgPSBcIlwiLFxyXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRvZG8gfSIsImltcG9ydCB7IFRvZG8gfSBmcm9tIFwiLi9Ub2RvXCI7XHJcblxyXG5jbGFzcyBUb2RvTGlzdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLnRvZG9zID0gW107XHJcbiAgICAgICAgdGhpcy5pZDtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvKC4uLnRvZG8pIHtcclxuICAgICAgICBsZXQgbmV3VG9kbyA9IG5ldyBUb2RvKC4uLnRvZG8pO1xyXG4gICAgICAgIHRoaXMudG9kb3MucHVzaChuZXdUb2RvKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRvZG9zKVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVRvZG8oaWQpIHtcclxuICAgICAgICBsZXQgbmV3VG9kb0xpc3QgPSB0aGlzLnRvZG9zLnNwbGljZShpZCwgMSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1RvZG9MaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRUb2RvKGlkLCB0aXRsZSkge1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG9kb1ByaW9yaXR5KGlkLCBwcmlvcml0eSkge1xyXG4gICAgICAgIGlkID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlkLCBwcmlvcml0eSwgdGhpcy50b2Rvcyk7XHJcbiAgICAgICAgbGV0IHRvZG8gPSB0aGlzLnRvZG9zLmZpbmQoKHRvZG8sIGluZGV4KSA9PiBpbmRleCA9PT0gaWQpO1xyXG4gICAgICAgIHRvZG8ucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbiAgICBzZXREdWVEYXRlKGlkLCBkYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpKSB7XHJcbiAgICAgICAgbGV0IHRvZG8gPSB0aGlzLnRvZG9zLmZpbmQoKHRvZG8sIGluZGV4KSA9PiBpbmRleCA9PT0gaWQpO1xyXG4gICAgICAgIHRvZG8uZHVlRGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudFRvZG8oaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2Rvc1tpbmRleF07XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgVG9kb0xpc3QgfSIsImltcG9ydCB7IFByb2plY3RzIH0gZnJvbSBcIi4vUHJvamVjdHNcIjtcclxuXHJcbmZ1bmN0aW9uIFZpZXdDb250cm9sbGVyKCkge1xyXG4gICAgbGV0IHByb2plY3RzID0gbmV3IFByb2plY3RzKCk7XHJcbiAgICBsZXQgcHJvamVjdHNEYXRhID0gcHJvamVjdHMuZ2V0UHJvamVjdHMoKTtcclxuICAgIGNvbnN0IHRvZG9MaXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcclxuICAgIGNvbnN0IHRvZG9Db250YWluZXJFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1jb250YWluZXJcIik7XHJcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3QtZGVsZXRlLWJ0blwiKTtcclxuICAgIGNvbnN0IHByb2plY3RMYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0LXRpdGxlLWlucHV0XCIpO1xyXG5cclxuICAgIGNvbnN0IHJlbmRlclRvZG9zID0gKHByb2plY3RJbmRleCkgPT4ge1xyXG4gICAgICAgIHRvZG9MaXN0RWwuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF07XHJcbiAgICAgICAgcHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdG9kb1dyYXBwZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGxldCBkaXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGxldCBkZWxldGVUb2RvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICBkZWxldGVUb2RvRWwudGV4dENvbnRlbnQgPSBcIlhcIjtcclxuICAgICAgICAgICAgZGVsZXRlVG9kb0VsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgICAgICAgICBkZWxldGVUb2RvRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVUb2RvaGFuZGxlcihlLCBwcm9qZWN0SW5kZXgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBkaXZFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICAgICAgdG9kb1dyYXBwZXJFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICAgICAgdG9kb1dyYXBwZXJFbC5jbGFzc0xpc3QuYWRkKFwidG9kby1pdGVtXCIpO1xyXG4gICAgICAgICAgICBkaXZFbC50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XHJcbiAgICAgICAgICAgIHJlbmRlclByaW9yaXR5KHRvZG8sIGRpdkVsKTtcclxuICAgICAgICAgICAgZGl2RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJUb2RvRGlzcGxheSh0b2RvTGlzdEVsLmlkLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRvZG8oaW5kZXgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0b2RvV3JhcHBlckVsLmFwcGVuZENoaWxkKGRpdkVsKTtcclxuICAgICAgICAgICAgdG9kb1dyYXBwZXJFbC5hcHBlbmRDaGlsZChkZWxldGVUb2RvRWwpXHJcbiAgICAgICAgICAgIHRvZG9MaXN0RWwuYXBwZW5kQ2hpbGQodG9kb1dyYXBwZXJFbCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWZhdWx0VG9GaXJzdFRvZG8gPSAodG9kb3MsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9kb0NvbnRhaW5lckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWNvbnRhaW5lclwiKTtcclxuICAgICAgICBpZiAodG9kb3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRvZG9Db250YWluZXJFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb0Rpc3BsYXkoaW5kZXgsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zdCBkaXNwbGF5VG9kb0luZm8gPSAocHJvamVjdEluZGV4LCB0b2RvSW5kZXgpID0+IHtcclxuICAgIC8vICAgICBjb25zdCB0b2RvVGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby10aXRsZS1pbnB1dFwiKTtcclxuICAgIC8vICAgICBjb25zdCB0b2RvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9cIilcclxuICAgIC8vICAgICB0b2RvRWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7dG9kb0luZGV4fWApO1xyXG4gICAgLy8gICAgIHRvZG9Db250YWluZXJFbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgLy8gICAgIGxldCB0b2RvcyA9IHByb2plY3RzRGF0YVtwcm9qZWN0SW5kZXhdLnRvZG9zO1xyXG4gICAgLy8gICAgIGxldCB0b2RvID0gdG9kb3NbdG9kb0luZGV4XTtcclxuICAgIC8vICAgICB0b2RvVGl0bGVFbC5wbGFjZWhvbGRlciA9IHRvZG8udGl0bGU7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyVG9kb0Rpc3BsYXkgPSAocHJvamVjdEluZGV4LCB0b2RvSW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgdG9kb3MgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XS50b2RvcztcclxuICAgICAgICBsZXQgdG9kbyA9IHRvZG9zW3RvZG9JbmRleF07XHJcbiAgICAgICAgdG9kb0NvbnRhaW5lckVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3Byb2plY3RJbmRleH1gKTtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb1wiIGlkPSR7dG9kb0luZGV4fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9JHt0b2RvLnRpdGxlfSBjbGFzcz1cInRvZG8tdGl0bGUtaW5wdXRcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpb3JpdHlcIiBpZD0ke3RvZG8ucHJpb3JpdHl9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjbGVhci1wcmlvcml0eVwiPkNsZWFyPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInVyZ2VudFwiIGNsYXNzPVwicHJpb3JpdHktYnRuXCI+VXJnZW50PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImltcG9ydGFudFwiIGNsYXNzPVwicHJpb3JpdHktYnRuXCI+SW1wb3J0YW50PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3Rlc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPk5PVEVTPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiNVwiPiR7dG9kby5ub3Rlc308L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiBgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGlkZVRvZG9JbmZvID0gKCkgPT4ge1xyXG4gICAgICAgIHRvZG9Db250YWluZXJFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRUb2RvID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9kb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvZG8taXRlbVwiKTtcclxuICAgICAgICB0b2Rvcy5mb3JFYWNoKHRvZG8gPT4ge1xyXG4gICAgICAgICAgICB0b2RvLmNsYXNzTGlzdC5yZW1vdmUoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdG9kb3NbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlbGV0ZVRvZG9oYW5kbGVyID0gKGUsIHByb2plY3RJbmRleCkgPT4ge1xyXG4gICAgICAgIC8vUHJvamVjdCBpbmRleCBhbmQgdG9kbyBpbmRleFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmlkKTtcclxuICAgICAgICBsZXQgdG9kb0luZGV4ID0gZS50YXJnZXQuaWRcclxuICAgICAgICBsZXQgcHJvamVjdCA9IHByb2plY3RzRGF0YVtwcm9qZWN0SW5kZXhdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RJbmRleCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdCk7XHJcbiAgICAgICAgcHJvamVjdC5kZWxldGVUb2RvKHRvZG9JbmRleCk7XHJcbiAgICAgICAgaGlkZVRvZG9JbmZvKCk7XHJcbiAgICAgICAgcmVuZGVyVG9kb3MocHJvamVjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0cyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0c0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHNcIik7XHJcbiAgICAgICAgcHJvamVjdHNEaXYuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBsZXQgcHJvamVjdHMgPSBwcm9qZWN0c0RhdGEuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRpdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgZGl2RWwudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xyXG4gICAgICAgICAgICBkaXZFbC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcclxuICAgICAgICAgICAgZGl2RWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICAgICAgICAgIGRpdkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9qZWN0KGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChkaXZFbClcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgdG9kb0xpc3RFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICByZW5kZXJQcm9qZWN0TGFiZWwoaW5kZXgpO1xyXG4gICAgICAgIHJlbmRlclRvZG9zKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcm9qZWN0TGFiZWwgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBwcm9qZWN0TGFiZWwucGxhY2Vob2xkZXIgPSBwcm9qZWN0c0RhdGFbaW5kZXhdLnRpdGxlO1xyXG4gICAgICAgIHByb2plY3REZWxldGVCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0XCIpO1xyXG4gICAgICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgICAgIHByb2plY3QuY2xhc3NMaXN0LnJlbW92ZShcInByb2plY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBwcm9qZWN0c1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInByb2plY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgZGVmYXVsdFRvRmlyc3RUb2RvKHByb2plY3RzRGF0YVtpbmRleF0udG9kb3MsIGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcmlvcml0eSA9ICh0b2RvLCBlbCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVyZ2VudEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXJnZW50XCIpO1xyXG4gICAgICAgIGNvbnN0IGltcG9ydGFudEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW1wb3J0YW50XCIpO1xyXG4gICAgICAgIGlmICh0b2RvLnByaW9yaXR5ID09PSBcInVyZ2VudFwiKSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJ1cmdlbnQtYm9yZGVyXCIpO1xyXG4gICAgICAgICAgICB1cmdlbnRCdG4uY2xhc3NMaXN0LmFkZChcInVyZ2VudFwiKVxyXG4gICAgICAgICAgICBpZiAoaW1wb3J0YW50QnRuLmNsYXNzTGlzdC5jb250YWlucyhcImltcG9ydGFudFwiKSkge1xyXG4gICAgICAgICAgICAgICAgaW1wb3J0YW50QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJpbXBvcnRhbnRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRvZG8ucHJpb3JpdHkgPT09IFwiaW1wb3J0YW50XCIpIHtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImltcG9ydGFudC1ib3JkZXJcIik7XHJcbiAgICAgICAgICAgIGltcG9ydGFudEJ0bi5jbGFzc0xpc3QuYWRkKFwiaW1wb3J0YW50XCIpXHJcbiAgICAgICAgICAgIGlmICh1cmdlbnRCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwidXJnZW50XCIpKSB7XHJcbiAgICAgICAgICAgICAgICB1cmdlbnRCdG4uY2xhc3NMaXN0LnJlbW92ZShcInVyZ2VudFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlZGl0UHJvamVjdFRpdGxlID0gKGUpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNzc3NzXCIpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc3QgZWRpdFRvZG9UaXRsZSA9ICgpID0+IHtcclxuXHJcbiAgICAvLyB9XHJcblxyXG4gICAgZnVuY3Rpb24gRXZlbnRzQ29udHJvbGxlcigpIHtcclxuICAgICAgICBjb25zdCBhZGRUb2RvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWJ0blwiKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0c0FkZEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1hZGRcIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNUaXRsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1cIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy10aXRsZS1pbnB1dFwiKVxyXG4gICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkaWFsb2dcIik7XHJcbiAgICAgICAgY29uc3QgY2FuY2VsUHJvamVjdERpYWxvZ0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1mb3JtLWNhbmNlbC1idG5cIik7XHJcbiAgICAgICAgY29uc3QgdXJnZW50QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1cmdlbnRcIik7XHJcbiAgICAgICAgY29uc3QgaW1wb3J0YW50QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbXBvcnRhbnRcIik7XHJcbiAgICAgICAgY29uc3QgdG9kb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvXCIpO1xyXG4gICAgICAgIGNvbnN0IGNsZWFyUHJpb3JpdHlFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjbGVhci1wcmlvcml0eVwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVuZGVyUHJvamVjdHNIYW5kbGVyID0gKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBwcm9qZWN0cy5hZGRUb2RvTGlzdChwcm9qZWN0c1RpdGxlSW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICByZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgICAgICAgICBwcm9qZWN0c1RpdGxlRm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgIG1vZGFsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZW5kZXJUb2Rvc0hhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhZGRUb2RvSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWlucHV0XCIpXHJcbiAgICAgICAgICAgIGNvbnN0IHRvZG9MaXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdG9kb0xpc3RFbC5pZDtcclxuICAgICAgICAgICAgbGV0IHRvZG9WYWwgPSBhZGRUb2RvSW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCB0b2RvbGlzdCA9IHByb2plY3RzRGF0YVtpbmRleF07XHJcbiAgICAgICAgICAgIHRvZG9saXN0LmFkZFRvZG8odG9kb1ZhbCk7XHJcbiAgICAgICAgICAgIHJlbmRlclRvZG9zKGluZGV4KTtcclxuICAgICAgICAgICAgYWRkVG9kb0lucHV0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RIYW5kbGVyID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHByb2plY3RzLmRlbGV0ZVRvZG9MaXN0KGluZGV4KTtcclxuICAgICAgICAgICAgcHJvamVjdExhYmVsLnBsYWNlaG9sZGVyID0gXCJcIjtcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdHMoKTtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb3MoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlUHJpb3JpdHlIYW5kbGVyID0gKHByb2plY3RJbmRleCwgdG9kb0luZGV4LCBwcmlvcml0eSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFByb2plY3QgPSBwcm9qZWN0cy5nZXRDdXJyZW50UHJvamVjdChwcm9qZWN0SW5kZXgpXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0LnNldFRvZG9Qcmlvcml0eSh0b2RvSW5kZXgsIHByaW9yaXR5KTtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb3MocHJvamVjdEluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb2plY3RMYWJlbC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiBlZGl0UHJvamVjdFRpdGxlKGUpKTtcclxuXHJcbiAgICAgICAgcHJvamVjdERlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGRlbGV0ZVByb2plY3RIYW5kbGVyKGUudGFyZ2V0LmlkKSk7XHJcblxyXG4gICAgICAgIHByb2plY3RzQWRkRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBtb2RhbC5zaG93TW9kYWwoKSk7XHJcblxyXG4gICAgICAgIGNhbmNlbFByb2plY3REaWFsb2dCb3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBtb2RhbC5jbG9zZSgpKTtcclxuXHJcbiAgICAgICAgcHJvamVjdHNUaXRsZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCByZW5kZXJQcm9qZWN0c0hhbmRsZXIpXHJcblxyXG4gICAgICAgIGFkZFRvZG9FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVuZGVyVG9kb3NIYW5kbGVyKVxyXG5cclxuICAgICAgICB1cmdlbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB1cGRhdGVQcmlvcml0eUhhbmRsZXIodG9kb0xpc3RFbC5pZCwgdG9kb0VsLmlkLCBcInVyZ2VudFwiKSlcclxuICAgICAgICBpbXBvcnRhbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB1cGRhdGVQcmlvcml0eUhhbmRsZXIodG9kb0xpc3RFbC5pZCwgdG9kb0VsLmlkLCBcImltcG9ydGFudFwiKSlcclxuICAgIH1cclxuXHJcbiAgICBFdmVudHNDb250cm9sbGVyKCk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgVmlld0NvbnRyb2xsZXIgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9kb0xpc3QgfSBmcm9tIFwiLi9Ub2RvTGlzdFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0cyB9IGZyb20gXCIuL1Byb2plY3RzXCI7XHJcbmltcG9ydCB7IFZpZXdDb250cm9sbGVyIH0gZnJvbSBcIi4vVmlld0NvbnRyb2xsZXJcIjtcclxuXHJcblxyXG4vLyBjb25zdCBsaXN0ID0gbmV3IFRvZG9MaXN0KFwiRmlyc3QgbGlzdFwiKTtcclxuLy8gbGlzdC5hZGRUb2RvKFwiaGVsbG9cIik7XHJcbi8vIGxpc3QuYWRkVG9kbyhcIndvcmxkXCIpO1xyXG4vLyBsaXN0LmVkaXRUb2RvKDEsIFwiYWdhaW5cIik7XHJcbi8vIC8vIGNvbnNvbGUubG9nKGxpc3QpO1xyXG4vLyAvLyBsaXN0LmRlbGV0ZVRvZG8oMSk7XHJcbi8vIGNvbnNvbGUubG9nKGxpc3QpO1xyXG4vLyBjb25zdCBsaXN0VHdvID0gbmV3IFRvZG9MaXN0KFwiU2Vjb25kIGxpc3RcIik7XHJcbi8vIGxpc3RUd28uYWRkVG9kbyhcIm51bWJlcjJcIilcclxuLy8gbGlzdFR3by5zZXRUb2RvUHJpb3JpdHkoMCwgXCJJbXBvcnRhbnRcIik7XHJcbi8vIGxpc3RUd28uc2V0RHVlRGF0ZSgwLCBEYXRlLm5vdygpKTtcclxuLy8gY29uc29sZS5sb2cobGlzdFR3byk7XHJcblxyXG4vLyBsZXQgcHJvamVjdHMgPSBuZXcgUHJvamVjdHMoKTtcclxuLy8gcHJvamVjdHMuYWRkVG9kb0xpc3QobGlzdCk7XHJcbi8vIHByb2plY3RzLmFkZFRvZG9MaXN0KGxpc3RUd28pXHJcbi8vIGNvbnNvbGUubG9nKHByb2plY3RzKTtcclxuXHJcblZpZXdDb250cm9sbGVyKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==