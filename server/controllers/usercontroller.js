const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { checkPassword, hashPassword } = require("../helpers/bcrypts");
const axios = require("axios");

class UserController {

  static register(req, res) {
    let { email, password, username } = req.body;
    axios({
      "method": "GET",
      "url": "https://mailboxvalidator-mailboxvalidator-single-validation-v1.p.rapidapi.com/v1/validation/single",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "mailboxvalidator-mailboxvalidator-single-validation-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDKEY
      }, "params": {
        "key": process.env.EMAILVALIDATEKEY,
        "email": email
      }
    })
      .then((response) => {
        if (response.data.status == 'True') {
          return User.findOne({ where: { email: email } })
        } else {
          res.status(400).json({ msg: 'Email is Invalid' })
        }
      })
      .then(foundOne => {
        if (foundOne) {
          res.status(400).json({ msg: 'Email is Already Taken' })
        } else {
          return User.create({ email, password, username })
        }
      })
      .then(user => {
        const access_token = jwt.sign(
          {
            userId: user.id,
            userEmail: user.email
          },
          process.env.SECRET
        );
        res.status(201).json({ access_token });
      })
      .catch((error) => {
        res.status(500).json({ msg: 'Internal Server Error', error })
      })



    // User.create({ email, password, username })
    //   .then(user => {
    //     const access_token = jwt.sign(
    //       {
    //         userId: user.id,
    //         userEmail: user.email
    //       },
    //       process.env.SECRET
    //     );
    //     res.status(201).json({ access_token });
    //   })
    //   .catch(err => {
    //     res.status(500).json({ msg: "Internal Server Error", err });
    //   });
  }

  static login(req, res) {
    let { email, password } = req.body;
    User.findOne({ where: { email: email } }).then(user => {
      let msg = "Email/Password invalid";
      if (user) {
        if (checkPassword(password, user.password)) {
          const access_token = jwt.sign(
            {
              userId: user.id,
              userEmail: user.email
            },
            process.env.SECRET
          );
          res.status(200).json({ access_token });
        } else {
          res.status(400).json({ msg });
        }
      } else {
        res.status(400).json({ msg });
      }
    });
  }
}

module.exports = UserController;
