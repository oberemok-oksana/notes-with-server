class Note {
  constructor(topic, body) {
    this.topic = topic;
    this.body = body;
  }
}

let notes = [];

document.addEventListener("DOMContentLoaded", () => {
  let topicInput = document.querySelector("#topic");
  let noteBodyInput = document.querySelector("#note-body");
  let addBtn = document.querySelector(".add-btn");
  let showAllBtn = document.querySelector(".show-all-btn");
  let list = document.querySelector(".list");
  let fullNote = document.querySelector(".full-note");
  let activeNotes = document.querySelectorAll(".active");

  addBtn.addEventListener("click", () => {
    if (topicInput.value === "" || noteBodyInput.value === "") {
      alert("Please type something");
    } else {
      notes.push(new Note(topicInput.value, noteBodyInput.value));

      createTask();NOte
      topicInput.value = "";
      noteBodyInput.value = "";
      console.log(notes);
    }
  });

  list.addEventListener("click", (e) => {
    if (e.target.matches(".note-topic")) {
      activeNotes.forEach((active) => {
        active.classList.remove("active");
      });
      e.target.classList.add("active");
    }
  });

  function createTask() {
    if (notes.length > 0) {
      notes.forEach((note) => {
        let li = document.createElement("li");
        li.classList.add("note-topic");
        li.innerHTML = note.topic;
        let arrow = document.createElement("i");
        arrow.classList.add("fas", "fa-caret-right");
        li.append(arrow);
        list.append(li);
      });
    }
  }

  function activeNote() {}

  function showNote() {
    let title = document.createElement("h2");
  }
});
