const ForeignbookComment = require("../model/foreignbookComment");
const Book = require("../model/book");
const User = require("../model/user");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");

exports.writeComment = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.body.userId);

  if (!user) {
    throw new MyError("Хэрэглэгч олдсонгүй", 400);
  }

  const comm = await ForeignbookComment.create({
    ...req.body,
    id: req.params.id,
  });

  if (!comm) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: comm,
    user,
  });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const dbComment = await ForeignbookComment.findByIdAndDelete(req.params.id);

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  const dbComment = await ForeignbookComment.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});

exports.getAllComment = asyncHandler(async (req, res, next) => {
  const dbComment = await ForeignbookComment.find();

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});

exports.getComment = asyncHandler(async (req, res, next) => {
  const dbComment = await ForeignbookComment.findById(req.params.id).populate(
    "userId"
  );

  if (!dbComment) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbComment,
  });
});

exports.getforeignbookAllComment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    throw new MyError("Номын ID явуулна уу", 400);
  }

  const book = await ForeignbookComment.find({ id }).populate("userId");

  if (!book) {
    throw new MyError("Номын мэдээлэл байхгүй байна. ID шалгана уу", 400);
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});
