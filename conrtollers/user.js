const model = require('../models/user');

module.exports.createUser = (req, res) => {
  model.create(req.body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.getUserById = (req, res) => {
  model.findById(req.params.userId)
    .then((data) => {
      // if(){
      //   res.send('Пользователь не найден!')
      //   return
      // }
      res.status(201).send(data);
      console.log(req.params.userId);
      console.log(req.params);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.getUsers = (req, res) => {
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

module.exports.updateUser = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  console.log(req.user._id);
  console.log(req.body);
  // eslint-disable-next-line no-underscore-dangle
  model.findByIdAndUpdate(req.user._id, req.body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  console.log(req.user._id);
  console.log(req.body);
  // eslint-disable-next-line no-underscore-dangle
  model.findByIdAndUpdate(req.user._id, req.body)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: 'На сервере ошибка', err });
    });
};
