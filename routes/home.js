const express = require('express');
const router = express.Router();
const models = require('../models');
let todo = [];
let complete = [];

router.get("/", function (req , res) {
  models.todos.findAll().then(function (items) {
    res.render("index", {list: items ,complete: complete});

  });




});
const getid = function (req, res, next) {
  models.todos.findById(req.params.todoid).then(function (action) {
    if (action){
      req.action = action;
      console.log(action);
      next();
    }else {
      res.status(404).send("not found");
    }
  });
}


router.post("/", function (req, res) {
  let list_item = {todos: req.body.todo , complete: false}
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

router.post("/:todoid/complete" , getid ,function (req, res) {
  req.action.complete = true;
  req.action.save();
  res.redirect("/");
});

router.post("/:todoid/delete", getid, function (req, res) {
  req.action.destroy().then(function () {
    res.redirect("/");
  });

});

module.exports = router;
