const PostModel = require("../models/posts.models");

const getAllPosts = async (req, res) => {
  try {
    let posts = await PostModel.find();
    res.send(posts);
  } catch (err) {
    res.send({ message: "can't get the posts" });
  }
};

const createPost = async (req, res) => {
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.send({ message: "post has been created successfully" });
  } catch (err) {
    res.send({ message: "can't create the posts", error: err });
  }
};
const deletePost = async (req, res) => {
  const ID = req.params.id;
  try {
    await PostModel.findByIdAndDelete({ _id: ID });
    res.send({ message: `Post with id ${ID} is deleted successfull` });
  } catch (err) {
    res.send({ message: "can't delete the post" });
  }
};
const updatePost = async (req, res) => {
  const payload = req.body;
  const ID = req.params.id;
  try {
    await PostModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send({ messgae: "posts has been updated successfull" });
  } catch (err) {
    res.send({ message: "can't delete the posts", error: err });
  }
};
module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
};
