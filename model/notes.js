const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Тэмдгэлэлд гарчиг оруулна уу"],
    unique: [true, "Тэмдэглэлийн гарчиг давхцаж байна"],
  },
  note: {
    type: String,
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
  bookName: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
