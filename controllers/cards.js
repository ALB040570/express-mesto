const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};

const postCards = (req, res) => {
  const { name, link, createdAt } = req.body;
  const { _id } = req.user;

  Card.create({
    name,
    link,
    createdAt,
    owner: _id,
  })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') {
        if (err.errors.name) {
          res.status(ERROR_CODE).send({ message: err.errors.name.message });
        } else {
          if (err.errors.link) {
            res.status(ERROR_CODE).send({ message: err.errors.link.message });
          }
          res.status(ERROR_CODE).send({ message: err.errors.createdAt.message });
        }
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const err = new Error('Карточка с таким id не найдена');
      err.statusCode = 404;
      throw err;
    })
    .populate(['likes', 'owner'])
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res
          .status(400)
          .send({ message: 'Не валидный ID карточки' });
      } else
      if (err.statusCode === 404) {
        res
          .status(404)
          .send({ message: 'Карточка с таким ID не найдена' });
      }
      res
        .status(500)
        .send({ message: 'Ошибка сервера' });
    });
};

const addLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: {
        likes: _id,
      },
    },
    {
      new: true,
    },
  )
    .populate(['likes', 'owner'])
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

const deleteLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: {
        likes: _id,
      },
    },
    {
      new: true,
    },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports = {
  getCards, postCards, deleteCard, addLike, deleteLike,
};
