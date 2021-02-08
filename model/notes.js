const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Тэмдгэлэлд гарчиг оруулна уу"],
    unique: [true, "Тэмдэглэлийн гарчиг давхцаж байна"],
  },
  note: {
    type: String,
    maxLength: [3000, "Тэмдэглэл хэтэрхий урт байна"],
    required: [true, "Тэмдэглэл оруулна уу"],
  },
  writedAt: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  bookId: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
  },
});

module.exports = mongoose.model("Note", NoteSchema);
