const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createPost,
  getPosts,
  deletePost,
} = require("../controllers/communitycontroller");

router.post("/create", authMiddleware, createPost);
router.get("/", getPosts);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
