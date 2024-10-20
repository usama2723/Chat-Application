const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/signup").post(registerUser);
router.post("/signin", authUser);

module.exports = router;
