const express = require("express");
const usersController = require("../../controllers/users.controller");

const router = express.Router();

router.route("/").get(usersController.home);

router.route("/all").get(usersController.allUsers);
router.route("/random").get(usersController.randomUser);
router.route("/save").post(usersController.saveUser);
router.route("/update").get(usersController.saveUser);
router.route("/bulk-update").get(usersController.saveUser);
router.route("/delete").get(usersController.saveUser);

module.exports = router;
