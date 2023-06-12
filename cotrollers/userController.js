const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const handleOkStatus = require('../utils/handleOkStatus');
const ValidationMessage = require('../utils/validationMessage');
const WrongCredentials = require('../exceptions/wrongCredentials');
const Unauthorized = require('../exceptions/unauthorized');
const { unauthorizedOrNotFound } = require('../utils/validationMessage');

function findUserById(userId, res, next) {
  User.findById(userId)
    .orFail()
    .then((data) => handleOkStatus(data, res))
    .catch(next);
}

module.exports.createUser = (req, res, next) => {
  const pass = req.body.password;
  bcrypt.hash(pass, 10)
    .then((hashPassword) => User.create({
      ...req.body,
      password: hashPassword,
    })
      .then((user) => {
        const userObj = user.toObject();
        delete userObj.password;
        return handleOkStatus(userObj, res, 201);
      }))
    .catch(next);
};
module.exports.getUserById = (req, res, next) => {
  findUserById(req.params.userId, res, next);
};
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((data) => handleOkStatus(data, res))
    .catch(next);
};
module.exports.deleteUserById = (req, res, next) => {
  if (req.params.userId === req.user._id) {
    User.findByIdAndDelete(req.params.userId)
      .orFail()
      .then((data) => handleOkStatus(data, res))
      .catch(next);
  } else {
    next(new Unauthorized(unauthorizedOrNotFound));
  }
};
module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((data) => handleOkStatus(data, res))
    .catch(next);
};
module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((data) => handleOkStatus(data, res))
    .catch(next);
};
module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(new WrongCredentials(ValidationMessage.credentials))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new WrongCredentials(ValidationMessage.credentials));
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        });
        return res.send(user);
      }))
    .catch(next);
};
module.exports.getMe = (req, res, next) => {
  findUserById(req.user._id, res, next);
};
