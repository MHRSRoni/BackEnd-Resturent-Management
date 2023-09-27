const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phn_num: {
      type: String,
      unique: true,
    },
    profilePic: {
      type: String,
    },
    otp:{
      type: number,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
