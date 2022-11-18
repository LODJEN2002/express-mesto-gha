const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err');

const model = require('../models/user');

const create = 201;
const ok = 200;

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => model.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      if (validator.isEmail(req.body.email)) {
        return res.status(create).send(user);
      }
      return res.send({ message: 'Почта не валидная' });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  model.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(ok).send(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  model.find()
    .then((users) => {
      res.status(ok).send(users);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  model.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(ok).send(user);
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  model.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(ok).send(user);
    })
    .catch(next);
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return model.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      return res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports.getMyProfiel = (req, res, next) => {
  model.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(ok).send(user);
    })
    .catch(next);
};
