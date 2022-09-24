const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

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

// export donorModel to donorController.js
module.exports = model("users", userSchema);
