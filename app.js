const express = require('express');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const { login, createUser } = require('./conrtollers/user');
const auth = require('./middlewares/auth');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(MONGO_URL, { autoIndex: true });

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', routerUser);
app.use('/cards', routerCard);
app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
