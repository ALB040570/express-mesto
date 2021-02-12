const router = require('express').Router(); // создали роутер
const getCards = require('../controlers/cards');

router.get('/cards', getCards);

module.exports = router; // экспортировали роутер
