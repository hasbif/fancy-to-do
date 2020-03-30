const express = require("express");
const route = express.Router();
const controller = require("../controllers/todoscontroller");

route.get("/", controller.show);
route.post("/", controller.add);
route.get("/:id", controller.getbyId);
route.put("/:id", controller.edit);
route.delete("/:id", controller.delete);
module.exports = route;
