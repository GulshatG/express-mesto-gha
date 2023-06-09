const mongoose = require('mongoose');
const validator = require('validator');
const ValidationMessage = require('../utils/validationMessage');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ValidationMessage.name],
    minlength: [2, `${ValidationMessage.minLength} 2`],
    maxlength: [30, `${ValidationMessage.minLength} 30`],
  },
  link: {
    type: String,
    required: [true, ValidationMessage.link],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Wrong url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, ValidationMessage.owner],
  },
  likes: {
    type: [[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }], ValidationMessage.type],
    default: [],
  },
  createdAt: {
    type: [Date, ValidationMessage.type],
    default: Date.now(),
  },
}, { versionKey: false });
module.exports = mongoose.model('card', cardSchema);
