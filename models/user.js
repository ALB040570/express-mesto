const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    // validate: {
    //   validator(v) {
    //     return v >= 18; // если возраст меньше 18, вернётся false
    //   },
    //   message: 'Вам должно быть больше 18 лет!',
    // },
  },
});
module.exports = mongoose.model('user', userSchema);
