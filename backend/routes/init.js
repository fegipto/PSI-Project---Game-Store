const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");
const userController = require("../controllers/userController");

router.get("/init", mainController.init);

router.get("/user/:id", userController.find_User);

module.exports = router;
