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
                    <label for="dueDate">Due date:</label>
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

        // const updatePriorityHandler = (projectIndex, todoIndex, priority) => {
        //     console.log("test");
        //     // let currentProject = projects.getCurrentProject(projectIndex)
        //     // currentProject.setTodoPriority(todoIndex, priority);
        //     // renderTodos(projectIndex);
        // }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN0T0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ0E7QUFDWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvUHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1RvZG9MaXN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9WaWV3Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9kb0xpc3QgfSBmcm9tIFwiLi9Ub2RvTGlzdFwiO1xyXG5jbGFzcyBQcm9qZWN0cyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL0NvbnRhaW5zIGxpc3Qgb2YgdG9kbyBsaXN0cy5cclxuICAgICAgICB0aGlzLnByb2plY3RzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9kb0xpc3QodG9kb2xpc3QpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IG5ldyBUb2RvTGlzdCh0b2RvbGlzdClcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobGlzdClcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUb2RvTGlzdChpZCkge1xyXG4gICAgICAgIGxldCBuZXdQcm9qZWN0TGlzdCA9IHRoaXMucHJvamVjdHMuc3BsaWNlKGlkLCAxKTtcclxuICAgICAgICByZXR1cm4gbmV3UHJvamVjdExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudFByb2plY3QoaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1tpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJvamVjdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFByb2plY3RzIH0iLCJjbGFzcyBUb2RvIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlLFxyXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gZmFsc2UsXHJcbiAgICAgICAgdGhpcy5ub3RlcyA9IFwiXCIsXHJcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRvZG8gfSIsImltcG9ydCB7IFRvZG8gfSBmcm9tIFwiLi9Ub2RvXCI7XHJcblxyXG5jbGFzcyBUb2RvTGlzdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLnRvZG9zID0gW107XHJcbiAgICAgICAgdGhpcy5pZDtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvKC4uLnRvZG8pIHtcclxuICAgICAgICBsZXQgbmV3VG9kbyA9IG5ldyBUb2RvKC4uLnRvZG8pO1xyXG4gICAgICAgIHRoaXMudG9kb3MucHVzaChuZXdUb2RvKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRvZG9zKVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVRvZG8oaWQpIHtcclxuICAgICAgICBsZXQgbmV3VG9kb0xpc3QgPSB0aGlzLnRvZG9zLnNwbGljZShpZCwgMSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1RvZG9MaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRUb2RvKGlkLCB0aXRsZSkge1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG9kb1ByaW9yaXR5KGlkKSB7XHJcbiAgICAgICAgaWQgPSBwYXJzZUludChpZCk7XHJcbiAgICAgICAgbGV0IHRvZG8gPSB0aGlzLnRvZG9zLmZpbmQoKHRvZG8sIGluZGV4KSA9PiBpbmRleCA9PT0gaWQpO1xyXG4gICAgICAgIHRvZG8ucHJpb3JpdHkgPSAhdG9kby5wcmlvcml0eTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b2RvLnByaW9yaXR5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RHVlRGF0ZShpZCwgZGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSkge1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLmR1ZURhdGUgPSBkYXRlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRUb2RvKGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3NbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IFRvZG9MaXN0IH0iLCJpbXBvcnQgeyBQcm9qZWN0cyB9IGZyb20gXCIuL1Byb2plY3RzXCI7XHJcblxyXG5mdW5jdGlvbiBWaWV3Q29udHJvbGxlcigpIHtcclxuICAgIGxldCBwcm9qZWN0cyA9IG5ldyBQcm9qZWN0cygpO1xyXG4gICAgbGV0IHByb2plY3RzRGF0YSA9IHByb2plY3RzLmdldFByb2plY3RzKCk7XHJcbiAgICBjb25zdCB0b2RvTGlzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XHJcbiAgICBjb25zdCB0b2RvQ29udGFpbmVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcHJvamVjdERlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0LWRlbGV0ZS1idG5cIik7XHJcbiAgICBjb25zdCBwcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdC10aXRsZS1pbnB1dFwiKTtcclxuICAgIGNvbnN0IHByaW9yaXR5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmlvcml0eS1idG5cIik7XHJcblxyXG4gICAgY29uc3QgcmVuZGVyVG9kb3MgPSAocHJvamVjdEluZGV4KSA9PiB7XHJcbiAgICAgICAgdG9kb0xpc3RFbC5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XTtcclxuICAgICAgICBwcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0b2RvV3JhcHBlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbGV0IGRpdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbGV0IGRlbGV0ZVRvZG9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIGRlbGV0ZVRvZG9FbC50ZXh0Q29udGVudCA9IFwiWFwiO1xyXG4gICAgICAgICAgICBkZWxldGVUb2RvRWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZVRvZG9FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZVRvZG9oYW5kbGVyKGUsIHByb2plY3RJbmRleCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRvZG9XcmFwcGVyRWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICAgICAgICAgIHRvZG9XcmFwcGVyRWwuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcclxuICAgICAgICAgICAgZGl2RWwudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xyXG4gICAgICAgICAgICBkaXZFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlclRvZG9EaXNwbGF5KHRvZG9MaXN0RWwuaWQsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVG9kbyhpbmRleCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRvZG9XcmFwcGVyRWwuYXBwZW5kQ2hpbGQoZGl2RWwpO1xyXG4gICAgICAgICAgICB0b2RvV3JhcHBlckVsLmFwcGVuZENoaWxkKGRlbGV0ZVRvZG9FbClcclxuICAgICAgICAgICAgdG9kb0xpc3RFbC5hcHBlbmRDaGlsZCh0b2RvV3JhcHBlckVsKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlZmF1bHRUb0ZpcnN0VG9kbyA9ICh0b2RvcywgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB0b2RvQ29udGFpbmVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGlmICh0b2Rvcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW5kZXJUb2RvRGlzcGxheShpbmRleCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnN0IGRpc3BsYXlUb2RvSW5mbyA9IChwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCkgPT4ge1xyXG4gICAgLy8gICAgIGNvbnN0IHRvZG9UaXRsZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLXRpdGxlLWlucHV0XCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IHRvZG9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb1wiKVxyXG4gICAgLy8gICAgIHRvZG9FbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHt0b2RvSW5kZXh9YCk7XHJcbiAgICAvLyAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAvLyAgICAgbGV0IHRvZG9zID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF0udG9kb3M7XHJcbiAgICAvLyAgICAgbGV0IHRvZG8gPSB0b2Rvc1t0b2RvSW5kZXhdO1xyXG4gICAgLy8gICAgIHRvZG9UaXRsZUVsLnBsYWNlaG9sZGVyID0gdG9kby50aXRsZTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgY29uc3QgcmVuZGVyVG9kb0Rpc3BsYXkgPSAocHJvamVjdEluZGV4LCB0b2RvSW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgdG9kb3MgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XS50b2RvcztcclxuICAgICAgICBsZXQgdG9kbyA9IHRvZG9zW3RvZG9JbmRleF07XHJcbiAgICAgICAgdG9kb0NvbnRhaW5lckVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3Byb2plY3RJbmRleH1gKTtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb1wiIGlkPSR7dG9kb0luZGV4fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9JHt0b2RvLnRpdGxlfSBjbGFzcz1cInRvZG8tdGl0bGUtaW5wdXRcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpb3JpdHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicHJpb3JpdHktYnRuXCI+UHJpb3JpdHk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHVlRGF0ZVwiPkR1ZSBkYXRlOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgaWQ9XCJkdWVcIiBuYW1lPVwiZHVlRGF0ZVwiIHZhbHVlPVwiMjAxOC0wNy0yMlwiIG1pbj1cIjIwMTgtMDEtMDFcIiBtYXg9XCIyMDE4LTEyLTMxXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGVzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+Tk9URVM8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCI1XCIgcGxhY2Vob2xkZXI9XCJJbnNlcnQgeW91ciBub3RlcyBoZXJlLi4uXCI+JHt0b2RvLm5vdGVzfTwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+IGBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoaWRlVG9kb0luZm8gPSAoKSA9PiB7XHJcbiAgICAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZFRvZG8gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB0b2RvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1pdGVtXCIpO1xyXG4gICAgICAgIHRvZG9zLmZvckVhY2godG9kbyA9PiB7XHJcbiAgICAgICAgICAgIHRvZG8uY2xhc3NMaXN0LnJlbW92ZShcInByb2plY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0b2Rvc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInByb2plY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVsZXRlVG9kb2hhbmRsZXIgPSAoZSwgcHJvamVjdEluZGV4KSA9PiB7XHJcbiAgICAgICAgLy9Qcm9qZWN0IGluZGV4IGFuZCB0b2RvIGluZGV4XHJcbiAgICAgICAgbGV0IHRvZG9JbmRleCA9IGUudGFyZ2V0LmlkXHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0SW5kZXgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3QpO1xyXG4gICAgICAgIHByb2plY3QuZGVsZXRlVG9kbyh0b2RvSW5kZXgpO1xyXG4gICAgICAgIGhpZGVUb2RvSW5mbygpO1xyXG4gICAgICAgIHJlbmRlclRvZG9zKHByb2plY3RJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzXCIpO1xyXG4gICAgICAgIHByb2plY3RzRGl2LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHByb2plY3RzID0gcHJvamVjdHNEYXRhLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkaXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGRpdkVsLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgICAgICAgICAgZGl2RWwuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XHJcbiAgICAgICAgICAgIGRpdkVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgICAgICAgICBkaXZFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFByb2plY3QoaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcHJvamVjdHNEaXYuYXBwZW5kQ2hpbGQoZGl2RWwpXHJcbiAgICAgICAgICAgIHJlbmRlclByb2plY3QoaW5kZXgpO1xyXG4gICAgICAgICAgICBzZWxlY3RlZFByb2plY3QoaW5kZXgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIHRvZG9MaXN0RWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICAgICAgcmVuZGVyUHJvamVjdExhYmVsKGluZGV4KTtcclxuICAgICAgICByZW5kZXJUb2RvcyhpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdExhYmVsID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgcHJvamVjdExhYmVsLnBsYWNlaG9sZGVyID0gcHJvamVjdHNEYXRhW2luZGV4XS50aXRsZTtcclxuICAgICAgICBwcm9qZWN0RGVsZXRlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcclxuICAgICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcHJvamVjdHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgIGRlZmF1bHRUb0ZpcnN0VG9kbyhwcm9qZWN0c0RhdGFbaW5kZXhdLnRvZG9zLCBpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJpb3JpdHkgPSAodG9kbywgZWwpID0+IHtcclxuICAgXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy8gY29uc3QgZWRpdFByb2plY3RUaXRsZSA9ICgpID0+IHtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhcInNzc3NzXCIpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGNvbnN0IGVkaXRUb2RvVGl0bGUgPSAoKSA9PiB7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIGZ1bmN0aW9uIEV2ZW50c0NvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgY29uc3QgYWRkVG9kb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdG9kby1idG5cIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNBZGRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMtYWRkXCIpO1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RzVGl0bGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtXCIpO1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RzVGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtdGl0bGUtaW5wdXRcIilcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlhbG9nXCIpO1xyXG4gICAgICAgIGNvbnN0IGNhbmNlbFByb2plY3REaWFsb2dCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtZm9ybS1jYW5jZWwtYnRuXCIpO1xyXG4gICAgICAgIGNvbnN0IHRvZG9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kb1wiKTtcclxuICAgICAgICAvLyBjb25zdCBjbGVhclByaW9yaXR5RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2xlYXItcHJpb3JpdHlcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlbmRlclByb2plY3RzSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcHJvamVjdHMuYWRkVG9kb0xpc3QocHJvamVjdHNUaXRsZUlucHV0LnZhbHVlKTtcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdHMoKTtcclxuICAgICAgICAgICAgcHJvamVjdHNUaXRsZUZvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICBtb2RhbC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVuZGVyVG9kb3NIYW5kbGVyID0gKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYWRkVG9kb0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdG9kby1pbnB1dFwiKVxyXG4gICAgICAgICAgICBjb25zdCB0b2RvTGlzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRvZG9MaXN0RWwuaWQ7XHJcbiAgICAgICAgICAgIGxldCB0b2RvVmFsID0gYWRkVG9kb0lucHV0LnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgdG9kb2xpc3QgPSBwcm9qZWN0c0RhdGFbaW5kZXhdO1xyXG4gICAgICAgICAgICB0b2RvbGlzdC5hZGRUb2RvKHRvZG9WYWwpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2RvcyhpbmRleCk7XHJcbiAgICAgICAgICAgIGFkZFRvZG9JbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWxldGVQcm9qZWN0SGFuZGxlciA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0cy5kZWxldGVUb2RvTGlzdChpbmRleCk7XHJcbiAgICAgICAgICAgIHByb2plY3RMYWJlbC5wbGFjZWhvbGRlciA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJlbmRlclByb2plY3RzKCk7XHJcbiAgICAgICAgICAgIHJlbmRlclRvZG9zKGluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnN0IHVwZGF0ZVByaW9yaXR5SGFuZGxlciA9IChwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCwgcHJpb3JpdHkpID0+IHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJ0ZXN0XCIpO1xyXG4gICAgICAgIC8vICAgICAvLyBsZXQgY3VycmVudFByb2plY3QgPSBwcm9qZWN0cy5nZXRDdXJyZW50UHJvamVjdChwcm9qZWN0SW5kZXgpXHJcbiAgICAgICAgLy8gICAgIC8vIGN1cnJlbnRQcm9qZWN0LnNldFRvZG9Qcmlvcml0eSh0b2RvSW5kZXgsIHByaW9yaXR5KTtcclxuICAgICAgICAvLyAgICAgLy8gcmVuZGVyVG9kb3MocHJvamVjdEluZGV4KTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZVByaW9yaXR5SGFuZGxlciA9IChwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFByb2plY3QgPSBwcm9qZWN0cy5nZXRDdXJyZW50UHJvamVjdChwcm9qZWN0SW5kZXgpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0KTtcclxuICAgICAgICAgICAgY3VycmVudFByb2plY3Quc2V0VG9kb1ByaW9yaXR5KHRvZG9JbmRleCk7XHJcbiAgICAgICAgICAgIHJlbmRlclRvZG9zKHByb2plY3RJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9qZWN0TGFiZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4gZWRpdFByb2plY3RUaXRsZShlKSk7XHJcblxyXG4gICAgICAgIHByb2plY3REZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBkZWxldGVQcm9qZWN0SGFuZGxlcihlLnRhcmdldC5pZCkpO1xyXG5cclxuICAgICAgICBwcm9qZWN0c0FkZEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gbW9kYWwuc2hvd01vZGFsKCkpO1xyXG5cclxuICAgICAgICBjYW5jZWxQcm9qZWN0RGlhbG9nQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gbW9kYWwuY2xvc2UoKSk7XHJcblxyXG4gICAgICAgIHByb2plY3RzVGl0bGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgcmVuZGVyUHJvamVjdHNIYW5kbGVyKVxyXG5cclxuICAgICAgICBhZGRUb2RvRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlbmRlclRvZG9zSGFuZGxlcilcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5QnRuID0gZS50YXJnZXQubWF0Y2hlcyhcIi5wcmlvcml0eS1idG5cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpb3JpdHktYnRuXCIpO1xyXG4gICAgICAgICAgICBpZiAocHJpb3JpdHlCdG4pIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVByaW9yaXR5SGFuZGxlcih0b2RvTGlzdEVsLmlkLCBidG4ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIEV2ZW50c0NvbnRyb2xsZXIoKTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBWaWV3Q29udHJvbGxlciB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUb2RvTGlzdCB9IGZyb20gXCIuL1RvZG9MaXN0XCI7XHJcbmltcG9ydCB7IFByb2plY3RzIH0gZnJvbSBcIi4vUHJvamVjdHNcIjtcclxuaW1wb3J0IHsgVmlld0NvbnRyb2xsZXIgfSBmcm9tIFwiLi9WaWV3Q29udHJvbGxlclwiO1xyXG5cclxuXHJcbi8vIGNvbnN0IGxpc3QgPSBuZXcgVG9kb0xpc3QoXCJGaXJzdCBsaXN0XCIpO1xyXG4vLyBsaXN0LmFkZFRvZG8oXCJoZWxsb1wiKTtcclxuLy8gbGlzdC5hZGRUb2RvKFwid29ybGRcIik7XHJcbi8vIGxpc3QuZWRpdFRvZG8oMSwgXCJhZ2FpblwiKTtcclxuLy8gLy8gY29uc29sZS5sb2cobGlzdCk7XHJcbi8vIC8vIGxpc3QuZGVsZXRlVG9kbygxKTtcclxuLy8gY29uc29sZS5sb2cobGlzdCk7XHJcbi8vIGNvbnN0IGxpc3RUd28gPSBuZXcgVG9kb0xpc3QoXCJTZWNvbmQgbGlzdFwiKTtcclxuLy8gbGlzdFR3by5hZGRUb2RvKFwibnVtYmVyMlwiKVxyXG4vLyBsaXN0VHdvLnNldFRvZG9Qcmlvcml0eSgwLCBcIkltcG9ydGFudFwiKTtcclxuLy8gbGlzdFR3by5zZXREdWVEYXRlKDAsIERhdGUubm93KCkpO1xyXG4vLyBjb25zb2xlLmxvZyhsaXN0VHdvKTtcclxuXHJcbi8vIGxldCBwcm9qZWN0cyA9IG5ldyBQcm9qZWN0cygpO1xyXG4vLyBwcm9qZWN0cy5hZGRUb2RvTGlzdChsaXN0KTtcclxuLy8gcHJvamVjdHMuYWRkVG9kb0xpc3QobGlzdFR3bylcclxuLy8gY29uc29sZS5sb2cocHJvamVjdHMpO1xyXG5cclxuVmlld0NvbnRyb2xsZXIoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9