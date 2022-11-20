const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../conrtollers/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const routerUser = require('./users');
const routerCard = require('./cards');
const auth = require('../middlewares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((avatar) => {
      if (!validator.isURL(avatar)) {
        throw new BadRequestError('Это не URL');
      }
      return avatar;
    }),
  }).unknown(false),
}), createUser);

router.use(auth);

router.use(routerUser);
router.use('/cards', routerCard);
router.use('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
