const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const cardRouter = require('./routes/cardRouter');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '647fc93a235290fbc02762b0',
  };

  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res) => res.status(404)
  .send({ message: 'wrong path' }));

app.listen(PORT);
