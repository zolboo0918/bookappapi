const express = require("express");
const { getBooks, getBook } = require("../controller/books");
const { writeComment } = require("../controller/comments");
const { checkToken } = require("../middleware/protect");

const router = express.Router();

router.route("/").get(getBooks);
router.route("/:id").get(getBook);

router.route("/:id/comments").post(checkToken, writeComment);

module.exports = router;
