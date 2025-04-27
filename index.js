let titleInput = document.querySelector("#todo-title");
let descriptionInput = document.querySelector("#todo-description");
const addButton = document.querySelector("#add-btn");
const updateButton = document.querySelector("#update-btn");
let searchInput = document.querySelector("#search-input");

let cards = document.querySelector(".cards-section");
let list = [];
let newIndex = 1;

if (localStorage.getItem("toDoList") != null) {
  list = JSON.parse(localStorage.getItem("toDoList"));
  if (list.length > 0) {
    newIndex = list[list.length - 1].id + 1;
  }
  displayList();
}

let currentIndex;

// Save to LocalStorage
function saveToLocalStorage() {
  localStorage.setItem("toDoList", JSON.stringify(list));
}

function validateInputs(title, description) {
  const titleRegex = /^[A-Z][a-z]{2,7}$/; // First capital, 2-7 small letters (total 3-8)
  const descriptionRegex = /^.{20,}$/; // At least 20 characters

  if (!titleRegex.test(title)) {
    alert(
      "Title must start with an uppercase letter, followed by lowercase letters, and be between 3 to 8 characters."
    );
    return false;
  }

  if (!descriptionRegex.test(description)) {
    alert("Description must be at least 20 characters long.");
    return false;
  }

  return true;
}

// Add task
addButton.addEventListener("click", function () {
  var titleInputValue = titleInput.value.trim();
  var descriptionInputValue = descriptionInput.value.trim();

  if (validateInputs(titleInputValue, descriptionInputValue)) {
    var obj = {
      id: newIndex++,
      title: titleInputValue,
      description: descriptionInputValue,
    };
    list.push(obj);
    saveToLocalStorage();
    displayList();
    resetInput();
  }
});
// Display all tasks
function displayList() {
  cards.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    cards.innerHTML += `
    <div class='card'>
      <p class='title'>${list[i].title}</p>
      <div class='card-icons'>
        <img onclick='doneTask(${list[i].id})' class='done-btn icon__image' src='./assets/done.png' alt='' />
        <img onclick='editTask(${list[i].id})' class='edit-btn icon__image' src='./assets/Edit.webp' alt='' />
        <img onclick='deleteTask(${list[i].id})' class='delete-btn icon__image' src='./assets/delete.webp' alt='' />
      </div>
    </div>`;
  }
}

// Edit Task
function editTask(id) {
  let index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    currentIndex = index;
    titleInput.value = list[index].title;
    descriptionInput.value = list[index].description;
    addButton.classList.add("none");
    updateButton.classList.remove("none");
  }
}

// Confirm Update
updateButton.addEventListener("click", function () {
  list[currentIndex].title = titleInput.value.trim();
  list[currentIndex].description = descriptionInput.value.trim();
  saveToLocalStorage();
  displayList();
  resetInput();
  addButton.classList.remove("none");
  updateButton.classList.add("none");
});

// Delete Task
function deleteTask(id) {
  list = list.filter((item) => item.id !== id);
  saveToLocalStorage();
  displayList();
  resetInput();
}

// Mark Task as Done
function doneTask(id) {
  let index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    document.querySelectorAll(".card")[index].classList.toggle("done");
  }
}

// Reset Input Fields
function resetInput() {
  titleInput.value = "";
  descriptionInput.value = "";
}

// Search Tasks
searchInput.addEventListener("keyup", function () {
  let searchInputValue = searchInput.value.toLowerCase();
  let filterList = list.filter((ele) => {
    return ele.title.toLowerCase().startsWith(searchInputValue);
  });
  displayFilterList(filterList);
});

// Display Filtered Tasks
function displayFilterList(filterList) {
  cards.innerHTML = "";
  for (let i = 0; i < filterList.length; i++) {
    cards.innerHTML += `
    <div class='card'>
      <p class='title'>${filterList[i].title}</p>
      <div class='card-icons'>
        <img onclick='doneTask(${filterList[i].id})' class='done-btn icon__image' src='./assets/done.png' alt='' />
        <img onclick='editTask(${filterList[i].id})' class='edit-btn icon__image' src='./assets/Edit.webp' alt='' />
        <img onclick='deleteTask(${filterList[i].id})' class='delete-btn icon__image' src='./assets/delete.webp' alt='' />
      </div>
    </div>`;
  }
}
