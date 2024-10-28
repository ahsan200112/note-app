// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const { createNote, getNotes, updateNote, deleteNote } = require('../controllers/note.controller');
const { validateNote } = require('../middlewares/validation.middleware');

router.post('/notes', validateNote, createNote);
router.get('/notes', getNotes);
router.put('/notes/:id', validateNote, updateNote);
router.delete('/notes/:id', deleteNote);

module.exports = router;
