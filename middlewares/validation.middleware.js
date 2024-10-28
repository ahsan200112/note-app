// middlewares/validation.js
const { check, validationResult } = require('express-validator');

exports.validateNote = [
  check('title').not().isEmpty().withMessage('Title is required'),
  check('content').not().isEmpty().withMessage('Content is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
