const express = require("express");
const {
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
} = require("../controller/notes");
const { checkToken } = require("../middleware/protect");

const router = express.Router();

//api/v1/notes/
router.route("/").post(checkToken, createNote).get(checkToken, getAllNotes);

router
  .route("/:id")
  .get(checkToken, getNote)
  .put(checkToken, updateNote)
  .delete(checkToken, deleteNote);

module.exports = router;
