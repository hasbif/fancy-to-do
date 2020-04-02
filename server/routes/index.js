const express = require("express");
const route = express.Router();
const todos = require("./todoroutes");
const UserController = require("../controllers/usercontroller");
const GoogleController = require('../controllers/googlecontroller')

route.post("/register", UserController.register);
route.post("/login", UserController.login);
route.post('/google-sign-in', GoogleController.signin)

route.get("/", (req, res) => {
  res.send("hi");
});

route.use("/todos", todos);

module.exports = route;
