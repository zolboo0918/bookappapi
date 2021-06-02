const express = require("express");
const { getCategoryBooks } = require("../controller/books");

const router = express.Router();

// /api/v1/category
router.route("/:id").get(getCategoryBooks);

module.exports = router;
