let express = require("express");
let bodyParser = require("body-parser");

let currentId = 1;
let app = express();

app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.sendFile(__dirname + "/index.html");
});

app.use("/assets", express.static(__dirname + "/static"));

app.get("/notes", async (request, response) => {
  // simulate network throttling
  await new Promise((resolve) => setTimeout(resolve, 2000));

  response.setHeader("Content-Type", "application/json");
  response.send(JSON.stringify(notes));
});

app.post("/notes", (request, response) => {
  let note = {
    id: currentId++,
    topic: request.body.topic,
    body: request.body.body,
  };
  notes.push(note);
  response.setHeader("Content-Type", "application/json");
  response.send(JSON.stringify(notes));
});

app.listen(3000);
