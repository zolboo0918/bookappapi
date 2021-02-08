const Book = require("../model/book");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const paginate = require("../utils/paginate");

exports.getBooks = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  ["page", "limit", "sort", "select"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Book);
  const books = await Book.find().sort(sort).select(select).limit(limit);
  res.status(200).json({ success: true, data: books, pagination });
  res.end();
});

exports.getBook = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    throw new MyError("Номын ID явуулна уу", 400);
  }

  const book = await Book.findById(id);

  if (!book) {
    throw new MyError("Номын мэдээлэл байхгүй байна. ID шалгана уу", 400);
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});
