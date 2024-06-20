const deleteButton = document.querySelectorAll('.column__card-button');
const addButton = document.querySelector('.add_card')
const cardContent = document.querySelector('.column__card-content_add')
const columns = document.querySelectorAll('.column')
const columnTitle = document.querySelector('.column_title')
const mainContainer = document.querySelector('.main_container')
const toDoContainer = document.querySelector('.todo_container')
let actualCard = null;
const tasks = document.querySelectorAll('.column__card')

  window.onload = loadFromLocalStorage();
  

addButton.addEventListener('click', function() {
  let columnCardText = document.getElementById('textareaid').value;
  const newColumnCard = `<div class="column__card" draggable="true"><div class="column__card-content">${columnCardText}</div><button class="column__card-button"></button></div>`
  columnTitle.insertAdjacentHTML("afterEnd", newColumnCard);
  updateLocalStorage()
});


mainContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('column__card-button')) {
    const card = event.target.closest('.column__card');
    if (card) {
      card.remove();
    }
  }
  updateLocalStorage()
});

function dragStart(e) {
  actualCard = e.target
  e.target.classList.add("is-dragging");
  console.log(this, 'start')
};

function dragEnd(e) {
  this.classList = 'column';
  console.log(this, 'end')
};

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('hovered');
};

function dragLeave() {
  this.classList.remove('hovered');
  
};

function dragOver(e) {
  e.preventDefault();
  if (e.target.classList.contains("column")) {
    let nextCard = actualCard.nextElementSibling
    console.log(nextCard)
    if (nextCard && nextCard.classList.contains("column__card")) {
        e.target.insertBefore(this, nextCard);
    } else {
      this.appendChild(actualCard);
    }
}
this.classList = 'column';
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
  updateLocalStorage();
};

function updateLocalStorage() {
    const condition = [];
    const columnLine = document.querySelectorAll(".column"); // столбцы с карточками
    console.log(columnLine)
    columnLine.forEach((line, indexLine) => {
      condition[indexLine] = [];
      console.log(condition)
      let taskCard = line.querySelectorAll(".column__card"); // карточки в каждом столбце
      taskCard.forEach((card, indexCard) => {
        let content = card.querySelector(".column__card-content").textContent
        console.log(card)
        console.log(content)
        let dataBody = [content];
        condition[indexLine][indexCard] = dataBody;
      });
    });
    let database = JSON.stringify(condition);
    window.localStorage.setItem("database", database);
  };

  function loadFromLocalStorage() {
    if (!localStorage.getItem("database")) return;
    let getDataBase = localStorage.getItem("database");
    let dataBase = JSON.parse(getDataBase);
    for (let i = 0; i < dataBase.length; i++) {
      for (let j = 0; j < dataBase[i].length; j++) {
        columns[i].querySelector(".column_title").insertAdjacentHTML(
          "afterEnd",
          `<div class="column__card" draggable="true"><div class="column__card-content">${dataBase[i][j]}</div><button class="column__card-button"></button></div>`
        );
      }
    }
  };
  
  
  
  
  