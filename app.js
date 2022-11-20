const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const centralErorr = require('./errors/centralError');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(MONGO_URL, { autoIndex: true });

app.use(router);
app.use(errors());
app.use(centralErorr);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
