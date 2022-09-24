const express = require("express");
const router = express();
const {
  createUser,
  getUserInfo,
  getSingleUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController.js");

// post donor info
router.post("/", createUser);

// get donor info
router.get("/", getUserInfo);

// get single info
router.get("/:id", getSingleUser);

// delete user
router.delete("/:id", deleteUser);

// update user
router.patch("/:id", updateUser);

module.exports = router;
