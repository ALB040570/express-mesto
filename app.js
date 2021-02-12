const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');

app.use(express.static(`${__dirname}/public`));
app.use('/', cardRouter);
app.use('/', userRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
