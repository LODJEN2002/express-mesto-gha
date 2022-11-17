const model = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

const create = 201;
const ok = 200;

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  model.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(create).send(card);
    })
    .catch(next);
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
        // return res.status(err404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: 'Недостаточно прав.' });
      }
      return model.findByIdAndDelete(req.params.cardId)
        .then(() => {
          res.send(card);
        })
        .catch(next);
    })
    .catch(next);
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
  .catch(next);

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
  .catch(next);
