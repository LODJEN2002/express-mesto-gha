const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const model = require('../models/user');

const err500 = 500;
const err400 = 400;
const err404 = 404;
const create = 201;
const ok = 200;

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => model.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      if (validator.isEmail(req.body.email)) {
        console.log('почта валидный');
        console.log(validator.isEmail(req.body.email));
        return res.status(create).send(user);
      } if (!user) {
        console.log('!user');
      }
      console.log(validator.isEmail(req.body.email));
      console.log('почта не валидный');
      return res.send({ message: 'почта не валидный' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err);
        return res.status(err400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      console.log(err);
      return res.status(err500).send({ message: 'На сервере ошибка' });
    });
};

module.exports.getUserById = (req, res) => {
  model.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(err404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(ok).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(err400).send({ message: 'Передан невалидный ID для поиска' });
      }
      console.log(err);
      return res.status(err500).send({ message: 'На сервере ошибка' });
    });
};

module.exports.getUsers = (req, res) => {
  model.find()
    .then((users) => {
      res.status(ok).send(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(err500).send({ message: 'На сервере ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  model.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(err404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(ok).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(err400).send({ message: 'Переданы некорректные данные' });
      } if (err.name === 'CastError') {
        return res.status(err400).send({ message: 'Передан невалидный ID для поиска' });
      }
      console.log(err);
      return res.status(err500).send({ message: 'На сервере ошибка' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  model.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(err404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(ok).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(err400).send({ message: 'Переданы некорректные данные' });
      } if (err.name === 'CastError') {
        return res.status(err400).send({ message: 'Передан невалидный ID для поиска' });
      }
      console.log(err);
      return res.status(err500).send({ message: 'На сервере ошибка' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return model.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      return res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
