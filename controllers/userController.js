const userModel = require("../model/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, "DEEP_BLUE_SEA", { expiresIn: "3d" });
};

// signup user controller
const signupUser = async (req, res) => {
  const {
    userName,
    permanentAddress,
    presentAddress,
    email,
    mobile,
    isMobileNumberShow,
    bloodGroup,
    lastDonation,
    gender,
    dateOfBirth,
    password,
    isPlateletsDonor,
  } = req.body;

  // check empty field
  let emptyArr = [];

  if (!userName) {
    emptyArr.push("donorName");
  }
  if (!permanentAddress.district || !permanentAddress.address) {
    emptyArr.push("permanentAddress");
  }
  if (!presentAddress.district || !presentAddress.address) {
    emptyArr.push("presentAddress");
  }
  if (!email) {
    emptyArr.push("email");
  }
  if (!mobile) {
    emptyArr.push("mobile");
  }
  if (!isMobileNumberShow) {
    emptyArr.push("mobileNumberShow");
  }
  if (!bloodGroup) {
    emptyArr.push("bloodGroup");
  }
  if (!lastDonation) {
    emptyArr.push("lastDonation");
  }
  if (!gender) {
    emptyArr.push("gender");
  }
  if (!dateOfBirth) {
    emptyArr.push("dateOfBirth");
  }
  if (!password) {
    emptyArr.push("password");
  }

  if (emptyArr.length > 0) {
    console.log(emptyArr);
    return res
      .status(400)
      .json({ error: "please fill all the fields", emptyArr });
  }

  try {
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      throw new Error("Email already used");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      userName,
      permanentAddress,
      presentAddress,
      email,
      mobile,
      isMobileNumberShow,
      bloodGroup,
      lastDonation,
      gender,
      dateOfBirth,
      password: hash,
      isPlateletsDonor,
    });
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// loginUser controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all user information
const getUserInfo = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// get single user information
const getUniqueUser = async (req, res) => {
  const requestEmail = req.params.email;
  try {
    const user = await userModel.findOne({ email: requestEmail });
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// update user information
const updateUserInfo = async (req, res) => {
  const requestEmail = req.params.email;
  try {
    const user = await userModel.findOne({ email: requestEmail });
    if (!user) {
      res.status(400).json({ error: "user not found" });
    } else {
      Object.assign(user, req.body);
      user.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// export donorController to donorRoute.js
module.exports = {
  signupUser,
  loginUser,
  getUserInfo,
  getUniqueUser,
  updateUserInfo,
};
