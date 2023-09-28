const express = require("express");
const blogsRoutes = express.Router();
const blogsModel = require("../models/blogsModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

blogsRoutes.get("/blogs", authMiddleware, async (req, res) => {
  try {
    let existingUserID = req.body.userID;
    let blogs = await blogsModel.findById(existingUserID);

    return res.status(200).send(blogs);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

blogsRoutes.post("/blogs", authMiddleware, async (req, res) => {
  try {
    // let existingUserID = req.body.userID;
    let blogs = await blogsModel.create({ ...req.body });

    return res.status(200).send(blogs);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = blogsRoutes;
