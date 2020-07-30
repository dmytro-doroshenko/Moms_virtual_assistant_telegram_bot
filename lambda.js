const bot = require("./src/bot");

exports.handler = (event, context, callback) => {
  const update = JSON.parse(event.body); // get data passed to us
  bot.handleUpdate(update); // make Telegraf process that data
  return callback(null, { // return something for webhook, so it doesn't try to send same stuff again
    statusCode: 200,
    body: '',
  });
};