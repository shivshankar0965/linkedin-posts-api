const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users.models");
dotenv.config({ path: "config/config.env" });

const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    res.send(users);
  } catch (err) {
    res.send({ message: "can't get the users", error: err });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, gender, age, city } = req.body;
  try {
    let userVerification = UserModel.find({ email });
    if (userVerification > 0) {
      res.send({ message: "user already exist Please login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ message: "Something went wrong" });
        } else {
          const user = new UserModel({
            name,
            email,
            password: hash,
            gender,
            age,
            city,
          });
          await user.save();
          res.send({ message: "user has been created successfull" });
        }
      });
    }
  } catch (err) {
    res.send({ message: "Something went wrong can't able to creat users" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({ message: "user logged in successfull", token: token });
        } else {
          res.send({ message: "wrong credential Please login" });
        }
      });
    } else {
      res.send({ message: "Wrong Credential Please Login" });
    }
  } catch (err) {
    res.send({ message: "Wrong Credential Please Login" });
  }
};
const deleteUser = async (req, res) => {
  const ID = req.params.id;
  try {
    await UserModel.findByIdAndDelete({ _id: ID });
    res.send({ message: `user with id ${ID} has been deleted successfully` });
  } catch (err) {
    res.send({ message: "can't delete the user", error: err });
  }
};
module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  loginUser,
};
