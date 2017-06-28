const express = require('express');
const router = express.Router();
const models = require('../models');
let todo = [];
let complete = [];

router.get("/", function (req , res) {
  models.todos.findAll().then(function (items) {
    res.render("index", {list: items});

  });




});


router.post("/", function (req, res) {
  let list_item = {todos: req.body.todo}
  console.log(list_item);
  models.todos.create(list_item).then(function (todoitem) {
    console.log("31",todoitem);

  });
  if (req.body.todo){
  todo.push(req.body.todo);
  }
  else {
    todo.splice(todo.indexOf(req.body.complete),1)
    complete.push(req.body.complete);

  }
  // let object = {
  //   todo: todo,
  //   complete: complete
  // };


    res.redirect("/");
});

module.exports = router;
