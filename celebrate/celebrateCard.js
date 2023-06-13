const {
  celebrate,
  Joi,
} = require('celebrate');
const { regexUrl } = require('../utils/regex');

module.exports.celebrateCreateCard = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .regex(regexUrl),
      likes: Joi.array()
        .items(Joi.string()
          .length(24)),
      createdAt: Joi.date(),
    }),
});
module.exports.celebrateCardById = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .length(24),
    }),
});
