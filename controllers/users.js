const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const getProfile = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error('Пользователь с таким id не найден');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res
          .status(400)
          .send({ message: 'Не валидный ID' });
      } else
      if (err.statusCode === 404) {
        res
          .status(404)
          .send({ message: 'Пользователь с таким ID не найден' });
      }
      res
        .status(500)
        .send({ message: 'Ошибка сервера' });
    });
};

const postUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') {
        if (err.errors.name) {
          res.status(ERROR_CODE).send({ message: err.errors.name.message });
        } else {
          if (err.errors.about) {
            res.status(ERROR_CODE).send({ message: err.errors.about.message });
          }
          res.status(ERROR_CODE).send({ message: err.errors.avatar.message });
        }
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const patchProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') {
        if (err.errors.name) {
          res.status(ERROR_CODE).send({ message: err.errors.name.message });
        } else {
          res.status(ERROR_CODE).send({ message: err.errors.about.message });
        }
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.errors.avatar.message });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports = {
  getUsers,
  getProfile,
  postUsers,
  patchProfile,
  patchAvatar,
};
