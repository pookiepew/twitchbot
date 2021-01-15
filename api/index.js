const express = require('express');
const cors = require('cors');
const volleyball = require('volleyball');
const helmet = require('helmet');

const HttpError = require('./models/http-error');

const config = require('./config');

const connectDB = require('./util/mongoDB');

const app = express();
app.use(cors());
app.use(volleyball);
app.use(helmet());
app.use(express.json());

app.use('/v1', require('./routes/v1'));

// app.use('/authenticate', require('./routes/authenticate'));

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

const port = config.PORT || 3000;

const server = app.listen(port, () => {
  connectDB();
  console.log(`http://${config.HOST}:` + server.address().port);
});
