const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: String,
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

CommentSchema.pre("remove", async function (next) {
  await this.model("Book").updateOne({ $pull: { comments: this._id } });
  next();
});

module.exports = mongoose.model("Comment", CommentSchema);
