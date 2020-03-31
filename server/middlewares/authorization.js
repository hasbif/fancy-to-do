const { Todo } = require("../models");

function authorize(req, res, next) {
  Todo.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(todo => {
      if (todo) {
        if (todo.UserId == req.userId) {
          next();
        } else {
          res.status(400).json({
            message: "access denied"
          });
        }
      } else {
        res.status(404).json({
          message: "todo not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "internal server error"
      });
      console.log(err);
    });
}

module.exports = authorize;
