const express = require("express");
const usersController = require("../../controllers/users.controller");

const router = express.Router();

router.route("/").get(usersController.home);

router.route("/all").get(usersController.allUsers);
router.route("/random").get(usersController.randomUser);
router.route("/save").get(usersController.getUser);
router.route("/update").get(usersController.getUser);
router.route("/bulk-update").get(usersController.getUser);
router.route("/delete").get(usersController.getUser);

module.exports = router;
