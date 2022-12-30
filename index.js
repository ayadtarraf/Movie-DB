const express = require("express");
const app = express();
const port = 4000;

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
// app.get("/movies/delete", (req, res) => {
//   const id = req.params.id;
//   res.send({ status: 200, message: `hello, ${id}` });
// });

app.post("/movies/add", (req, res) => {
  const { title, year, rating } = req.query;
  if (!title || !year) {
    return res.json({
      status: 403,
      error: true,
      message: "You cannot create a movie without providing a title and a year",
    });
  }

  if (year.length !== 4 || isNaN(year)) {
    return res.json({
      status: 403,
      error: true,
      message: "Year must be a 4-digit number",
    });
  }
  if (!rating) {
    rating = 4;
  }
  const movie = {
    title,
    year,
    rating,
  };
  movies.push(movie);
  res.json(movies);
});

app.delete("/movies/delete/:id", (req, res) => {
  const delet = req.params.id;
  if (isNaN(delet)) {
    res.status(404);
    res.send({
      status: 404,
      error: true,
      message: `please enter a valid id number`,
    });
  } else if (delet < 0 || delet > movies.length - 1) {
    res.status(404);
    res.send({
      status: 404,
      error: true,
      message: `the movie ${delet} does not exist`,
    });
  } else {
    movies.splice(delet, 1);
    res.send(movies);
  }
});

app.get("/movies/update/:id", (req, res) => {
  const update = req.params.id;
  const tit = req.query.title;
  if (isNaN(update)) {
    res.status(404);
    res.send({
      status: 404,
      error: true,
      message: `please enter a valid id number`,
    });
  } else if (update < 0 || update > movies.length - 1) {
    res.status(404);
    res.send({
      status: 404,
      error: true,
      message: `the movie ${update} does not exist`,
    });
  } else {
    if (tit !== undefined && tit !== "") {
      movies[update] = {
        ...movies[update],
        title: tit,
      };
    }
    if (
      !isNaN(req.query.year) &&
      req.query.year !== "" &&
      req.query.year.length == 4
    ) {
      movies[update] = {
        ...movies[update],
        year: parseInt(req.query.year),
      };
    }
    if (
      !isNaN(req.query.rating) &&
      req.query.rating !== undefined &&
      req.query.rating !== ""
    ) {
      movies[update] = {
        ...movies[update],
        rating: parseFloat(req.query.rating),
      };
    }
    res.send(movies);
  }
});

app.get(`/movies/delete`, (req, res) => {
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
