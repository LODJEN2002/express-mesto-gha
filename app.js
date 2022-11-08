const express = require('express');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6365127990b7aef43af454f2',
  };

  next();
});

mongoose.connect(MONGO_URL);

app.use('/users', routerUser);
app.use('/cards', routerCard);

// const card = mongoose.Schema({
//   name: {

//   },
//   link: {

//   }
//   owner : {

//   },
//   likes : {

//   },
//   createdAt : {

//   },
// })

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
