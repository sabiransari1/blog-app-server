const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connection = require("./db");
const userRoutes = require("./routes/userRoutes");
const blogsRoutes = require("./routes/blogsRoutes");

app.use(express.text());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    return res.status(200).send("Blog App...");
  } catch (error) {
    return res.status(400).send({ error });
  }
});

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogsRoutes);

app.listen(process.env.PORT || 7070, () => {
  try {
    connection();

    console.log(`Server is running ${process.env.PORT || 7070}...`);
  } catch (error) {
    return res.status(400).send({ error });
  }
});
