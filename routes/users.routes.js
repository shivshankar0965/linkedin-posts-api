const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/create").post(createUser);
router.route("/login").post(loginUser);
router.route("/delete/:id").delete(deleteUser);
module.exports = router;
