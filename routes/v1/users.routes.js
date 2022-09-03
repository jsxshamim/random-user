const express = require("express");
const usersController = require("../../controllers/users.controller");

const router = express.Router();

router.route("/").get(usersController.home);

router.route("/all").get(usersController.allUsers);
router.route("/random").get(usersController.randomUser);
router.route("/save").post(usersController.saveUser);
router.route("/update/:id").patch(usersController.updateUser);
router.route("/bulk-update").patch(usersController.bulkUpdate);
router.route("/delete/:id").delete(usersController.deleteUser);

module.exports = router;
