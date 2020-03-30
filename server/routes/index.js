const express = require("express");
const route = express.Router();
const todos = require("./todoroutes");

route.get("/", (req, res) => {
  res.send("hi");
});

route.use("/todos", todos);

module.exports = route;
