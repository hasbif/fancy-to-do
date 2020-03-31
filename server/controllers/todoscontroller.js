const { Todo } = require("../models");

class Todos {
  static show(req, res) {
    Todo.findAll({ where: { UserId: req.userId } })
      .then(data => {
        res.status(200).json({ todos: data });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static add(req, res) {
    let { title, description, status, due_date } = req.body;
    Todo.create(
      { title, description, status, due_date, UserId: req.userId },
      {}
    )
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError") {
          res.status(400).json(err);
        } else {
          res.status(500).json(err);
        }
      });
  }

  static getbyId(req, res) {
    Todo.findByPk(req.params.id, {})
      .then(data => {
        if (data) {
          res.status(200).json({ data });
        } else {
          res.status(404).json({ message: "Error, data not found" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static edit(req, res) {
    let { title, description, status, due_date } = req.body;
    let todo;
    Todo.findByPk(req.params.id)
      .then(data => {
        if (data) {
          todo = data;
          return Todo.update(
            { title, description, status, due_date },
            { where: { id: req.params.id } }
          );
        } else {
          res.status(404).json({ message: "Error, data not found" });
        }
      })
      .then(data => {
        res.status(200).json({ todo });
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError") {
          res.status(400).json(err);
        } else {
          res.status(500).json(err);
        }
      });
  }

  static delete(req, res) {
    let todo;
    Todo.findByPk(req.params.id)
      .then(data => {
        if (data) {
          todo = data;
          return Todo.destroy({ where: { id: req.params.id } });
        } else {
          res.status(404).json({ message: "Error, data not found" });
        }
      })
      .then(data => {
        res.status(200).json({ todo });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
}

module.exports = Todos;
