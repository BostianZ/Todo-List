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

    setDueDate(id, date) {
        id = parseInt(id);
        console.log(date);
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
                <div class="todo-date-wrapper">
                    <label for="dueDate" class="todo-date-label">Due date:</label>
                    <input class="todo-date" type="date" id="due" name="dueDate"  value=${todo.dueDate}/>
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

        projectLabel.addEventListener("change", (e) => editProjectTitle(e));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3pRQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDQTtBQUNZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBYyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Qcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1ZpZXdDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2RvTGlzdCB9IGZyb20gXCIuL1RvZG9MaXN0XCI7XHJcbmNsYXNzIFByb2plY3RzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vQ29udGFpbnMgbGlzdCBvZiB0b2RvIGxpc3RzLlxyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvTGlzdCh0b2RvbGlzdCkge1xyXG4gICAgICAgIGxldCBsaXN0ID0gbmV3IFRvZG9MaXN0KHRvZG9saXN0KVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChsaXN0KVxyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVRvZG9MaXN0KGlkKSB7XHJcbiAgICAgICAgbGV0IG5ld1Byb2plY3RMaXN0ID0gdGhpcy5wcm9qZWN0cy5zcGxpY2UoaWQsIDEpO1xyXG4gICAgICAgIHJldHVybiBuZXdQcm9qZWN0TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJyZW50UHJvamVjdChpbmRleCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9qZWN0cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUHJvamVjdHMgfSIsImNsYXNzIFRvZG8ge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXHJcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gXCJcIixcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gZmFsc2UsXHJcbiAgICAgICAgdGhpcy5ub3RlcyA9IFwiXCIsXHJcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFRvZG8gfSIsImltcG9ydCB7IFRvZG8gfSBmcm9tIFwiLi9Ub2RvXCI7XHJcblxyXG5jbGFzcyBUb2RvTGlzdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLnRvZG9zID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9kbyguLi50b2RvKSB7XHJcbiAgICAgICAgbGV0IG5ld1RvZG8gPSBuZXcgVG9kbyguLi50b2RvKTtcclxuICAgICAgICB0aGlzLnRvZG9zLnB1c2gobmV3VG9kbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50b2RvcylcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUb2RvKGlkKSB7XHJcbiAgICAgICAgbGV0IG5ld1RvZG9MaXN0ID0gdGhpcy50b2Rvcy5zcGxpY2UoaWQsIDEpO1xyXG4gICAgICAgIHJldHVybiBuZXdUb2RvTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBlZGl0VG9kbyhpZCwgdGl0bGUpIHtcclxuICAgICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb3MuZmluZCgodG9kbywgaW5kZXgpID0+IGluZGV4ID09PSBpZCk7XHJcbiAgICAgICAgdG9kby50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRvZG9Qcmlvcml0eShpZCkge1xyXG4gICAgICAgIGlkID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLnByaW9yaXR5ID0gIXRvZG8ucHJpb3JpdHk7XHJcbiAgICAgICAgY29uc29sZS5sb2codG9kby5wcmlvcml0eSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHNldER1ZURhdGUoaWQsIGRhdGUpIHtcclxuICAgICAgICBpZCA9IHBhcnNlSW50KGlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRlKTtcclxuICAgICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb3MuZmluZCgodG9kbywgaW5kZXgpID0+IGluZGV4ID09PSBpZCk7XHJcbiAgICAgICAgdG9kby5kdWVEYXRlID0gZGF0ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvTm90ZXMoaWQsIHZhbCkge1xyXG4gICAgICAgIGlkID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b2RvKTtcclxuICAgICAgICB0b2RvLm5vdGVzID0gdmFsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRUb2RvKGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3NbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IFRvZG9MaXN0IH0iLCJpbXBvcnQgeyBQcm9qZWN0cyB9IGZyb20gXCIuL1Byb2plY3RzXCI7XHJcblxyXG5mdW5jdGlvbiBWaWV3Q29udHJvbGxlcigpIHtcclxuICAgIGxldCBwcm9qZWN0cyA9IG5ldyBQcm9qZWN0cygpO1xyXG4gICAgbGV0IHByb2plY3RzRGF0YSA9IHByb2plY3RzLmdldFByb2plY3RzKCk7XHJcbiAgICBjb25zdCB0b2RvTGlzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XHJcbiAgICBjb25zdCB0b2RvQ29udGFpbmVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgcHJvamVjdERlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0LWRlbGV0ZS1idG5cIik7XHJcbiAgICBjb25zdCBwcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdC10aXRsZS1pbnB1dFwiKTtcclxuICAgIGNvbnN0IHByaW9yaXR5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmlvcml0eS1idG5cIik7XHJcblxyXG4gICAgY29uc3QgcmVuZGVyVG9kb3MgPSAocHJvamVjdEluZGV4KSA9PiB7XHJcbiAgICAgICAgdG9kb0xpc3RFbC5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XTtcclxuICAgICAgICBwcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0b2RvV3JhcHBlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbGV0IGRpdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgbGV0IGRlbGV0ZVRvZG9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIGRlbGV0ZVRvZG9FbC50ZXh0Q29udGVudCA9IFwiWFwiO1xyXG4gICAgICAgICAgICBkZWxldGVUb2RvRWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZVRvZG9FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZVRvZG9oYW5kbGVyKGUsIHByb2plY3RJbmRleCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRvZG9XcmFwcGVyRWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICAgICAgICAgIHRvZG9XcmFwcGVyRWwuY2xhc3NMaXN0LmFkZChcInRvZG8taXRlbVwiKTtcclxuICAgICAgICAgICAgZGl2RWwudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xyXG4gICAgICAgICAgICBkaXZFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlclRvZG9EaXNwbGF5KHRvZG9MaXN0RWwuaWQsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVG9kbyhpbmRleCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJlbmRlclByaW9yaXR5KHRvZG8sIGRpdkVsKTtcclxuICAgICAgICAgICAgdG9kb1dyYXBwZXJFbC5hcHBlbmRDaGlsZChkaXZFbCk7XHJcbiAgICAgICAgICAgIHRvZG9XcmFwcGVyRWwuYXBwZW5kQ2hpbGQoZGVsZXRlVG9kb0VsKVxyXG4gICAgICAgICAgICB0b2RvTGlzdEVsLmFwcGVuZENoaWxkKHRvZG9XcmFwcGVyRWwpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVmYXVsdFRvRmlyc3RUb2RvID0gKHRvZG9zLCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRvZG9Db250YWluZXJFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1jb250YWluZXJcIik7XHJcbiAgICAgICAgaWYgKHRvZG9zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0b2RvQ29udGFpbmVyRWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlbmRlclRvZG9EaXNwbGF5KGluZGV4LCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc3QgZGlzcGxheVRvZG9JbmZvID0gKHByb2plY3RJbmRleCwgdG9kb0luZGV4KSA9PiB7XHJcbiAgICAvLyAgICAgY29uc3QgdG9kb1RpdGxlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tdGl0bGUtaW5wdXRcIik7XHJcbiAgICAvLyAgICAgY29uc3QgdG9kb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvXCIpXHJcbiAgICAvLyAgICAgdG9kb0VsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3RvZG9JbmRleH1gKTtcclxuICAgIC8vICAgICB0b2RvQ29udGFpbmVyRWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIC8vICAgICBsZXQgdG9kb3MgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XS50b2RvcztcclxuICAgIC8vICAgICBsZXQgdG9kbyA9IHRvZG9zW3RvZG9JbmRleF07XHJcbiAgICAvLyAgICAgdG9kb1RpdGxlRWwucGxhY2Vob2xkZXIgPSB0b2RvLnRpdGxlO1xyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICBjb25zdCByZW5kZXJUb2RvRGlzcGxheSA9IChwcm9qZWN0SW5kZXgsIHRvZG9JbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCB0b2RvcyA9IHByb2plY3RzRGF0YVtwcm9qZWN0SW5kZXhdLnRvZG9zO1xyXG4gICAgICAgIGxldCB0b2RvID0gdG9kb3NbdG9kb0luZGV4XTtcclxuICAgICAgICB0b2RvQ29udGFpbmVyRWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7cHJvamVjdEluZGV4fWApO1xyXG4gICAgICAgIHRvZG9Db250YWluZXJFbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIHRvZG9Db250YWluZXJFbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvXCIgaWQ9JHt0b2RvSW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj0ke3RvZG8udGl0bGV9IGNsYXNzPVwidG9kby10aXRsZS1pbnB1dFwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmlvcml0eVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJwcmlvcml0eS1idG5cIj5Qcmlvcml0eTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1kYXRlLXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHVlRGF0ZVwiIGNsYXNzPVwidG9kby1kYXRlLWxhYmVsXCI+RHVlIGRhdGU6PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJ0b2RvLWRhdGVcIiB0eXBlPVwiZGF0ZVwiIGlkPVwiZHVlXCIgbmFtZT1cImR1ZURhdGVcIiAgdmFsdWU9JHt0b2RvLmR1ZURhdGV9Lz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5vdGVzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+Tk9URVM8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCI4XCIgY2xhc3M9XCJ0b2RvLW5vdGVzXCI+JHt0b2RvLm5vdGVzfTwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+IGBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoaWRlVG9kb0luZm8gPSAoKSA9PiB7XHJcbiAgICAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZFRvZG8gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB0b2RvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1pdGVtXCIpO1xyXG4gICAgICAgIHRvZG9zLmZvckVhY2godG9kbyA9PiB7XHJcbiAgICAgICAgICAgIHRvZG8uY2xhc3NMaXN0LnJlbW92ZShcInByb2plY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0b2Rvc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInByb2plY3Qtc2VsZWN0ZWRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVsZXRlVG9kb2hhbmRsZXIgPSAoZSwgcHJvamVjdEluZGV4KSA9PiB7XHJcbiAgICAgICAgLy9Qcm9qZWN0IGluZGV4IGFuZCB0b2RvIGluZGV4XHJcbiAgICAgICAgbGV0IHRvZG9JbmRleCA9IGUudGFyZ2V0LmlkXHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0SW5kZXgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3QpO1xyXG4gICAgICAgIHByb2plY3QuZGVsZXRlVG9kbyh0b2RvSW5kZXgpO1xyXG4gICAgICAgIGhpZGVUb2RvSW5mbygpO1xyXG4gICAgICAgIHJlbmRlclRvZG9zKHByb2plY3RJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzXCIpO1xyXG4gICAgICAgIHByb2plY3RzRGl2LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHByb2plY3RzID0gcHJvamVjdHNEYXRhLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkaXZFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGRpdkVsLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgICAgICAgICAgZGl2RWwuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XHJcbiAgICAgICAgICAgIGRpdkVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgICAgICAgICBkaXZFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFByb2plY3QoaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcHJvamVjdHNEaXYuYXBwZW5kQ2hpbGQoZGl2RWwpXHJcbiAgICAgICAgICAgIHJlbmRlclByb2plY3QoaW5kZXgpO1xyXG4gICAgICAgICAgICBzZWxlY3RlZFByb2plY3QoaW5kZXgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIHRvZG9MaXN0RWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICAgICAgcmVuZGVyUHJvamVjdExhYmVsKGluZGV4KTtcclxuICAgICAgICByZW5kZXJUb2RvcyhpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdExhYmVsID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgcHJvamVjdExhYmVsLnBsYWNlaG9sZGVyID0gcHJvamVjdHNEYXRhW2luZGV4XS50aXRsZTtcclxuICAgICAgICBwcm9qZWN0RGVsZXRlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2luZGV4fWApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcclxuICAgICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgICAgICBwcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcHJvamVjdHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgIGRlZmF1bHRUb0ZpcnN0VG9kbyhwcm9qZWN0c0RhdGFbaW5kZXhdLnRvZG9zLCBpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJpb3JpdHkgPSAodG9kbywgZWwpID0+IHtcclxuICAgICAgIGlmICh0b2RvLnByaW9yaXR5ID09PSB0cnVlKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5LXRydWVcIik7XHJcbiAgICAgICB9IGVsc2UgaWYgKHRvZG8ucHJpb3JpdHkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcInByaW9yaXR5LXRydWVcIik7XHJcbiAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy8gY29uc3QgZWRpdFByb2plY3RUaXRsZSA9ICgpID0+IHtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhcInNzc3NzXCIpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGNvbnN0IGVkaXRUb2RvVGl0bGUgPSAoKSA9PiB7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIGZ1bmN0aW9uIEV2ZW50c0NvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgY29uc3QgYWRkVG9kb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdG9kby1idG5cIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNBZGRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMtYWRkXCIpO1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RzVGl0bGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtXCIpO1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RzVGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtdGl0bGUtaW5wdXRcIilcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlhbG9nXCIpO1xyXG4gICAgICAgIGNvbnN0IGNhbmNlbFByb2plY3REaWFsb2dCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtZm9ybS1jYW5jZWwtYnRuXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBzZXRUb2RvRGF0ZUhhbmRsZXIgPSAoZSwgcHJvamVjdEluZGV4LCB0b2RvSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICBsZXQgZGF0ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgdG9kb0xpc3QgPSBwcm9qZWN0c0RhdGFbcHJvamVjdEluZGV4XTtcclxuICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvZG9MaXN0KTtcclxuICAgICAgICAgICAgdG9kb0xpc3Quc2V0RHVlRGF0ZSh0b2RvSW5kZXgsIGRhdGUpXHJcbiAgICAgICAgICAgIHJlbmRlclRvZG9EaXNwbGF5KHByb2plY3RJbmRleCwgdG9kb0luZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGFkZFRvZG9Ob3Rlc0hhbmRsZXIgPSAoZSwgcHJvamVjdEluZGV4LCB0b2RvSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQudmFsdWUpXHJcbiAgICAgICAgICAgIGxldCB2YWwgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IHRvZG9MaXN0ID0gcHJvamVjdHNEYXRhW3Byb2plY3RJbmRleF07XHJcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0b2RvTGlzdCk7XHJcbiAgICAgICAgICAgIHRvZG9MaXN0LmFkZFRvZG9Ob3Rlcyh0b2RvSW5kZXgsIHZhbClcclxuICAgICAgICAgICAgcmVuZGVyVG9kb0Rpc3BsYXkocHJvamVjdEluZGV4LCB0b2RvSW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVuZGVyUHJvamVjdHNIYW5kbGVyID0gKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBwcm9qZWN0cy5hZGRUb2RvTGlzdChwcm9qZWN0c1RpdGxlSW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICByZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgICAgICAgICBwcm9qZWN0c1RpdGxlRm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgIG1vZGFsLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZW5kZXJUb2Rvc0hhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhZGRUb2RvSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWlucHV0XCIpXHJcbiAgICAgICAgICAgIGNvbnN0IHRvZG9MaXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdG9kb0xpc3RFbC5pZDtcclxuICAgICAgICAgICAgbGV0IHRvZG9WYWwgPSBhZGRUb2RvSW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCB0b2RvbGlzdCA9IHByb2plY3RzRGF0YVtpbmRleF07XHJcbiAgICAgICAgICAgIHRvZG9saXN0LmFkZFRvZG8odG9kb1ZhbCk7XHJcbiAgICAgICAgICAgIHJlbmRlclRvZG9zKGluZGV4KTtcclxuICAgICAgICAgICAgYWRkVG9kb0lucHV0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RIYW5kbGVyID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHByb2plY3RzLmRlbGV0ZVRvZG9MaXN0KGluZGV4KTtcclxuICAgICAgICAgICAgcHJvamVjdExhYmVsLnBsYWNlaG9sZGVyID0gXCJcIjtcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdHMoKTtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb3MoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlUHJpb3JpdHlIYW5kbGVyID0gKHByb2plY3RJbmRleCwgdG9kb0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdCA9IHByb2plY3RzLmdldEN1cnJlbnRQcm9qZWN0KHByb2plY3RJbmRleClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudFByb2plY3QpO1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvamVjdC5zZXRUb2RvUHJpb3JpdHkodG9kb0luZGV4KTtcclxuICAgICAgICAgICAgcmVuZGVyVG9kb3MocHJvamVjdEluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb2plY3RMYWJlbC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiBlZGl0UHJvamVjdFRpdGxlKGUpKTtcclxuXHJcbiAgICAgICAgcHJvamVjdERlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGRlbGV0ZVByb2plY3RIYW5kbGVyKGUudGFyZ2V0LmlkKSk7XHJcblxyXG4gICAgICAgIHByb2plY3RzQWRkRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBtb2RhbC5zaG93TW9kYWwoKSk7XHJcblxyXG4gICAgICAgIGNhbmNlbFByb2plY3REaWFsb2dCb3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBtb2RhbC5jbG9zZSgpKTtcclxuXHJcbiAgICAgICAgcHJvamVjdHNUaXRsZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCByZW5kZXJQcm9qZWN0c0hhbmRsZXIpXHJcblxyXG4gICAgICAgIGFkZFRvZG9FbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVuZGVyVG9kb3NIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5QnRuID0gZS50YXJnZXQubWF0Y2hlcyhcIi5wcmlvcml0eS1idG5cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJpb3JpdHktYnRuXCIpO1xyXG4gICAgICAgICAgICBpZiAocHJpb3JpdHlCdG4pIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2RvSW5kZXggPSBidG4ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlUHJpb3JpdHlIYW5kbGVyKHRvZG9MaXN0RWwuaWQsIHRvZG9JbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdG9kb05vdGVzRWwgPSBlLnRhcmdldC5tYXRjaGVzKFwiLnRvZG8tbm90ZXNcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHR4dEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbm90ZXNcIilcclxuICAgICAgICAgICAgaWYgKHRvZG9Ob3Rlc0VsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9kb0luZGV4ID0gdHh0QXJlYS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICBhZGRUb2RvTm90ZXNIYW5kbGVyKGUsIHRvZG9MaXN0RWwuaWQsIHRvZG9JbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGUudGFyZ2V0Lm1hdGNoZXMoXCIudG9kby1kYXRlXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tZGF0ZVwiKTtcclxuICAgICAgICAgICAgaWYgKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2RvSW5kZXggPSBkYXRlRWwucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgICAgICAgICAgc2V0VG9kb0RhdGVIYW5kbGVyKGUsIHRvZG9MaXN0RWwuaWQsIHRvZG9JbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBFdmVudHNDb250cm9sbGVyKCk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgVmlld0NvbnRyb2xsZXIgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9kb0xpc3QgfSBmcm9tIFwiLi9Ub2RvTGlzdFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0cyB9IGZyb20gXCIuL1Byb2plY3RzXCI7XHJcbmltcG9ydCB7IFZpZXdDb250cm9sbGVyIH0gZnJvbSBcIi4vVmlld0NvbnRyb2xsZXJcIjtcclxuXHJcblxyXG4vLyBjb25zdCBsaXN0ID0gbmV3IFRvZG9MaXN0KFwiRmlyc3QgbGlzdFwiKTtcclxuLy8gbGlzdC5hZGRUb2RvKFwiaGVsbG9cIik7XHJcbi8vIGxpc3QuYWRkVG9kbyhcIndvcmxkXCIpO1xyXG4vLyBsaXN0LmVkaXRUb2RvKDEsIFwiYWdhaW5cIik7XHJcbi8vIC8vIGNvbnNvbGUubG9nKGxpc3QpO1xyXG4vLyAvLyBsaXN0LmRlbGV0ZVRvZG8oMSk7XHJcbi8vIGNvbnNvbGUubG9nKGxpc3QpO1xyXG4vLyBjb25zdCBsaXN0VHdvID0gbmV3IFRvZG9MaXN0KFwiU2Vjb25kIGxpc3RcIik7XHJcbi8vIGxpc3RUd28uYWRkVG9kbyhcIm51bWJlcjJcIilcclxuLy8gbGlzdFR3by5zZXRUb2RvUHJpb3JpdHkoMCwgXCJJbXBvcnRhbnRcIik7XHJcbi8vIGxpc3RUd28uc2V0RHVlRGF0ZSgwLCBEYXRlLm5vdygpKTtcclxuLy8gY29uc29sZS5sb2cobGlzdFR3byk7XHJcblxyXG4vLyBsZXQgcHJvamVjdHMgPSBuZXcgUHJvamVjdHMoKTtcclxuLy8gcHJvamVjdHMuYWRkVG9kb0xpc3QobGlzdCk7XHJcbi8vIHByb2plY3RzLmFkZFRvZG9MaXN0KGxpc3RUd28pXHJcbi8vIGNvbnNvbGUubG9nKHByb2plY3RzKTtcclxuXHJcblZpZXdDb250cm9sbGVyKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==