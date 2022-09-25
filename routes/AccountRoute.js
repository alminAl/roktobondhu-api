const express = require("express");
const { signupUser, loginUser } = require("../controllers/AccountController");
router = express();


// signup router
router.post('/signup', signupUser);

// login router
router.post('/login', loginUser);

module.exports = router;