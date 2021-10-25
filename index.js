let express = require("express");

let notes = [
  { id: 1, topic: "buy", body: "milk" },
  { id: 2, topic: "feed", body: " a cat" },
  { id: 3, topic: "buy", body: "flowers for lovely wife" },
];

let app = express();

app.get("/", (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.sendFile(__dirname + "/index.html");
});

app.use("/assets", express.static(__dirname + "/static"));

app.get("/notes", (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.send(JSON.stringify(notes));
});

app.listen(3000);
