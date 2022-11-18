const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const UrlError = require('../errors/urlError');

const {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
} = require('../conrtollers/card');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).custom((avatar) => {
      if (!validator.isURL(avatar)) {
        throw new UrlError('Это не URL');
      }
      return avatar;
    }),
  }),
}), createCard);

router.get('/', getCards);

router.delete('/:cardId', deleteCardById);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
