const model = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  // eslint-disable-next-line no-underscore-dangle
  model.create({ name, link, owner: req.user._id })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: ' Переданы некорректные данные при создании карточки.' });
      }
      return res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.getCards = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  model.find()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.deleteCardById = (req, res) => {
  model.findByIdAndRemove(req.params.cardId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.likeCard = (req, res) => model.findByIdAndUpdate(
  req.params.cardId,
  // eslint-disable-next-line no-underscore-dangle
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((data) => {
    if (!data) {
      return res.status(404).send({ message: 'Передан несуществующий _id карточки. ' });
    }
    return res.status(201).send(data);
  })
  .catch((err) => {
    res.status(500).send({ message: 'На сервере ошибка', err });
  });

module.exports.dislikeCard = (req, res) => model.findByIdAndUpdate(
  req.params.cardId,
  // eslint-disable-next-line no-underscore-dangle
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((data) => {
    if (!data) {
      return res.status(404).send({ message: 'Передан несуществующий _id карточки. ' });
    }
    return res.status(201).send(data);
  })
  .catch((err) => {
    res.status(500).send({ message: 'На сервере ошибка', err });
  });
