let express = require("express");
let bodyParser = require("body-parser");
let pgp = require("pg-promise")();
let db = pgp("postgres://postgres:somePassword@localhost:5432/notes");

let app = express();

app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.sendFile(__dirname + "/index.html");
});

app.use("/assets", express.static(__dirname + "/static"));

app.get("/notes", async (request, response) => {
  response.setHeader("Content-Type", "application/json");
  db.any("SELECT * FROM notes")
    .then((notes) => JSON.stringify(notes))
    .then((json) => response.send(json));
});

app.post("/notes", (request, response) => {
  let note = request.body;
  response.setHeader("Content-Type", "application/json");
  if (!note.topic || !note.body) {
    response.send(
      JSON.stringify({ status: "error", message: "some field is empty" })
    );
    return;
  }
  db.none("INSERT INTO notes(topic,body) VALUES(${topic}, ${body})", {
    topic: note.topic,
    body: note.body,
  }).then(
    () => {
      response.send(JSON.stringify({ status: "ok" }));
    },
    () => {
      response.send(
        JSON.stringify({ status: "error", message: "something went wrong..." })
      );
    }
  );
});

app.listen(3000);
