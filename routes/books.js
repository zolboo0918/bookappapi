const express = require("express");
const { getBooks, getBook } = require("../controller/books");
const { writeComment, getBookAllComment } = require("../controller/comments");
const { checkToken } = require("../middleware/protect");

const router = express.Router();

// /api/v1/books
router.route("/").get(getBooks);
router.route("/:id").get(getBook);

router
  .route("/:id/comments")
  .post(checkToken, writeComment)
  .get(getBookAllComment);

module.exports = router;
