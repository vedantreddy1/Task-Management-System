const express= require("express");
const route = express.Router();
const taskController = require("../controllers/taskController")


route.post("/assignTask/:id", taskController.AssignTask);

route.get("/showData", taskController.showTask);
route.get("/showDatabyId/:id", taskController.showTaskById);
route.put("/updateTask/:id", taskController.updateTaskStatus);



module.exports = route