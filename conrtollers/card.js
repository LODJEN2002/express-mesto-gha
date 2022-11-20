const model = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const create = 201;
const ok = 200;

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  model.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(create).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  model.find()
    .then((cards) => {
      res.status(ok).send(cards);
    })
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  model.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав.');
      }
      return model.findByIdAndDelete(req.params.cardId)
        .then(() => {
          res.send(card);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный ID для поиска'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => model.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    }
    return res.status(ok).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Передан невалидный ID для поиска'));
    } else {
      next(err);
    }
  });

module.exports.dislikeCard = (req, res, next) => model.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    }
    return res.status(ok).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Передан невалидный ID для поиска'));
    } else {
      next(err);
    }
  });
