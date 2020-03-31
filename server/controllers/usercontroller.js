const { User } = require("../models");

class UserController {
  static register(req, res) {
    let { email, password, role } = req.body;
    User.create({ email, password, role })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({ msg: "internal server error", err });
      });
  }
}

module.exports = UserController;
