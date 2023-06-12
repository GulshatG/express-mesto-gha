const Card = require('../models/card');
const handleOkStatus = require('../utils/handleOkStatus');
const Unauthorized = require('../exceptions/unauthorized');
const { unauthorizedOrNotFound } = require('../utils/validationMessage');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((data) => handleOkStatus(data, res))
    .catch(next);
};
module.exports.getCardById = (req, res, next) => {
  const id = req.params.cardId;
  Card.findById(id)
    .orFail()
    .populate('owner')
    .then((data) => handleOkStatus(data, res))
    .catch(next);
};
module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  Card.create({
    ...req.body,
    owner,
  })
    .then((data) => handleOkStatus(data, res, 201))
    .catch(next);
};
module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndRemove({
    _id: req.params.cardId,
    owner: req.user._id,
  })
    .orFail(new Unauthorized(unauthorizedOrNotFound))
    .then((data) => handleOkStatus(data, res))
    .catch(next);
};
module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((data) => handleOkStatus(data, res))
    .catch(next);
};
module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((data) => handleOkStatus(data, res))
    .catch(next);
};
