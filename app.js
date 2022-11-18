const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const validator = require('validator');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const { login, createUser } = require('./conrtollers/user');
const auth = require('./middlewares/auth');
const UrlError = require('./errors/urlError');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(MONGO_URL, { autoIndex: true });

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((avatar) => {
      if (!validator.isURL(avatar)) {
        throw new UrlError('Это не URL');
      }
      return avatar;
    }),
  }).unknown(true),
}), createUser);

app.use(auth);

app.use('/', routerUser);
app.use('/cards', routerCard);
app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Передан невалидный ID для поиска' });
  } if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'Переданы некорректные данные' });
  }
  if (err.code === 11000) {
    return res.status(409).send({ message: 'Пользователь с таким email уже зарегестриван.' });
  }
  res.status(err.statusCode).send({ message: err.message });

  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
