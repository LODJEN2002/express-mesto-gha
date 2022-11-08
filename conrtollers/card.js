const model = require('../models/card');

module.exports.createCard = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  console.log(req.user._id);

  const { name, link } = req.body;

  // eslint-disable-next-line no-underscore-dangle
  model.create({ name, link, owner: req.user._id })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.getCards = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  console.log(req.user._id);
  model.find()
    .then((data) => {
      res.status(201).send(data);
      // console.log(req);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.deleteCardById = (req, res) => {
  model.findByIdAndRemove(req.params.cardId)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.likeCard = (req, res) => model.findByIdAndUpdate(
  req.params.cardId,
  // eslint-disable-next-line no-underscore-dangle
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((data) => {
    res.status(201).send(data);
  })
  .catch((err) => {
    res.status(500).send({ message: 'На сервере ошибка', err });
  });

module.exports.dislikeCard = (req, res) => model.findByIdAndUpdate(
  req.params.cardId,
  // eslint-disable-next-line no-underscore-dangle
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((data) => {
    res.status(201).send(data);
  })
  .catch((err) => {
    res.status(500).send({ message: 'На сервере ошибка', err });
  });
