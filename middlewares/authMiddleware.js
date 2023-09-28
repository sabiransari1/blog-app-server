const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.token;

    if (token) {
      let verfiy = await jwt.verify(token, process.env.SECRET_KEY);

      req.body.userID = verfiy.userID;

      return next();
    }
  } catch (error) {
    return res.status(400).send({ error });
  }
};

module.exports = authMiddleware;
