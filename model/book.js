const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Номын нэр оруулна уу"],
    trim: true,
    maxLength: [250, "Номын нэрний урт дээд тал нь 250 тэмдэгт байх ёстой."],
  },
  cover: String,
  description: {
    type: String,
    required: [true, "Номын тайлбарыг оруулна уу"],
    maxLength: [500, "Номын тайлбарын урт дээд тал нь 500 тэмдэгт байх ёстой."],
  },
  categories: {
    type: String,
    required: [true, "Номын төрлийг оруулна уу"],
  },
  release_date: {
    type: Date,
    required: [true, "Номын хэвлэгдсэн огноог оруулна уу"],
  },
  isbn: {
    type: String,
    maxLength: [17, "Номын ISBN кодын урт 17 тэмдэгт байна"],
  },
  publisher: {
    name: {
      type: String,
      required: [true, "Номын зохиогчийн нэрийг оруулна уу"],
      maxLength: 50,
    },
    description: {
      type: String,
      maxLength: 200,
    },
    cover: String,
  },
  rating: {
    type: Number,
    min: [1, "Үнэлгээ хамгийн багадаа 1 байна"],
    max: [5, "Үнэлгээ хамгийн ихдээ 5 байна"],
  },
  comments: {
    type: [mongoose.Schema.ObjectId],
    ref: "Comment",
  },
});

module.exports = mongoose.model("Book", BookSchema);
