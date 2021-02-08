const Comment = require("../model/comment");
const Book = require("../model/book");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");

exports.writeComment = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.body.bookId);
  if (!book) {
    throw new MyError("Ном олдсонгүй", 400);
  }
  const dbComment = await Comment.create(req.body);

  await book.updateOne({ $push: { comments: dbComment._id } });

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const dbComment = await Comment.findById(req.params.id);

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  const book = await Book.findByIdAndUpdate(dbComment.bookId, {
    $pull: { comments: dbComment._id },
  });

  if (!book) {
    throw new MyError("Ном олдсонгүй", 400);
  }

  dbComment.remove();

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  const dbComment = await Comment.findByIdAndUpdate(req.params.id, req.body);

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});

exports.getAllComment = asyncHandler(async (req, res, next) => {
  const dbComment = await Comment.find();

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});

exports.getComment = asyncHandler(async (req, res, next) => {
  const dbComment = await Comment.find({ _id: req.params.id });

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});
