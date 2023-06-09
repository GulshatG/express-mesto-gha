const Card = require('../models/card');
const handleOkStatus = require('../utils/handleOkStatus');
const handleException = require('../utils/handleException');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((data) => handleOkStatus(data, res))
    .catch((err) => handleException(err, res));
};
module.exports.getCardById = (req, res) => {
  const id = req.params.cardId;
  Card.findById(id)
    .orFail()
    .populate('owner')
    .then((data) => handleOkStatus(data, res))
    .catch((err) => handleException(err, res));
};
module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  Card.create({
    ...req.body,
    owner,
  })
    .then((data) => handleOkStatus(data, res, 201))
    .catch((err) => handleException(err, res));
};
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((data) => handleOkStatus(data, res))
    .catch((err) => handleException(err, res));
};
module.exports.addLike = (req, res) => {
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
    .catch((err) => handleException(err, res));
};
module.exports.deleteLike = (req, res) => {
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
    .catch((err) => handleException(err, res));
};
