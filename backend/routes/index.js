var express = require('express');
var router = express.Router();
var path = require('path');
const mainController = require("../controllers/mainController");
const userController = require("../controllers/userController");
const userLoginController = require("../controllers/userLoginController");

/* GET home page. */
router.get("/", mainController.init);

router.get("/signup", userLoginController.userlogin_create_get);

router.post("/signup", userLoginController.userlogin_create_post);

router.get("/users/:id", userController.find_User);

router.get("/users/:id/lists", userController.users_list);

router.get("/users/:id/library", userController.library_list);

router.get("/users/:id/following", userController.following_list);

router.get("/users/:id/followers", userController.followers_list);

module.exports = router;
