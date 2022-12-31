//

const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ayad:Ma5asak321$@cluster0.hj1ea9y.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const movieRouter = requier("./router/datas");
app.use("/data", moviesRouter);

app.listen(3000, () => console.log("Server Started"));
