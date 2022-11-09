const model = require('../models/user');

module.exports.createUser = (req, res) => {
  model.create(req.body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.getUserById = (req, res) => {
  model.findById(req.params.userId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.getUsers = (req, res) => {
  model.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.updateUser = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  model.findByIdAndUpdate(req.user._id, req.body)
    .then(() => {
      if (!req.body.name) {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } if (!req.body.about) {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      return res.status(200).send(req.body);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  model.findByIdAndUpdate(req.user._id, req.body)
    .then(() => {
      if (!req.body.avatar) {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      return res.status(200).send(req.body);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.NotFoundController = (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
};
