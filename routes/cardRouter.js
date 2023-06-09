const router = require('express')
  .Router();
const {
  getCards,
  getCardById,
  createCard,
  addLike,
  deleteLike,
} = require('../cotrollers/cardController');

router.get('/', getCards);
router.get('/:cardId', getCardById);
router.post('/', createCard);
router.put('/:cardId/likes', addLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
