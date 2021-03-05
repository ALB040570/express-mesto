const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'отсутствует обязательное поле "имя пользователя"'],
    minlength: [2, 'имя пользователя короче двух символов'],
    maxlength: [30, 'имя пользователя длинее 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'отсутствует обязательное поле "информация о пользователе"'],
    minlength: [2, 'информация о пользователе короче двух символов'],
    maxlength: [30, 'информация о пользователе длинее 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'отсутствует обязательное поле "аватар"'],
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        const regex = /(https?:\/\/)(w{3}\.)?([a-z0-9\-]+\.[a-z]+)(\/[\w\-\._~:\/\?#\[\]@\!\$&'\(\)\*\+,;=]*\/?#?)?/;
        return regex.test(v);
      },
      message: 'унифицированный указатель ресурса (url аватара) начинается не с http:// или https:// или не указан домен',
    },
  },
});
module.exports = mongoose.model('user', userSchema);
