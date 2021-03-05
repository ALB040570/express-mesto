const router = require('express').Router();
const {
  getCards, postCards, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', postCards);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', addLike);
router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;
