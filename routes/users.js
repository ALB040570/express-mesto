const router = require('express').Router();

const {
  getUsers, getProfile, postUsers, patchProfile, patchAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getProfile);
router.post('/users', postUsers);
router.patch('/users/me', patchProfile);
router.patch('/users/me/avatar', patchAvatar);

module.exports = router;
