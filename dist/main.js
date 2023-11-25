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
        this.projects = [];
    }

    addTodoList(todolist) {
        this.projects.push(todolist)
        return this.projects;
    }

    deleteProject(id) {
        let newProjectList = this.projects.splice(id, 1);
        return newProjectList;
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
        this.dueDate;
        this.priority = "normal",
        this.notes = ""
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
        this.todoList = [];
    }

    addTodo(...todo) {
        let newTodo = new _Todo__WEBPACK_IMPORTED_MODULE_0__.Todo(...todo);
        this.todoList.push(newTodo);
        console.log(this.todoList)
        return this.todoList;
    }

    deleteTodo(id) {
        let newTodoList = this.todoList.splice(id, 1);
        return newTodoList;
    }

    editTodo(id) {

    }

    setTodoPriority(id, priority) {
        //Find todo based on ID
        //set it's priority
        let todo = this.todoList.find((todo, index) => index === id);
        todo.priority = priority;
        return this.todoList;
    }
    setDueDate(id, date) {
        let todo = this.todoList.find((todo, index) => index === id);
        todo.dueDate = date;
        return this.todoList;
    }




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




const list = new _TodoList__WEBPACK_IMPORTED_MODULE_0__.TodoList("First list");
list.addTodo("hello", "hello", "hello", "hello", "hello");
list.addTodo("world", "world", "world", "world", "world");
// console.log(list);
// list.deleteTodo(1);
console.log(list);
const listTwo = new _TodoList__WEBPACK_IMPORTED_MODULE_0__.TodoList("Second list");
listTwo.addTodo("number2","number2","number2","number2","number2")
listTwo.setTodoPriority(0, "Important");
listTwo.setDueDate(0, Date.now());
console.log(listTwo);

let projects = new _Projects__WEBPACK_IMPORTED_MODULE_1__.Projects();
projects.addTodoList(list);
projects.addTodoList(listTwo)
console.log(projects);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVDhCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUNBQUk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDMUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ0E7QUFDdEM7QUFDQTtBQUNBLGlCQUFpQiwrQ0FBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLCtDQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsK0NBQVE7QUFDM0I7QUFDQTtBQUNBLHNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Ub2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9Ub2RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVG9kb0xpc3QgfSBmcm9tIFwiLi9Ub2RvTGlzdFwiO1xyXG5cclxuY2xhc3MgUHJvamVjdHMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRvZG9MaXN0KHRvZG9saXN0KSB7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKHRvZG9saXN0KVxyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVByb2plY3QoaWQpIHtcclxuICAgICAgICBsZXQgbmV3UHJvamVjdExpc3QgPSB0aGlzLnByb2plY3RzLnNwbGljZShpZCwgMSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1Byb2plY3RMaXN0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBQcm9qZWN0cyB9IiwiY2xhc3MgVG9kbyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZSxcclxuICAgICAgICB0aGlzLmR1ZURhdGU7XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IFwibm9ybWFsXCIsXHJcbiAgICAgICAgdGhpcy5ub3RlcyA9IFwiXCJcclxuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgVG9kbyB9IiwiaW1wb3J0IHsgVG9kbyB9IGZyb20gXCIuL1RvZG9cIjtcclxuXHJcbmNsYXNzIFRvZG9MaXN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlLFxyXG4gICAgICAgIHRoaXMudG9kb0xpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvKC4uLnRvZG8pIHtcclxuICAgICAgICBsZXQgbmV3VG9kbyA9IG5ldyBUb2RvKC4uLnRvZG8pO1xyXG4gICAgICAgIHRoaXMudG9kb0xpc3QucHVzaChuZXdUb2RvKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRvZG9MaXN0KVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9MaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVRvZG8oaWQpIHtcclxuICAgICAgICBsZXQgbmV3VG9kb0xpc3QgPSB0aGlzLnRvZG9MaXN0LnNwbGljZShpZCwgMSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1RvZG9MaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRUb2RvKGlkKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldFRvZG9Qcmlvcml0eShpZCwgcHJpb3JpdHkpIHtcclxuICAgICAgICAvL0ZpbmQgdG9kbyBiYXNlZCBvbiBJRFxyXG4gICAgICAgIC8vc2V0IGl0J3MgcHJpb3JpdHlcclxuICAgICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb0xpc3QuZmluZCgodG9kbywgaW5kZXgpID0+IGluZGV4ID09PSBpZCk7XHJcbiAgICAgICAgdG9kby5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9MaXN0O1xyXG4gICAgfVxyXG4gICAgc2V0RHVlRGF0ZShpZCwgZGF0ZSkge1xyXG4gICAgICAgIGxldCB0b2RvID0gdGhpcy50b2RvTGlzdC5maW5kKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggPT09IGlkKTtcclxuICAgICAgICB0b2RvLmR1ZURhdGUgPSBkYXRlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9MaXN0O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IFRvZG9MaXN0IH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRvZG9MaXN0IH0gZnJvbSBcIi4vVG9kb0xpc3RcIjtcclxuaW1wb3J0IHsgUHJvamVjdHMgfSBmcm9tIFwiLi9Qcm9qZWN0c1wiO1xyXG5cclxuXHJcbmNvbnN0IGxpc3QgPSBuZXcgVG9kb0xpc3QoXCJGaXJzdCBsaXN0XCIpO1xyXG5saXN0LmFkZFRvZG8oXCJoZWxsb1wiLCBcImhlbGxvXCIsIFwiaGVsbG9cIiwgXCJoZWxsb1wiLCBcImhlbGxvXCIpO1xyXG5saXN0LmFkZFRvZG8oXCJ3b3JsZFwiLCBcIndvcmxkXCIsIFwid29ybGRcIiwgXCJ3b3JsZFwiLCBcIndvcmxkXCIpO1xyXG4vLyBjb25zb2xlLmxvZyhsaXN0KTtcclxuLy8gbGlzdC5kZWxldGVUb2RvKDEpO1xyXG5jb25zb2xlLmxvZyhsaXN0KTtcclxuY29uc3QgbGlzdFR3byA9IG5ldyBUb2RvTGlzdChcIlNlY29uZCBsaXN0XCIpO1xyXG5saXN0VHdvLmFkZFRvZG8oXCJudW1iZXIyXCIsXCJudW1iZXIyXCIsXCJudW1iZXIyXCIsXCJudW1iZXIyXCIsXCJudW1iZXIyXCIpXHJcbmxpc3RUd28uc2V0VG9kb1ByaW9yaXR5KDAsIFwiSW1wb3J0YW50XCIpO1xyXG5saXN0VHdvLnNldER1ZURhdGUoMCwgRGF0ZS5ub3coKSk7XHJcbmNvbnNvbGUubG9nKGxpc3RUd28pO1xyXG5cclxubGV0IHByb2plY3RzID0gbmV3IFByb2plY3RzKCk7XHJcbnByb2plY3RzLmFkZFRvZG9MaXN0KGxpc3QpO1xyXG5wcm9qZWN0cy5hZGRUb2RvTGlzdChsaXN0VHdvKVxyXG5jb25zb2xlLmxvZyhwcm9qZWN0cyk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9