const mongoose = require('mongoose');

const bot = require('./bot');

const {MONGO_DB_URL} = require('./config')


process.env.NTBA_FIX_319 = 1;

mongoose.connect(MONGO_DB_URL, {
  bufferCommands: false,
  bufferMaxEntries: 0,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.once('open', () => console.log('Connected'));
db.once('error', (error) => console.log('Error', error));

bot.launch();
