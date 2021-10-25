class Note {
  constructor(id, topic, body) {
    this.id = id;
    this.topic = topic;
    this.body = body;
  }
}

let currentId = 1;
let notes = [];
let activeNote;

document.addEventListener("DOMContentLoaded", () => {
  let topicInput = document.querySelector("#topic");
  let noteBodyInput = document.querySelector("#note-body");
  let addBtn = document.querySelector(".add-btn");
  let showAllBtn = document.querySelector(".show-all-btn");
  let list = document.querySelector(".list");
  let fullNote = document.querySelector(".full-note");

  addBtn.addEventListener("click", () => {
    if (topicInput.value === "" || noteBodyInput.value === "") {
      alert("Please type something");
    } else {
      notes.push(new Note(currentId++, topicInput.value, noteBodyInput.value));

      createTask();
      topicInput.value = "";
      noteBodyInput.value = "";
    }
  });

  list.addEventListener("click", (e) => {
    if (e.target.matches(".note-topic")) {
      let activeNotes = document.querySelectorAll(".active");
      activeNotes.forEach((activeNote) => {
        activeNote.classList.remove("active");
      });
      e.target.classList.add("active");
      activeNote = notes.find(
        (note) => note.id === parseInt(e.target.dataset.id)
      );
      showNote();
    }
  });

  function showNote() {
    fullNote.innerHTML = "";
    let title = document.createElement("h2");
    title.innerHTML = activeNote.topic;
    let noteBody = document.createElement("div");
    noteBody.innerHTML = activeNote.body;

    fullNote.append(title, noteBody);
  }

  function createTask() {
    if (notes.length > 0) {
      list.innerHTML = "";
      notes.forEach((note) => {
        let li = document.createElement("li");
        li.classList.add("note-topic");
        li.dataset.id = note.id;
        li.innerHTML = note.topic;
        let arrow = document.createElement("i");
        arrow.classList.add("fas", "fa-caret-right");
        li.append(arrow);
        list.append(li);
      });
    }
  }
});
