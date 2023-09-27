const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
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
    salary:{
        type: number
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const staffModel = mongoose.model("staff", staffSchema);

module.exports = staffModel;
