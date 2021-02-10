const router = require('express').Router(); // создали роутер

const {getUsers, getProfile} = require('../controlers/users');


router.get('/users', getUsers);
router.get('/users/:id', getProfile);

module.exports = router; // экспортировали роутер