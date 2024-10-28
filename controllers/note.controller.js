// controllers/noteController.js
const Note = require('../models/note.model');

const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const existingNote = await Note.findOne({ title });
    if (existingNote) return res.status(400).json({ message: 'Note with this title already exists' });

    const note = new Note({ title, content });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getNotes = async (req, res) => {
  const { offset = 0, limit = 10 } = req.query; // default offset 0, limit 10
  try {
    // Parse offset and limit to integers
    const offsetInt = parseInt(offset, 10);
    const limitInt = parseInt(limit, 10);

    // Fetch notes with pagination and total count
    const notes = await Note.find().skip(offsetInt).limit(limitInt);
    const total = await Note.countDocuments();

    // Respond with notes data and total count
    res.status(200).json({ data: notes, total,status:true });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error,status:false  });
  }
};


const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = {deleteNote,updateNote,createNote,getNotes}