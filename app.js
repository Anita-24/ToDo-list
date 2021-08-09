const { urlencoded } = require("express");
const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Task = require("./models/task");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());

app.use(express.static("assests"));

const taskList = [
  {
    name: "Cooking",
    serial: 1,
  },
  {
    name: "Running",
    serial: 2,
  },
];

//fetch the task from the db
app.get("/", function (req, res) {
  Task.find({}, function (err, task) {
    if (err) {
      console.log("Error while faetching the task form db");
      return;
    }
    return res.render("./head", {
      title: "My Activities",
      task_list: task,
    });
  });
});

// create a new task
app.post("/create-activity", (req, res, next) => {
  Task.create(
    {
      name: req.body.name,
      serial: req.body.serial,
    },
    function (err, newTask) {
      if (err) {
        console.log("Error in creating a new task");
        return;
      }
      return res.redirect("/");
    }
  );
});

app.get("/delete-activity", (req, res, next) => {
  let id = req.query.id;

  Task.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("error in deleting the task");
      return;
    }
    return res.redirect("/");
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
  }
  console.log("server is running on port: ", port);
});
