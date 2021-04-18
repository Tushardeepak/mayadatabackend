const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Meeting = require("./models/meetings");

const app = express();
app.use(cors());
app.use(express.json());

const dbURI =
  "mongodb+srv://tushar1234:1234tushar@cluster0.ysykl.mongodb.net/mayadata?retryWrites=true&w=majority";

const port = process.env.PORT || 4000;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) =>
    app.listen(port, function () {
      console.log("Server running on port " + port);
    })
  )
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  Meeting.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.sendStatus(503).end();
    });
});
app.post("/add", (req, res) => {
  const { name, people, date, startTime, endTime } = req.query;
  const meeting = new Meeting({
    name: name,
    people: people,
    date: date,
    startTime: startTime,
    endTime: endTime,
  });
  meeting
    .save()
    .then(() => res.sendStatus(201).end())
    .catch((err) => console.log(err));
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  Meeting.deleteOne({ _id: id })
    .exec()
    .then(() => res.sendStatus(200).end())
    .catch((err) => res.sendStatus(404).end());
});
