const {
  celebrate,
  Joi,
} = require('celebrate');

module.exports.celebrateCreateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
      // avatar: Joi.string()
      //   .uri(),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(8),
    }).unknown(true),
});
module.exports.celebrateLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(8),
    }),
});
module.exports.celebrateUserById = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .required()
        .length(24),
    }),
});
