const { Todo } = require("../models");
const axios = require("axios");

class Todos {
  static show(req, res) {
    Todo.findAll({ where: { UserId: req.userId }, order: [['id', 'ASC']] })
      .then(data => {
        res.status(200).json({ todos: data });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static add(req, res) {
    let { title, description, status, due_date } = req.body;

    // axios({
    //   method: "GET",
    //   url: "https://montanaflynn-spellcheck.p.rapidapi.com/check/",
    //   headers: {
    //     "content-type": "application/octet-stream",
    //     "x-rapidapi-host": "montanaflynn-spellcheck.p.rapidapi.com",
    //     "x-rapidapi-key": "21eedf4d07msha5d52bf1a701aa8p19733bjsn8fa2554194df"
    //   },
    //   params: {
    //     text: description
    //   }
    // })
    //   .then(response => {
    //     spellcheck = response.data;
    //     return Todo.create(
    //       {
    //         title,
    //         description,
    //         status: "not done",
    //         due_date,
    //         UserId: req.userId
    //       },
    //       {}
    //     );
    //   })
    //   .then(data => {
    //     res.status(201).json({ data, spellcheck });
    //   })
    //   .catch(err => {
    //     if (err.name == "SequelizeValidationError") {
    //       res.status(400).json(err);
    //     } else {
    //       res.status(500).json(err);
    //     }
    //     console.log(err);
    //   });

    Todo.create(
      { title, description, status: "0%", due_date, UserId: req.userId },
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

  static checkdescription(req, res) {
    let description = req.body.description;
    let spellcheck;
    console.log(description);
    if (description) {
      axios({
        method: "GET",
        url: "https://montanaflynn-spellcheck.p.rapidapi.com/check/",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "montanaflynn-spellcheck.p.rapidapi.com",
          "x-rapidapi-key": process.env.SPELLAPI
        },
        params: {
          text: description
        }
      })
        .then(response => {
          spellcheck = response.data;
          res.status(200).json({ spellcheck });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      res.status(400).json({ message: "description is empty" });
    }
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
    console.log(req.body);
    let todo;
    Todo.findByPk(req.params.id)
      .then(data => {
        if (data) {
          // todo = data;
          return Todo.update(
            { title, description, status, due_date },
            { where: { id: req.params.id } }
          );
        } else {
          res.status(404).json({ message: "Error, data not found" });
        }
      })
      .then(data => {
        if (data == 1) {
          res.status(200).json({ title, description, status, due_date });
        } else {
          res.status(400).json({ message: "failed to update data" });
        }
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
