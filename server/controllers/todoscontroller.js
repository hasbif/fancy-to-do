const { Todo } = require("../models");

class Todos {
  static show(req, res) {
    Todo.findAll({})
      .then(data => {
        res.status(200).json({ todos: data });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static add(req, res) {
    let { title, description, status, due_date } = req.body;
    Todo.create({ title, description, status, due_date }, {})
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
}

module.exports = Todos;
