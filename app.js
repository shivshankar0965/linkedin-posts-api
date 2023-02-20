const express = require("express");
const cors = require("cors");
const user = require("./routes/users.routes");
const post = require("./routes/posts.routes");
const authenticate = require("./middlewares/authenticate.middleware");

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("welcome home");
});
app.use("/users", user);
app.use(authenticate);
app.use("/posts", post);
module.exports = app;
