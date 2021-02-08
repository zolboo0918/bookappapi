const express = require("express");
const {
  writeComment,
  deleteComment,
  getAllComment,
  getComment,
  updateComment,
} = require("../controller/comments");
const { checkToken } = require("../middleware/protect");

const router = express.Router();

router.route("/").post(checkToken, writeComment).get(checkToken, getAllComment);
router
  .route("/:id")
  .delete(checkToken, deleteComment)
  .get(checkToken, getComment)
  .put(checkToken, updateComment);

module.exports = router;
