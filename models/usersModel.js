const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    avatar: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const usersModel = new mongoose.model("users", usersSchema);

module.exports = usersModel;
