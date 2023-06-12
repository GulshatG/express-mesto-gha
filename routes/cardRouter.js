const router = require('express')
  .Router();
const {
  celebrateCreateCard,
  celebrateCardById,
} = require('../celebrate/celebrateCard');
const {
  getCards,
  getCardById,
  createCard,
  addLike,
  deleteLike,
  deleteCard,
} = require('../cotrollers/cardController');

router.get('/', getCards);
router.get('/:cardId', celebrateCardById, getCardById);
router.post('/', celebrateCreateCard, createCard);
router.delete('/:cardId', celebrateCardById, deleteCard);
router.put('/:cardId/likes', celebrateCardById, addLike);
router.delete('/:cardId/likes', celebrateCardById, deleteLike);

module.exports = router;
