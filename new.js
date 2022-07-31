const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const port = process.env.PORT || 3000;
var items = ["Buy food", "Cook", "Eat"],
  workItems = [];
var warning;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("", (req, res) => {
  console.log(items);
  console.log(workItems);
  var currentDay = date.getDate();
  res.render("list", {
    listTitle: currentDay,
    newListItems: items,
    warning,
  });
});
app.post("/", (req, res) => {
  warning = null;
  if (req.body.list === "work") {
    checkWarn(req);
    res.redirect("/work");
  } else {
    checkWarn(req);
    res.redirect("/");
  }
});
app.get("/work", (req, res) => {
  console.log(items);
  console.log(workItems);
  res.render("list", {
    listTitle: "work",
    newListItems: workItems,
    warning,
  });
});

app.listen(port, () => {
  console.log("Server Started on port " + port);
});

const checkWarn = (req) => {
  var list = req.body.list;
  var arbitraryItems;
  if (list === "work") {
    arbitraryItems = workItems;
  } else {
    arbitraryItems = items;
  }

  if (req.body.newItem != "" && req.body.delItem == "")
    arbitraryItems.push(req.body.newItem); //apparently needs body-parser
  else if (req.body.newItem == "" && req.body.delItem == "") {
    warning = "Nothing Specified.";
  } else if (req.body.delItem != "" && req.body.newItem == "") {
    var index = arbitraryItems.indexOf(req.body.delItem);
    if (index > -1) {
      arbitraryItems.splice(index, 1);
    } else {
      warning = "Note Doesn't exist.";
    }
  } else {
    warning = "Choose one.";
  }
  if (list === "work") {
    workItems = arbitraryItems;
  } else {
    items = arbitraryItems;
  }
};
