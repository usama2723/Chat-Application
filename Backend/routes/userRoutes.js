const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(allUsers);
router.route("/signup").post(registerUser);
router.post("/signin", authUser);

module.exports = router;
