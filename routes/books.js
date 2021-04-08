const express = require("express");
const { getBooks, getBook, setRating } = require("../controller/books");
const { writeComment, getBookAllComment } = require("../controller/comments");
const { checkToken } = require("../middleware/protect");
const {
  getforeignbookAllComment,
} = require("../controller/foreignbookComments");

const router = express.Router();

// /api/v1/books
router.route("/").get(getBooks);
router.route("/:id").get(getBook);

router
  .route("/:id/comments")
  .post(checkToken, writeComment)
  .get(checkToken, getBookAllComment);

router.route("/:id/rating").post(checkToken, setRating);

router
  .route("/:id/foreignbookComments")
  .get(checkToken, getforeignbookAllComment);

module.exports = router;
