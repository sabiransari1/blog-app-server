const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    likes: { type: Number, required: true },
    comments: {
      type: [{ username: String, content: String }],
      required: false,
    },
    userID: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const blogsModel = new mongoose.model("blogs", blogsSchema);

module.exports = blogsModel;
