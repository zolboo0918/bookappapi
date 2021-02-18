const Notes = require("../model/notes");
const Book = require("../model/book");
const User = require("../model/user");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError");

exports.getAllNotes = asyncHandler(async (req, res, next) => {
  const notes = await Notes.find();

  if (!notes) {
    throw new MyError("Тэмдэглэл олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: notes,
  });
});

exports.getNote = asyncHandler(async (req, res, next) => {
  const note = await Notes.findById(req.params.id);

  if (!note) {
    throw new MyError("Тэмдэглэл олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});

exports.createNote = asyncHandler(async (req, res, next) => {
  const dbNote = await Notes.create(req.body);

  if (!dbNote) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: dbNote,
  });
});

exports.updateNote = asyncHandler(async (req, res, next) => {
  const note = await Notes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!note) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});

exports.deleteNote = asyncHandler(async (req, res, next) => {
  const note = await Notes.findByIdAndDelete(req.params.id);

  if (!note) {
    throw new MyError("Амжилтгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});

exports.getUserNotes = asyncHandler(async (req, res, next) => {
  const note = await Notes.find({ userId: req.params.id });

  if (!note) {
    throw new MyError("Тэмдэглэл олдсонгүй", 400);
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});
