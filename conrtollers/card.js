const model = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

const err500 = 500;
const err400 = 400;
const err404 = 404;
const create = 201;
const ok = 200;

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  model.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(create).send(card);
    })
    .catch(next);
// => {
  // if (err.name === 'ValidationError') {
// return res.status(err400).send({ message:
//  ' Переданы некорректные данные при создании карточки.' });
  // }
  // console.log(err);
  // return res.status(err500).send({ message: 'На сервере ошибка' });
// });
};

module.exports.getCards = (req, res, next) => {
  model.find()
    .then((cards) => {
      res.status(ok).send(cards);
    })
    .catch(next);
// => {
  // console.log(err);
  // res.status(err500).send({ message: 'На сервере ошибка' });
  // });
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
        //  => {
        //   if (err.name === 'CastError') {
        //     return res.status(err400).send({ message: 'Переданы некорректные данные' });
        //   }
        //   console.log(err);
        //   return res.status(err500).send({ message: 'На сервере ошибка' });
        // });
    });
};

// module.exports.deleteCardById = (req, res) => {
//   model.findById(req.params.cardId)
//     .then((card) => {
//       if (!card) {
//         return res.status(err404).send({ message: 'Карточка с указанным _id не найдена.' });
//       }
//       if (card.owner.toString() !== req.user._id) {
//         res.status(err404).send({ message: 'asdasd' });
//       }
//       model.findByIdAndDelete(req.params.cardId)
//         .then((card) => {
//           res.status(ok).send(card);
//         })
//         .catch((err) => {
//           if (err.name === 'CastError') {
//             return res.status(err400).send({ message: 'Переданы некорректные данные' });
//           }
//           console.log(err);
//           return res.status(err500).send({ message: 'На сервере ошибка' });
//         });
//     });
// };

module.exports.likeCard = (req, res, next) => model.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки.');
      // return res.status(err404).send({ message: 'Передан несуществующий _id карточки. ' });
    }
    return res.status(ok).send(card);
  })
  .catch(next);
  //  => {
  //   if (err.name === 'CastError') {
  //     return res.status(err400).send({ message: 'Переданы некорректные данные' });
  //   }
  //   console.log(err);
  //   return res.status(err500).send({ message: 'На сервере ошибка' });
  // });

module.exports.dislikeCard = (req, res) => model.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки.');
      // return res.status(err404).send({ message: 'Передан несуществующий _id карточки. ' });
    }
    return res.status(ok).send(card);
  })
  .catch(next)
  //  => {
  //   if (err.name === 'CastError') {
  //     return res.status(err400).send({ message: 'Переданы некорректные данные' });
  //   }
  //   console.log(err);
  //   return res.status(err500).send({ message: 'На сервере ошибка' });
  // });
