const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/BadRequestError');
const {
  getUserById, getUsers, updateUser, updateUserAvatar, getMyProfiel,
} = require('../conrtollers/user');

router.get('/users/me', getMyProfiel);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

router.get('/users', getUsers);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((avatar) => {
      if (!validator.isURL(avatar)) {
        throw new BadRequestError('Это не URL');
      }
      return avatar;
    }),
  }),
}), updateUserAvatar);

module.exports = router;
