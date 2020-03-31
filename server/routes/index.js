const express = require("express");
const route = express.Router();
const todos = require("./todoroutes");
const UserController = require("../controllers/usercontroller");

route.post("/register", UserController.register);
route.post("/login", UserController.login);

route.get("/", (req, res) => {
  res.send("hi");
});

route.use("/todos", todos);

module.exports = route;
