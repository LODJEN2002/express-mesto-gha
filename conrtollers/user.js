const model = require('../models/user');

module.exports.createUser = (req, res) => {
  model.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      console.log(err);
      res.status(500).send({ message: 'На сервере ошибка' });
    });
};

module.exports.getUserById = (req, res) => {
  model.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      console.log(err);
      return res.status(500).send({ message: 'На сервере ошибка' });
    });
};

module.exports.getUsers = (req, res) => {
  model.find()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'На сервере ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  model.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'На сервере ошибка' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  model.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'На сервере ошибка' });
    });
};
