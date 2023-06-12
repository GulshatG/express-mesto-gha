const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv')
  .config();
const helmet = require('helmet');
const { errors } = require('celebrate');
const userRouter = require('./routes/userRouter');
const cardRouter = require('./routes/cardRouter');
const handleExceptions = require('./utils/handleException');
const {
  login,
  createUser,
} = require('./cotrollers/userController');
const { auth } = require('./middlewares/auth');
const {
  celebrateCreateUser,
  celebrateLogin,
} = require('./celebrate/celebrateUser');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', celebrateLogin, login);
app.post('/signup', celebrateCreateUser, createUser);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res) => res.status(404)
  .send({ message: 'wrong path' }));
app.use(errors());
app.use(handleExceptions);

app.listen(PORT);
