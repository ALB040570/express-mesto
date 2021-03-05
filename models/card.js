const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'отсутствует обязательное поле "имя карточки"'],
    minlength: [2, 'имя карточки короче двух символов'],
    maxlength: [30, 'имя карточки длинее 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'отсутствует обязательное поле "ссылка на картинку"'],
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        const regex = /(https?:\/\/)(w{3}\.)?([a-z0-9\-]+\.[a-z]+)(\/[\w\-\._~:\/\?#\[\]@\!\$&'\(\)\*\+,;=]*\/?#?)?/;
        return regex.test(v);
      },
      message: 'унифицированный указатель ресурса (url ссылки на картинку) начинается не с http:// или https:// или не указан домен',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);
