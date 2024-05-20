const User = require("../models/User");
const Note = require("../models/Note");

const asynHandler = require("express-async-handler");
const mongoose = require("mongoose");

//=================================GET ALL NOTES==================================
// @desc Get all notes
// @route /notes
// @method GET
// @access Private
const getAllNotes = asynHandler(async (req, res) => {
  const notes = await Note.find().lean();

  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }

  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const id = note.user;
      const user = await User.findById(id);
      return { username: user.username, ...note };
    })
  );
  res.json(notesWithUser);
});

//=================================CREATE A NOTE==================================
// ticket #, title, text, created & updated dates
// Notes are either OPEN or COMPLETED
// @desc Create a note
// @route /notes
// @method POST
// @access Private
const createNewNote = asynHandler(async (req, res) => {
  const { user, title, text } = req.body;

  // Confirm data
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate note title" });
  }
  // Create and store new note
  const NoteObject = { user, title, text };

  const note = await Note.create(NoteObject);

  if (note) {
    res.status(201).json({ message: `New note '${title}' created` });
  } else {
    res.status(400).json({ message: "Invalid note data recieved" });
  }
});

//=================================UPDATE A NOTE==================================

// @desc Update a note
// @route /notes
// @method PATCH
// @access Private
const updateNote = asynHandler(async (req, res) => {
  const { user, _id, title, text, completed } = req.body;

  // Confirm data
  if (!user || !_id || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid mongoose note ID" });
  }
  const note = await Note.findById(_id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }
  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  // Allow renaming of the original note
  if (duplicate && duplicate?._id.toString() !== _id) {
    return res.status(409).json({ message: "Duplicate note title" });
  }
  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = note.save();

  res.json({ message: `${title} note updated` });
});

//=================================DELETE A NOTE==================================

// @desc Delete a note
// @route /notes
// @method DELETE
// @access Private
const deleteNote = asynHandler(async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    res.status(400).res.json({ message: "Note ID required" });
  }
  const note = await Note.findById(_id).exec();

  if (!note) {
    res.status(400).json({ message: "Note not found" });
  }
  const result = await note.deleteOne();

  const reply = `Note ${title} with ID ${_id} deleted`;
  res.json(reply);
});

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
};
