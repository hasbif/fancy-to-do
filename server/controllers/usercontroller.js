const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { checkPassword, hashPassword } = require("../helpers/bcrypts");

class UserController {
  static register(req, res) {
    let { email, password, role } = req.body;

    User.create({ email, password, role })
      .then(user => {
        const token = jwt.sign(
          {
            userId: user.id,
            userEmail: user.email
          },
          "corona"
        );
        res.status(201).json({ token });
      })
      .catch(err => {
        res.status(500).json({ msg: "internal server error", err });
      });
  }

  static login(req, res) {
    let { email, password } = req.body;
    User.findOne({ where: { email: email } }).then(user => {
      let message = "email/password invalid";
      if (user) {
        if (checkPassword(password, user.password)) {
          const token = jwt.sign(
            {
              userId: user.id,
              userEmail: user.email
            },
            "corona"
          );
          res.status(200).json({ token });
        } else {
          res.status(400).json({ message });
        }
      } else {
        res.status(400).json({ message });
      }
    });
  }
}

module.exports = UserController;
