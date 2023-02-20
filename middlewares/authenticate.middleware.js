const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "config/config.env" });

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.key, (err, decoded) => {
      if (decoded) {
        req.body.user = decoded.userID;

        next();
      } else {
        res.send({ message: "Please Login First" });
      }
    });
  } else {
    res.send({ message: "Please Login First" });
  }
};

module.exports = authenticate;
