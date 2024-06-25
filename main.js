/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 930:
/***/ (() => {

const deleteButton = document.querySelectorAll('.column__card-button');
const addButton = document.querySelectorAll('.add_card');
const cardContent = document.querySelector('.column__card-content_add');
const columns = document.querySelectorAll('.column');
const mainContainer = document.querySelector('.main_container');
const toDoContainer = document.querySelector('.todo_container');
let actualCard = null;
const tasks = document.querySelectorAll('.column__card');
window.onload = loadFromLocalStorage();
mainContainer.addEventListener('click', e => {
  if (e.target.classList.contains("add_card")) {
    const areatxt = e.target.previousElementSibling;
    let columnCardText = areatxt.value;
    areatxt.value = '';
    const newColumnCard = document.createElement('div');
    newColumnCard.className = 'column__card';
    newColumnCard.draggable = true;
    newColumnCard.innerHTML = '<div class="column__card-content">' + columnCardText + '</div><button class="column__card-button"></button>';
    let buttonContainer = e.target.parentNode;
    let siblingEl = buttonContainer.previousElementSibling;
    siblingEl.appendChild(newColumnCard);
    updateLocalStorage();
  }
});
mainContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('column__card-button')) {
    const card = event.target.closest('.column__card');
    if (card) {
      card.remove();
    }
  }
  updateLocalStorage();
});
function dragStart(e) {
  actualCard = e.target;
  e.target.classList.add("is-dragging");
}
;
function dragEnd(e) {
  this.classList.remove('hovered');
}
;
function dragEnter(e) {
  e.preventDefault();
  this.classList.add('hovered');
}
;
function dragLeave() {
  this.classList.remove('hovered');
}
;
function dragOver(e) {
  e.preventDefault();
  const activeElement = mainContainer.querySelector(`.is-dragging`);
  const currentElement = e.target;
  const isMoveable = activeElement !== currentElement && currentElement.classList.contains(`column__card`);
  if (!isMoveable) {
    if (e.target.classList.contains("column") && !this.contains(actualCard)) {
      this.appendChild(actualCard);
    }
    return;
  }
  const nextElement = getNextElement(e.clientY, currentElement);
  if (nextElement && activeElement === nextElement.previousElementSibling || activeElement === nextElement) {
    return;
  }
  this.insertBefore(activeElement, nextElement);
}
;
const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
  const nextElement = cursorPosition < currentElementCenter ? currentElement : currentElement.nextElementSibling;
  return nextElement;
};
for (const column of columns) {
  column.addEventListener('dragenter', dragEnter);
  column.addEventListener('dragleave', dragLeave);
  column.addEventListener('dragover', dragOver);
  column.addEventListener('drop', drop);
  column.addEventListener('dragstart', dragStart);
  column.addEventListener('dragend', dragEnd);
}
function drop(e) {
  e.preventDefault();
  actualCard.classList.remove("is-dragging");
  actualCard = null;
  this.classList.remove('hovered');
  updateLocalStorage();
}
;
function updateLocalStorage() {
  const condition = [];
  const columnLine = document.querySelectorAll(".column"); // столбцы с карточками
  console.log(columnLine);
  columnLine.forEach((line, indexLine) => {
    condition[indexLine] = [];
    console.log(condition);
    let taskCard = line.querySelectorAll(".column__card"); // карточки в каждом столбце
    taskCard.forEach((card, indexCard) => {
      let content = card.querySelector(".column__card-content").textContent;
      console.log(card);
      console.log(content);
      let dataBody = [content];
      condition[indexLine][indexCard] = dataBody;
    });
  });
  let database = JSON.stringify(condition);
  window.localStorage.setItem("database", database);
}
;
function loadFromLocalStorage() {
  if (!localStorage.getItem("database")) return;
  let getDataBase = localStorage.getItem("database");
  let dataBase = JSON.parse(getDataBase);
  for (let i = 0; i < dataBase.length; i++) {
    for (let j = 0; j < dataBase[i].length; j++) {
      columns[i].querySelector(".column_title").insertAdjacentHTML("afterEnd", `<div class="column__card" draggable="true"><div class="column__card-content">${dataBase[i][j]}</div><button class="column__card-button"></button></div>`);
    }
  }
}
;

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(930);
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_app__WEBPACK_IMPORTED_MODULE_0__);


})();

/******/ })()
;