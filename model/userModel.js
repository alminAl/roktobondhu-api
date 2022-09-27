const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    permanentAddress: {
      district: {
        type: String,
        require: true,
      },
      address: {
        type: String,
        require: true,
      },
    },
    presentAddress: {
      district: {
        type: String,
        require: true,
      },
      address: {
        type: String,
        require: true,
      },
    },
    email: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
      require: true,
    },
    isMobileNumberShow: {
      type: Boolean,
      require: true,
    },
    bloodGroup: {
      type: String,
      require: true,
    },
    lastDonation: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    dateOfBirth: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    isPlateletsDonor: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("empty field is not allowed");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("invalid action");
  }

  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) {
    throw Error("invalid action");
  }

  return user;
};
// export donorModel to donorController.js
module.exports = model("users", userSchema);
