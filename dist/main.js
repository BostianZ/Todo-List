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
    
    const renderTodos = (index) => {
        todoListEl.innerHTML = ""
        let project = projectsData[index];
        project.todos.forEach((todo, index) => {
            let divEl = document.createElement("div");
            divEl.setAttribute("id", `${index}`);
            divEl.classList.add("todo-item");
            divEl.textContent = todo.title;
            renderPriority(todo, divEl);
            divEl.addEventListener("click", function(e) {
                displayTodo(todoListEl.id, index);
                selectedTodo(index);
            })
        
            todoListEl.appendChild(divEl);
        })
    }

    const renderPriority = (todo, el) => {
        if (todo.priority === "urgent") {
            el.classList.add("urgent");
        } else if (todo.priority === "important") {
            el.classList.add("important");
        }
    }

    const defaultToFirstTodo = (todos, index) => {
        const todoContainerEl = document.querySelector(".todo-container");
        if (todos.length === 0) {
            todoContainerEl.style.display = "none";
        } else {
            displayTodo(index, 0);
        }
    }

    const displayTodo = (projectIndex, todoIndex) => {
        const todoContainerEl = document.querySelector(".todo-container");
        const todoTitleEl = document.querySelector(".todo-title-input");
        const todoEl = document.querySelector(".todo")
        todoEl.setAttribute("id", `${todoIndex}`);
        todoContainerEl.style.display = "block";
        let todos = projectsData[projectIndex].todos;
        let todo = todos[todoIndex];
        todoTitleEl.placeholder = todo.title;
    }

    const selectedTodo = (index) => {
        const todos = document.querySelectorAll(".todo-item");
        todos.forEach(todo => {
            todo.classList.remove("project-selected");
        })
        todos[index].classList.add("project-selected");
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

    ///user clicks on new project
    //Project highlights and displays first todo IF todos length > 0
    //Else if todos lengh === 0, display nothing.


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

        const deleteProject = (e) => {
            console.log("TEST");
            //deleting project also deletes all todo's in the project
            //can make the delete button id the same as the current project selected
        }

        const updatePriority = (projectIndex, todoIndex, priority) => {
            //Find what project
            console.log(projects);
            debugger;
            let currentProject = projects.getCurrentProject(projectIndex)
            console.log(currentProject);
            //Find the todo
            currentProject.setTodoPriority(todoIndex, priority);
            renderTodos(projectIndex);
        }


        projectDeleteBtn.addEventListener("click", deleteProject);

        projectsAddEl.addEventListener("click", (e) => modal.showModal());

        cancelProjectDialogBox.addEventListener("click", (e) => modal.close());

        projectsTitleForm.addEventListener("submit", renderProjectsHandler)
    
        addTodoEl.addEventListener("click", renderTodosHandler)

        urgentBtn.addEventListener("click", (e) => updatePriority(todoListEl.id, todoEl.id, "urgent"))
        importantBtn.addEventListener("click", (e) => updatePriority(todoListEl.id, todoEl.id, "important"))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvUHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1RvZG9MaXN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9WaWV3Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9kb0xpc3QgfSBmcm9tIFwiLi9Ub2RvTGlzdFwiO1xyXG5jbGFzcyBQcm9qZWN0cyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL0NvbnRhaW5zIGxpc3Qgb2YgdG9kbyBsaXN0cy5cclxuICAgICAgICB0aGlzLnByb2plY3RzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9kb0xpc3QodG9kb2xpc3QpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IG5ldyBUb2RvTGlzdCh0b2RvbGlzdClcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobGlzdClcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUb2RvTGlzdChpZCkge1xyXG4gICAgICAgIGxldCBuZXdQcm9qZWN0TGlzdCA9IHRoaXMucHJvamVjdHMuc3BsaWNlKGlkLCAxKTtcclxuICAgICAgICByZXR1cm4gbmV3UHJvamVjdExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudFByb2plY3QoaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1tpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJvamVjdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFByb2plY3RzIH0iLCJjbGFzcyBUb2RvIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlLFxyXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gXCJcIixcclxuICAgICAgICB0aGlzLm5vdGVzID0gXCJcIixcclxuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBUb2RvIH0iLCJpbXBvcnQgeyBUb2RvIH0gZnJvbSBcIi4vVG9kb1wiO1xyXG5cclxuY2xhc3MgVG9kb0xpc3Qge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGUsXHJcbiAgICAgICAgdGhpcy50b2RvcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9kbyguLi50b2RvKSB7XHJcbiAgICAgICAgbGV0IG5ld1RvZG8gPSBuZXcgVG9kbyguLi50b2RvKTtcclxuICAgICAgICB0aGlzLnRvZG9zLnB1c2gobmV3VG9kbyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50b2RvcylcclxuICAgICAgICByZXR1cm4gdGhpcy50b2RvcztcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUb2RvKGlkKSB7XHJcbiAgICAgICAgbGV0IG5ld1RvZG9MaXN0ID0gdGhpcy50b2Rvcy5zcGxpY2UoaWQsIDEpO1xyXG4gICAgICAgIHJldHVybiBuZXdUb2RvTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBlZGl0VG9kbyhpZCwgdGl0bGUpIHtcclxuICAgICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb3MuZmluZCgodG9kbywgaW5kZXgpID0+IGluZGV4ID09PSBpZCk7XHJcbiAgICAgICAgdG9kby50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRvZG9Qcmlvcml0eShpZCwgcHJpb3JpdHkpIHtcclxuICAgICAgICBpZCA9IHBhcnNlSW50KGlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhpZCwgcHJpb3JpdHksIHRoaXMudG9kb3MpO1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RHVlRGF0ZShpZCwgZGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSkge1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2Rvcy5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLmR1ZURhdGUgPSBkYXRlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRUb2RvKGluZGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb3NbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IFRvZG9MaXN0IH0iLCJpbXBvcnQgeyBQcm9qZWN0cyB9IGZyb20gXCIuL1Byb2plY3RzXCI7XHJcblxyXG5mdW5jdGlvbiBWaWV3Q29udHJvbGxlcigpIHtcclxuICAgIGxldCBwcm9qZWN0cyA9IG5ldyBQcm9qZWN0cygpO1xyXG4gICAgbGV0IHByb2plY3RzRGF0YSA9IHByb2plY3RzLmdldFByb2plY3RzKCk7XHJcbiAgICBjb25zdCB0b2RvTGlzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3RcIik7XHJcbiAgICBcclxuICAgIGNvbnN0IHJlbmRlclRvZG9zID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgdG9kb0xpc3RFbC5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBwcm9qZWN0c0RhdGFbaW5kZXhdO1xyXG4gICAgICAgIHByb2plY3QudG9kb3MuZm9yRWFjaCgodG9kbywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRpdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgZGl2RWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICAgICAgICAgIGRpdkVsLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWl0ZW1cIik7XHJcbiAgICAgICAgICAgIGRpdkVsLnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcclxuICAgICAgICAgICAgcmVuZGVyUHJpb3JpdHkodG9kbywgZGl2RWwpO1xyXG4gICAgICAgICAgICBkaXZFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheVRvZG8odG9kb0xpc3RFbC5pZCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRUb2RvKGluZGV4KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICAgICAgdG9kb0xpc3RFbC5hcHBlbmRDaGlsZChkaXZFbCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJQcmlvcml0eSA9ICh0b2RvLCBlbCkgPT4ge1xyXG4gICAgICAgIGlmICh0b2RvLnByaW9yaXR5ID09PSBcInVyZ2VudFwiKSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJ1cmdlbnRcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0b2RvLnByaW9yaXR5ID09PSBcImltcG9ydGFudFwiKSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJpbXBvcnRhbnRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlZmF1bHRUb0ZpcnN0VG9kbyA9ICh0b2RvcywgaW5kZXgpID0+IHtcclxuICAgICAgICBjb25zdCB0b2RvQ29udGFpbmVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGlmICh0b2Rvcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdG9kb0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaXNwbGF5VG9kbyhpbmRleCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlUb2RvID0gKHByb2plY3RJbmRleCwgdG9kb0luZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9kb0NvbnRhaW5lckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWNvbnRhaW5lclwiKTtcclxuICAgICAgICBjb25zdCB0b2RvVGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby10aXRsZS1pbnB1dFwiKTtcclxuICAgICAgICBjb25zdCB0b2RvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9cIilcclxuICAgICAgICB0b2RvRWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7dG9kb0luZGV4fWApO1xyXG4gICAgICAgIHRvZG9Db250YWluZXJFbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGxldCB0b2RvcyA9IHByb2plY3RzRGF0YVtwcm9qZWN0SW5kZXhdLnRvZG9zO1xyXG4gICAgICAgIGxldCB0b2RvID0gdG9kb3NbdG9kb0luZGV4XTtcclxuICAgICAgICB0b2RvVGl0bGVFbC5wbGFjZWhvbGRlciA9IHRvZG8udGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRUb2RvID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9kb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvZG8taXRlbVwiKTtcclxuICAgICAgICB0b2Rvcy5mb3JFYWNoKHRvZG8gPT4ge1xyXG4gICAgICAgICAgICB0b2RvLmNsYXNzTGlzdC5yZW1vdmUoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdG9kb3NbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXNlbGVjdGVkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlclByb2plY3RzID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RzRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0c1wiKTtcclxuICAgICAgICBwcm9qZWN0c0Rpdi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIGxldCBwcm9qZWN0cyA9IHByb2plY3RzRGF0YS5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGl2RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBkaXZFbC50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XHJcbiAgICAgICAgICAgIGRpdkVsLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xyXG4gICAgICAgICAgICBkaXZFbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbmRleH1gKTtcclxuICAgICAgICAgICAgZGl2RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkgeyBcclxuICAgICAgICAgICAgICAgIHJlbmRlclByb2plY3QoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0KGluZGV4KTtcclxuICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcm9qZWN0c0Rpdi5hcHBlbmRDaGlsZChkaXZFbClcclxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdChpbmRleCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0gXHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIHRvZG9MaXN0RWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7aW5kZXh9YCk7XHJcbiAgICAgICAgcmVuZGVyUHJvamVjdExhYmVsKGluZGV4KTtcclxuICAgICAgICByZW5kZXJUb2RvcyhpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUHJvamVjdExhYmVsID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdExhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3QtdGl0bGUtaW5wdXRcIik7XHJcbiAgICAgICAgcHJvamVjdExhYmVsLnBsYWNlaG9sZGVyID0gcHJvamVjdHNEYXRhW2luZGV4XS50aXRsZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XHJcbiAgICAgICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICAgICAgcHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKFwicHJvamVjdC1zZWxlY3RlZFwiKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHByb2plY3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1zZWxlY3RlZFwiKTtcclxuICAgICAgICBkZWZhdWx0VG9GaXJzdFRvZG8ocHJvamVjdHNEYXRhW2luZGV4XS50b2RvcywgaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL3VzZXIgY2xpY2tzIG9uIG5ldyBwcm9qZWN0XHJcbiAgICAvL1Byb2plY3QgaGlnaGxpZ2h0cyBhbmQgZGlzcGxheXMgZmlyc3QgdG9kbyBJRiB0b2RvcyBsZW5ndGggPiAwXHJcbiAgICAvL0Vsc2UgaWYgdG9kb3MgbGVuZ2ggPT09IDAsIGRpc3BsYXkgbm90aGluZy5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gRXZlbnRzQ29udHJvbGxlcigpIHtcclxuICAgICAgICBjb25zdCBhZGRUb2RvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWJ0blwiKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0c0FkZEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1hZGRcIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNUaXRsZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1cIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdHNUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0cy10aXRsZS1pbnB1dFwiKVxyXG4gICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkaWFsb2dcIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdERlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0LWRlbGV0ZS1idG5cIik7XHJcbiAgICAgICAgY29uc3QgY2FuY2VsUHJvamVjdERpYWxvZ0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1mb3JtLWNhbmNlbC1idG5cIik7XHJcbiAgICAgICAgY29uc3QgdXJnZW50QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1cmdlbnRcIik7XHJcbiAgICAgICAgY29uc3QgaW1wb3J0YW50QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbXBvcnRhbnRcIik7XHJcbiAgICAgICAgY29uc3QgdG9kb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvXCIpO1xyXG5cclxuICAgICAgICBjb25zdCByZW5kZXJQcm9qZWN0c0hhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHByb2plY3RzLmFkZFRvZG9MaXN0KHByb2plY3RzVGl0bGVJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgIHJlbmRlclByb2plY3RzKCk7XHJcbiAgICAgICAgICAgIHByb2plY3RzVGl0bGVGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgbW9kYWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjb25zdCByZW5kZXJUb2Rvc0hhbmRsZXIgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhZGRUb2RvSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvLWlucHV0XCIpXHJcbiAgICAgICAgICAgIGNvbnN0IHRvZG9MaXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdFwiKTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdG9kb0xpc3RFbC5pZDtcclxuICAgICAgICAgICAgbGV0IHRvZG9WYWwgPSBhZGRUb2RvSW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgIGxldCB0b2RvbGlzdCA9IHByb2plY3RzRGF0YVtpbmRleF07XHJcbiAgICAgICAgICAgIHRvZG9saXN0LmFkZFRvZG8odG9kb1ZhbCk7XHJcbiAgICAgICAgICAgIHJlbmRlclRvZG9zKGluZGV4KTtcclxuICAgICAgICAgICAgYWRkVG9kb0lucHV0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRFU1RcIik7XHJcbiAgICAgICAgICAgIC8vZGVsZXRpbmcgcHJvamVjdCBhbHNvIGRlbGV0ZXMgYWxsIHRvZG8ncyBpbiB0aGUgcHJvamVjdFxyXG4gICAgICAgICAgICAvL2NhbiBtYWtlIHRoZSBkZWxldGUgYnV0dG9uIGlkIHRoZSBzYW1lIGFzIHRoZSBjdXJyZW50IHByb2plY3Qgc2VsZWN0ZWRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZVByaW9yaXR5ID0gKHByb2plY3RJbmRleCwgdG9kb0luZGV4LCBwcmlvcml0eSkgPT4ge1xyXG4gICAgICAgICAgICAvL0ZpbmQgd2hhdCBwcm9qZWN0XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdCA9IHByb2plY3RzLmdldEN1cnJlbnRQcm9qZWN0KHByb2plY3RJbmRleClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudFByb2plY3QpO1xyXG4gICAgICAgICAgICAvL0ZpbmQgdGhlIHRvZG9cclxuICAgICAgICAgICAgY3VycmVudFByb2plY3Quc2V0VG9kb1ByaW9yaXR5KHRvZG9JbmRleCwgcHJpb3JpdHkpO1xyXG4gICAgICAgICAgICByZW5kZXJUb2Rvcyhwcm9qZWN0SW5kZXgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByb2plY3REZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVByb2plY3QpO1xyXG5cclxuICAgICAgICBwcm9qZWN0c0FkZEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gbW9kYWwuc2hvd01vZGFsKCkpO1xyXG5cclxuICAgICAgICBjYW5jZWxQcm9qZWN0RGlhbG9nQm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gbW9kYWwuY2xvc2UoKSk7XHJcblxyXG4gICAgICAgIHByb2plY3RzVGl0bGVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgcmVuZGVyUHJvamVjdHNIYW5kbGVyKVxyXG4gICAgXHJcbiAgICAgICAgYWRkVG9kb0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW5kZXJUb2Rvc0hhbmRsZXIpXHJcblxyXG4gICAgICAgIHVyZ2VudEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHVwZGF0ZVByaW9yaXR5KHRvZG9MaXN0RWwuaWQsIHRvZG9FbC5pZCwgXCJ1cmdlbnRcIikpXHJcbiAgICAgICAgaW1wb3J0YW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gdXBkYXRlUHJpb3JpdHkodG9kb0xpc3RFbC5pZCwgdG9kb0VsLmlkLCBcImltcG9ydGFudFwiKSlcclxuICAgIH1cclxuXHJcbiAgICBFdmVudHNDb250cm9sbGVyKCk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgVmlld0NvbnRyb2xsZXIgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9kb0xpc3QgfSBmcm9tIFwiLi9Ub2RvTGlzdFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0cyB9IGZyb20gXCIuL1Byb2plY3RzXCI7XHJcbmltcG9ydCB7IFZpZXdDb250cm9sbGVyIH0gZnJvbSBcIi4vVmlld0NvbnRyb2xsZXJcIjtcclxuXHJcblxyXG4vLyBjb25zdCBsaXN0ID0gbmV3IFRvZG9MaXN0KFwiRmlyc3QgbGlzdFwiKTtcclxuLy8gbGlzdC5hZGRUb2RvKFwiaGVsbG9cIik7XHJcbi8vIGxpc3QuYWRkVG9kbyhcIndvcmxkXCIpO1xyXG4vLyBsaXN0LmVkaXRUb2RvKDEsIFwiYWdhaW5cIik7XHJcbi8vIC8vIGNvbnNvbGUubG9nKGxpc3QpO1xyXG4vLyAvLyBsaXN0LmRlbGV0ZVRvZG8oMSk7XHJcbi8vIGNvbnNvbGUubG9nKGxpc3QpO1xyXG4vLyBjb25zdCBsaXN0VHdvID0gbmV3IFRvZG9MaXN0KFwiU2Vjb25kIGxpc3RcIik7XHJcbi8vIGxpc3RUd28uYWRkVG9kbyhcIm51bWJlcjJcIilcclxuLy8gbGlzdFR3by5zZXRUb2RvUHJpb3JpdHkoMCwgXCJJbXBvcnRhbnRcIik7XHJcbi8vIGxpc3RUd28uc2V0RHVlRGF0ZSgwLCBEYXRlLm5vdygpKTtcclxuLy8gY29uc29sZS5sb2cobGlzdFR3byk7XHJcblxyXG4vLyBsZXQgcHJvamVjdHMgPSBuZXcgUHJvamVjdHMoKTtcclxuLy8gcHJvamVjdHMuYWRkVG9kb0xpc3QobGlzdCk7XHJcbi8vIHByb2plY3RzLmFkZFRvZG9MaXN0KGxpc3RUd28pXHJcbi8vIGNvbnNvbGUubG9nKHByb2plY3RzKTtcclxuXHJcblZpZXdDb250cm9sbGVyKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==