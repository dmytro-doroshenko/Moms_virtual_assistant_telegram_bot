const mongoose = require('mongoose');

const bot = require('./src/bot');
const { appConfigs: { MONGO_DB_URL }} = require('./src/config');

exports.handler = async (event) => {
  await mongoose.connect(MONGO_DB_URL, {
    bufferCommands: false,
    bufferMaxEntries: 0,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const update = JSON.parse(event.body); // get data passed to us
  await bot.handleUpdate(update); // make Telegraf process that data
  return { // return something for webhook, so it doesn't try to send same stuff again
    statusCode: 200,
    body: '',
  };
};
