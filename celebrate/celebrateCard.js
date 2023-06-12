const {
  celebrate,
  Joi,
} = require('celebrate');

module.exports = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .uri(),
      owner: Joi.string()
        .required()
        .length(24),
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
