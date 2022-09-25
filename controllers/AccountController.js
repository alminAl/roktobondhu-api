const accountModel = require("../model/AccountModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, "DEEP_BLUE_SEA", { expiresIn: "3d" });
};

// signup controller
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await accountModel.signup(email, password);
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await accountModel.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
