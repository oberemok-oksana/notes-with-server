class Note {
  constructor(id, topic, body) {
    this.id = id;
    this.topic = topic;
    this.body = body;
  }
}

let notes = [];
let activeNote;

function getNotes() {
  return fetch("/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
}

function addNote(topic, body) {
  return fetch("/notes", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      topic: topic,
      body: body,
    }),
  }).then((response) => response.json());
}

document.addEventListener("DOMContentLoaded", () => {
  let topicInput = document.querySelector("#topic");
  let noteBodyInput = document.querySelector("#note-body");
  let addBtn = document.querySelector(".add-btn");
  let list = document.querySelector(".list");
  let fullNote = document.querySelector(".full-note");

  list.innerHTML = "Loading...";
  getNotes().then((response) => {
    notes = response;
    redrawNotes();
  });

  addBtn.addEventListener("click", () => {
    addNote(topicInput.value, noteBodyInput.value).then((response) => {
      if (response.status === "error") {
        alert(response.message);
      } else {
        getNotes().then((json) => {
          notes = json;
          redrawNotes();
          topicInput.value = "";
          noteBodyInput.value = "";
        });
      }
    });
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
    title.classList.add("subtitle");
    title.innerHTML = activeNote.topic;
    let noteBody = document.createElement("div");
    noteBody.innerHTML = activeNote.body;

    fullNote.append(title, noteBody);
  }

  function redrawNotes() {
    list.innerHTML = "";

    if (notes.length > 0) {
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
