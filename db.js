const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Server is connected to database...");
  } catch (error) {
    return res.status(400).send({ error });
  }
};

module.exports = connection;
