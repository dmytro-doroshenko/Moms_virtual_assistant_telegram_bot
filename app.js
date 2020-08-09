const express = require('express');
const mongoose = require('mongoose');
// process.env.NTBA_FIX_319 = 1;

const bot = require('./src/bot');
const { appConfigs: { MONGO_DB_URL }, logger } = require('./src/config');
const dataBaseConnection = require('./src/dataBase');

const app = express();

dataBaseConnection('local');

const db = mongoose.connection;
db.once('open', () => console.log('Connected'));
db.once('error', (error) => console.log('Error', error));

bot.launch();

app.use('*', (err, req, res, next) => {
  logger.error({
    method: req.method,
    url: req.path,
    data: req.body,
    time: new Date(),
    message: err.message,
  });

  next(err);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
