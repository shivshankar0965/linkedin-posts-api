const express = require("express");
const {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");
const router = express.Router();

router.route("/").get(getAllPosts);
router.route("/create").post(createPost);
router.route("/delete/:id").delete(deletePost);
router.route("/update/:id").patch(updatePost);
module.exports = router;
