const modalBackdrop = document.querySelector(".modal-backdrop"); //takes flex class
const modal = document.querySelector(".modal");
const addIcon = document.querySelector(".addtolist span.add");
const closeModalBtn = document.querySelector(".close");
const input = document.querySelector(".input");
const saveBtn = document.querySelector(".save-button");
const list = document.querySelector(".list");
const message = document.querySelector(".message");
const audio = new Audio("./audio/MyRingtone.IR_1583566199_7677.mp3");

function getTotalListItems() {
  let items = document.querySelectorAll("ul.list>li");
  return items.length;
}

function showModal() {
  modalBackdrop.classList.toggle("hidden");
  modalBackdrop.classList.toggle("flex");

  // modalBackdrop.classList.replace("hidden", "flex");
  setTimeout(() => {
    modal.classList.replace("translate-y-[50px]", "translate-y-0");
    modal.classList.replace("opacity-0", "opacity-100");
  }, 10);

  input.focus();
}

function closeModal() {
  modal.classList.toggle("opacity-100");
  modal.classList.toggle("opacity-0");

  modal.classList.toggle("translate-y-0");
  modal.classList.toggle("translate-y-[50px]");

  setTimeout(() => {
    modalBackdrop.classList.toggle("hidden");
    modalBackdrop.classList.toggle("flex");
  }, 10);

  input.value = "";
}

function changeIcon(event) {
  let element = event.target;
  if (element.classList.contains("add")) {
    if (element.classList.contains("show")) {
      addBtn.classList.replace("show", "hide");
      closeBtn.classList.replace("hide", "show");
      return;
    }
    // if it's first time
    addBtn.classList.add("hide");
    closeBtn.classList.add("show");
  } else {
    closeBtn.classList.replace("show", "hide");
    addBtn.classList.replace("hide", "show");
  }
}

//  save task
function saveTask() {
  let inputValue;
  if (input.value !== "") {
    inputValue = input.value;
  } else {
    alert("please write your task");
    input.focus();
    return;
  }

  let listItem = document.createElement("li");
  listItem.className = "listItem -translate-y-12 opacity-0";
  let listContent = `
    <h2>${inputValue}</h2>
    <span class="material-symbols-outlined checked"> check </span>
  `;
  listItem.innerHTML = listContent;

  closeModal();
  changeIcon(event);

  list.prepend(listItem);
  input.value = "";

  setTimeout(() => {
    listItem.classList.remove("opacity-0", "-translate-y-12");
  }, 10);

  let taskNumbers = getTotalListItems();
  if (taskNumbers === 0) {
    message.classList.toggle("hidden");
  } else {
    message.classList.add("hidden");
  }

  let tasks = document.querySelector(".task-number");

  tasks.innerHTML = taskNumbers;

  // deleting list item
  const doneBtn = listItem.querySelector("span");
  doneBtn.addEventListener("click", function () {
    this.classList.add(
      "transition",
      "duration-500",
      "text-white",
      "bg-greenbtn"
    );
    audio.currentTime = 0;
    audio.play();

    setTimeout(() => {
      let listItem = this.parentElement;
      listItem.classList.add("opacity-0");

      listItem.addEventListener(
        "transitionend",
        function () {
          this.remove();
          let taskNumbers = getTotalListItems();
          tasks.innerHTML = taskNumbers;
          if (taskNumbers === 0) {
            message.classList.toggle("hidden");
          }
        },
        { once: true }
      );
    }, 500);
  });
}

function deleteTask() {}

saveBtn.addEventListener("click", saveTask);

addIcon.addEventListener("click", showModal);

closeModalBtn.addEventListener("click", closeModal);

//click modalBackdrop to close modal
modalBackdrop.addEventListener("click", e => {
  let isModalBackdrop = e.target.classList.contains("modal-backdrop");

  if (isModalBackdrop) {
    closeModal();
    changeIcon(event);
  }

  input.value = "";
});

//changing add and close icons

const iconBox = document.querySelector(".iconbox");
const addBtn = document.querySelector(".add");
const closeBtn = document.querySelector(".close");
iconBox.addEventListener("click", changeIcon);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getTime() {
  const time = new Date();

  const date = document.querySelector(".month-day");
  const monthNameElement = document.querySelector(".month-name");
  const weekDayElement = document.querySelector(".week-day");

  let weekDay = weekDays[time.getDay()];
  weekDayElement.innerHTML = weekDay + ",";

  date.innerHTML = time.getDate();
  monthNameElement.innerHTML = months[time.getMonth()];
}
getTime();

input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    saveTask();
    e.target.value = "";
  }
});
