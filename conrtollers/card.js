const model = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  model.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: ' Переданы некорректные данные при создании карточки.' });
      }
      console.log(err);
      return res.status(500).send({ message: 'На сервере ошибка' });
    });
};

module.exports.getCards = (req, res) => {
  model.find()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'На сервере ошибка' });
    });
};

module.exports.deleteCardById = (req, res) => {
  model.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: 'На сервере ошибка' });
    });
};

module.exports.likeCard = (req, res) => model.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Передан несуществующий _id карточки. ' });
    }
    return res.status(200).send(card);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send({ message: 'На сервере ошибка' });
  });

module.exports.dislikeCard = (req, res) => model.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Передан несуществующий _id карточки. ' });
    }
    return res.status(200).send(card);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send({ message: 'На сервере ошибка' });
  });
