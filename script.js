let titleInput = document.querySelector("#todo-title");
let descriptionInput = document.querySelector("#todo-description");
const addButtton = document.querySelector("#add-btn");
const updateButtton = document.querySelector("#update-btn");
let searchInput = document.querySelector("#search-input");

let cards = document.querySelector(".cards-section");
let list = [];
var newIndex = 0;

if (localStorage.getItem("toDoList") != null) {
  list = JSON.parse(localStorage.getItem("toDoList"));
  newIndex = list[list.length - 1].id;
  displayData();
}

let currentIndex;
addButtton.addEventListener("click", function () {
  var titleInputValue = titleInput.value;
  var descriptionInputValue = descriptionInput.value;
  var obj = {
    id: newIndex,
    title: titleInputValue,
    description: descriptionInputValue,
  };
  list.push(obj);
  // console.log(list);
  displayList();
  // to reset te input field
  resetInput();
});

function displayList() {
  cards.innerHTML = "";
  for (var i = 0; i < list.length; i++) {
    cards.innerHTML += `<div class='card'>
  <p class='title'>${list[i].title}</p>
  <div class='card-icons'>
    <img
      onclick='doneTask(${i})'
      class='done-btn icon__image'
      src='./assets/done.png'
      alt=''
    />
    <img
      onclick='editTask(${i})'
      class='edit-btn icon__image'
      src='./assets/Edit.webp'
      alt=''
    />
    <img
      onclick='deleteTask(${i})'
      class='delete-btn icon__image'
      src='./assets/delete.webp'
      alt=''
    />
  </div>
</div>`;
  }
}
function editTask(index) {
  currentIndex = index;
  titleInput.value = list[index].title;
  descriptionInput.value = list[index].description;
  addButtton.classList.add("none");
  updateButtton.classList.remove("none");
  // console.log(titleInput.value);
  // console.log(descriptionInput.value);
  // console.log(currentIndex);
}
updateButtton.addEventListener("click", function () {
  list[currentIndex].title = titleInput.value;
  list[currentIndex].description = descriptionInput.value;
  addButtton.classList.remove("none");
  updateButtton.classList.add("none");
  // console.log(list);
  displayList();
  resetInput();
});

function deleteTask(index) {
  list.splice(index, 1);
  displayList();
  // console.log(list)
  resetInput();
}
function doneTask(index) {
  document.querySelectorAll(".card")[index].classList.toggle("done");
}
function resetInput() {
  titleInput.value = "";
  descriptionInput.value = "";
}

searchInput.addEventListener("keyup", function () {
  let searchInputValue = searchInput.value.toLowerCase();
  let filterList = list.filter((ele) => {
    return ele.title.startsWith(searchInputValue);
  });
  displayFilterList(filterList);
});

function displayFilterList(filterList) {
  cards.innerHTML = "";
  for (var i = 0; i < list.length; i++) {
    cards.innerHTML += `<div class='card'>
  <p class='title'>${filterList[i].title}</p>
  <div class='card-icons'>
    <img
      onclick='doneTask(${i})'
      class='done-btn icon__image'
      src='./assets/done.png'
      alt=''
    />
    <img
      onclick='editTask(${i})'
      class='edit-btn icon__image'
      src='./assets/Edit.webp'
      alt=''
    />
    <img
      onclick='deleteTask(${i})'
      class='delete-btn icon__image'
      src='./assets/delete.webp'
      alt=''
    />
  </div>
</div>`;
  }
}
