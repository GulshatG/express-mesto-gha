const mongoose = require('mongoose');
const validator = require('validator');
const ValidationMessage = require('../utils/validationMessage');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ValidationMessage.name],
    minlength: [2, `${ValidationMessage.minLength} 2`],
    maxlength: [30, `${ValidationMessage.minLength} 30`],
  },
  about: {
    type: String,
    required: [true, ValidationMessage.name],
    minlength: [2, `${ValidationMessage.minLength} 2`],
    maxlength: [30, `${ValidationMessage.minLength} 30`],
  },
  avatar: {
    type: String,
    required: [true, ValidationMessage.avatar],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Wrong url',
    },
  },
}, { versionKey: false });
module.exports = mongoose.model('user', userSchema);
