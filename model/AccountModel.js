const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

// account schema
const accountModel = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

// signup custom function
const bcrypt = require("bcrypt");
accountModel.static.signup = async function (email, password) {
  const isExistEmail = this.findOne({ email });
  if (!email || !password) {
    throw new Error({ error: "empty field is not allowed" });
  }
  if (isExistEmail) {
    throw new Error({ error: "email already used" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

// login custom function
accountModel.static.login = async function (email, password) {
  if (!email || !password) {
    throw new Error({ error: "empty field is not allowed" });
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error({ error: "invalid action" });
  }

  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    throw Error({ error: "invalid action" });
  }

  return user;
};

// export AccountModel to AccountController.js
module.exports = model("Account", accountModel);
