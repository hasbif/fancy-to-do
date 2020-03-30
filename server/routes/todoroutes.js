const express = require("express");
const route = express.Router();
const controller = require("../controllers/todoscontroller");

route.get("/", controller.show);
route.post("/", controller.add);
module.exports = route;
