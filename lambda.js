const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bot = require('./src/bot');
const { appConfigs: { MONGO_DB_URL }, logger } = require('./src/config');

exports.handler = async (event) => {
  await mongoose.connect(MONGO_DB_URL, {
    bufferCommands: false,
    bufferMaxEntries: 0,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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

  const update = JSON.parse(event.body); // get data passed to us
  await bot.handleUpdate(update); // make Telegraf process that data
  return { // return something for webhook, so it doesn't try to send same stuff again
    statusCode: 200,
    body: '',
  };
};
