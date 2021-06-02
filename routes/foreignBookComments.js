const express = require("express");
const {
  deleteComment,
  getAllComment,
  updateComment,
  writeComment,
  getComment,
} = require("../controller/foreignbookComments");
const { checkToken } = require("../middleware/protect");

const router = express.Router();

// api/v1/foreignbookComments
router.route("/").get(checkToken, getAllComment);
router
  .route("/:id")
  .get(checkToken, getComment)
  .post(checkToken, writeComment)
  .delete(checkToken, deleteComment)
  .put(checkToken, updateComment);

module.exports = router;
