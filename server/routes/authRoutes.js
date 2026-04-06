const express = require("express");

const route = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

route.post("/register", authController.Signup);
route.post("/login",  authController.Login);
route.get("/showData", authController.ShowUserData);

route.get("/showData/:id", authController.ShowUserDataById);

module.exports = route;
