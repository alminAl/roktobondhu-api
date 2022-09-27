const express = require("express");
const {
  signupUser,
  loginUser,
  getUserInfo,
  getUniqueUser,
  updateUserInfo,
  filterUser,
} = require("../controllers/userController");
const router = express();
// const requireAuth = require("../middleware/requireAuth")
// router.use(requireAuth);

// signup router
router.post("/signup", signupUser);

// login router
router.post("/login", loginUser);

// get all user info
router.get("/", getUserInfo);

// get user by email
router.get("/:email", getUniqueUser);

// update user by email
router.patch("/edit_user/:email", updateUserInfo);

// filter user by bloodGroup and address
router.get("/search/:key", filterUser);

module.exports = router;
