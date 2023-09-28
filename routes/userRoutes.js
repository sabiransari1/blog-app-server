const express = require("express");
const userRoutes = express.Router();
const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRoutes.post("/register", async (req, res) => {
  try {
    let { username, avatar, email, password } = req.body;

    let userCheck = await usersModel.find({ email });

    if (!userCheck) {
      return res.status(400).send({ msg: "User is already registered" });
    }

    let hashPassword = await bcrypt.hash(password, 8);

    let user = await usersModel.create({ ...req.body, password: hashPassword });
    return res
      .status(200)
      .send({ msg: "Registered Successfull", user: { ...req.body } });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

userRoutes.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    let userCheck = await usersModel.find({ email });

    if (!userCheck) {
      return res.status(400).send({ msg: "Please Registered Again" });
    }

    let PasswordCheck = await bcrypt.compare(password, userCheck.password);

    if (!PasswordCheck) {
      return res.status(400).send({ msg: "Incorrect password" });
    }

    let token = jwt.sign({ userID: userCheck._id }, process.env.SECRET_KEY);

    return res.status(200).send({ msg: "Login Successfull", token, userCheck });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = userRoutes;
