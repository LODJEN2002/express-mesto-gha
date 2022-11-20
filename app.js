const express = require('express');
const mongoose = require('mongoose');
// const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
// const validator = require('validator');
// const routerUser = require('./routes/users');
// const routerCard = require('./routes/cards');
const router = require('./routes/index');
// const { login, createUser } = require('./conrtollers/user');
// const auth = require('./middlewares/auth');
// const BadRequestError = require('./errors/BadRequestError');
// const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(MONGO_URL, { autoIndex: true });

// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//   }),
// }), login);

// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().custom((avatar) => {
//       if (!validator.isURL(avatar)) {
//         throw new BadRequestError('Это не URL');
//       }
//       return avatar;
//     }),
//   }).unknown(false),
// }), createUser);

// app.use(auth);

// app.use(routerUser);
// app.use('/cards', routerCard);
// app.use('/*', () => {
//   throw new NotFoundError('Запрашиваемый ресурс не найден');
// });

app.use(router);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });

  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
