const express = require('express');
const {PORT = 3000} = process.env;
const app = express();
const userRouter=require('./routes/users.js');
const cardRouter=require('./routes/cards.js');


app.use(express.static(__dirname + '/public'));
app.use('/', cardRouter);
app.use('/', userRouter);
app.use((req, res, next)=> {
    res.status(404).send ({message:'Запрашиваемый ресурс не найден'});
    return;
  });



app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
}) 