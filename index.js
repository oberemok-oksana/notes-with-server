const exp = require("constants");
let express = require("express");

let app = express();

app.get("/", (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.sendFile(__dirname + "/index.html");
});

app.use("/assets", express.static(__dirname + "/static"));

app.listen(3000);
