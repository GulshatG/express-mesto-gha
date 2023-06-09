const User = require('../models/user');
const handleOkStatus = require('../utils/handleOkStatus');
const handleException = require('../utils/handleException');

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((data) => handleOkStatus(data, res))
    .catch((err) => handleException(err, res));
};
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((data) => handleOkStatus(data, res))
    .catch((err) => handleException(err, res));
};
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => handleOkStatus(data, res))
    .catch((err) => handleException(err, res));
};
module.exports.deleteUserById = (req, res) => {
  User.findByIdAndDelete(req.params.userId)
    .orFail()
    .then((data) => handleOkStatus(data, res))
    .catch((err) => handleException(err, res));
};
module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((data) => handleOkStatus(data, res))
    .catch((err) => handleException(err, res));
};
module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((data) => handleOkStatus(data, res))
    .catch((err) => handleException(err, res));
};
