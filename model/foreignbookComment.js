const mongoose = require("mongoose");

const ForeignBookCommentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  writedAt: {
    type: Date,
    default: Date.now(),
  },
  comment: String,
});

module.exports = mongoose.model("ForeignbookComment", ForeignBookCommentSchema);
