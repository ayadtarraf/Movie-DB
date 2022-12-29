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

app.get("/hello/:id", (req, res) => {
  const id = req.params.id;
  res.send({ status: 200, message: `hello, ${id}` });
});

app.get("/search", (req, res) => {
  const search = req.query.s;
  if (search) {
    res.send({ status: 200, message: "ok", data: search });
  } else {
    res.status(500);
    res.send({
      status: 500,
      error: true,
      message: "you have to provide a search",
    });
  }
});
app.get("/movies/create", (req, res) => {
  const id = req.params.id;
  res.send({ status: 200, message: `hello, ${id}` });
});

app.get("/movies/read", (req, res) => {
  res.send({status:200, data:movies });
});

app.get("/movies/update", (req, res) => {
  const id = req.params.id;
  res.send({ status: 200, message: `hello, ${id}` });
});

app.get("/movies/delete", (req, res) => {
  const id = req.params.id;
  res.send({ status: 200, message: `hello, ${id}` });
});

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
