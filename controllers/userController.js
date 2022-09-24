const userModel = require("../model/userModel.js");

// create user
const createUser = async (req, res) => {
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
      password,
      isPlateletsDonor,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// get users
const getUserInfo = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// get single user
const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// update user
const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      res.status(400).json({ error: "user not matched" });
    } else {
      Object.assign(user, req.body);
      user.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// export donorController to donorRoute.js
module.exports = {
  createUser,
  getUserInfo,
  getSingleUser,
  deleteUser,
  updateUser,
};
