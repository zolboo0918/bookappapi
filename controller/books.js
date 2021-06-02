const Book = require("../model/book");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");
const paginate = require("../utils/paginate");

exports.getBooks = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort;
  const select = req.query.select;
  const search = req.query.search || "";

  ["page", "limit", "sort", "select", "search"].forEach(
    (el) => delete req.query[el]
  );

  const pagination = await paginate(page, limit, Book);
  console.log("aaaaa", req.query, select);
  const books = await Book.find(
    {
      ...req.query,
      title: { $regex: search, $options: "i" },
    },
    select
  )
    .sort(sort)
    .limit(limit);
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

exports.deleteBook = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    throw new MyError("Номын ID явуулна уу", 400);
  }

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    throw new MyError("Номын мэдээлэл байхгүй байна. ID шалгана уу", 400);
  }

  res.status(200).json({
    success: "true",
    data: book,
});

exports.getCategoryBooks = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  let book;

  if (id === "topRated") {
    book = await Book.find({ rating: { $gt: 4 } });
  } else if (id === "new") {
    book = await Book.find().sort({ release_date: -1 }).limit(10);
  } else if (id === "bestSeller") {
    book = await Book.find().sort({ $natural: 1 }).limit(10);
  }

  res.status(200).json({ success: true, data: book });
  res.end();
});

// exports.setRating = asyncHandler(async (req, res, next) => {
//   const book = await Book.findById(req.params.id);
//   if (!book) {
//     throw new MyError("Ном олдсонгүй", 400);
//   }
//   console.log("book", book);

//   if (!book.ratingCount) {
//     book.ratingCount = 1;
//   }

//   const ratingCount = book.ratingCount + 1;
//   const rating =
//     (book.rating * book.ratingCount + Number(req.body.rating)) / ratingCount;

//   await book.updateOne({ ratingCount, rating });
//   await book.save();

//   res.status(200).json({
//     success: true,
//   })
// })
