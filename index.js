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

app.get("/movies/read/by-date", (req, res) => {
  const aflem = movies.sort((a, b) => a.year - b.year);
  res.send({ status: 200, data: aflem });
});

app.get("/movies/update", (req, res) => {
  const id = req.params.id;
  res.send({ status: 200, message: `hello, ${id}` });
});

app.get("/movies/read/by-rating", (req, res) => {
  const rate = movies.sort((a, b) => a.rating - b.rating);
  res.send({ status: 200, data: rate });
});

app.get("/movies/read/by-title", (req, res) => {
  const moviesOrderedByTitle = movies.sort((a, b) => {
    const Alpha = a.title.toLowerCase();
    const Beta = b.title.toLowerCase();
    if (Alpha < Beta) {
      return -1;
    } else if (Alpha > Beta) {
      return 1;
    } else {
      return 0;
    }
  });
  res.send({
    status: 200,
    data: moviesOrderedByTitle,
  });
});

app.get("/movies/read/id/:id", (req, res) => {
  const numb = parseInt(req.params.id);
  if (numb <= movies.length) {
    res.status(200).json({ status: 200, message: "OK", data: movies[numb] });
  } else {
    res.status(404).json({
      status: 404,
      error: true,
      message: `the movie ${numb} does not exist`,
    });
  }
});
app.get("/movies/delete", (req, res) => {
  const id = req.params.id;
  res.send({ status: 200, message: `hello, ${id}` });
});

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
];

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
