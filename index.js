const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/test", (req, res) => {
  res.send({ status: 200, message: "ok" });
});

let time = new Date();
const editedTime = `${time.getHours()}:${time.getSeconds()}`;

app.get("/time", (req, res) => {
  res.send({ status: 200, message: editedTime });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

