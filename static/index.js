class Note {
  constructor(id, topic, body) {
    this.id = id;
    this.topic = topic;
    this.body = body;
  }
}

let notes = [];
let activeNote;

document.addEventListener("DOMContentLoaded", () => {
  let topicInput = document.querySelector("#topic");
  let noteBodyInput = document.querySelector("#note-body");
  let addBtn = document.querySelector(".add-btn");
  let list = document.querySelector(".list");
  let fullNote = document.querySelector(".full-note");
  let choseNoteDisplay = document.querySelector("chose-note");

  list.innerHTML = "Loading...";
  fetch("/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((response) => {
      notes = response;
      redrawNotes();
    });

  addBtn.addEventListener("click", () => {
    if (topicInput.value === "" || noteBodyInput.value === "") {
      alert("Please type something");
    } else {
      fetch("/notes", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          topic: topicInput.value,
          body: noteBodyInput.value,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          notes = json;
          redrawNotes();
          topicInput.value = "";
          noteBodyInput.value = "";
        });
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
      choseNoteDisplay.style.display = "none";
    }
  });

  function showNote() {
    fullNote.innerHTML = "";
    let title = document.createElement("h2");
    title.classList.add("subtitle");
    title.innerHTML = activeNote.topic;
    let noteBody = document.createElement("div");
    noteBody.innerHTML = activeNote.body;

    fullNote.append(title, noteBody);
  }

  function redrawNotes() {
    if (notes.length > 0) {
      list.innerHTML = "";
      notes.forEach((note) => {
        let li = document.createElement("li");
        li.classList.add("note-topic");
        li.dataset.id = note.id;
        li.innerHTML = note.topic;
        list.append(li);
      });
    }
  }
});
