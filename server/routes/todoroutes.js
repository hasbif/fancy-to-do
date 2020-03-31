const express = require("express");
const route = express.Router();
const controller = require("../controllers/todoscontroller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

route.use(authentication);

route.get("/", controller.show);
route.post("/", controller.add);
route.get("/:id", authorization, controller.getbyId);
route.put("/:id", authorization, controller.edit);
route.delete("/:id", authorization, controller.delete);
module.exports = route;
