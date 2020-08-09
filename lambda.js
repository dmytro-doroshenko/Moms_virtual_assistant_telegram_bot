const bot = require('./src/bot');
const { appConfigs: { MONGO_DB_URL }} = require('./src/config');
const dataBaseConnection = require('./src/dataBase');

exports.handler = async (event) => {

    await dataBaseConnection('lambda');

  const update = JSON.parse(event.body); // get data passed to us
  await bot.handleUpdate(update); // make Telegraf process that data
  return { // return something for webhook, so it doesn't try to send same stuff again
    statusCode: 200,
    body: '',
  };
};
