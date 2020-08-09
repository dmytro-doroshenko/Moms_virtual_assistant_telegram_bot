const express = require('express');
const mongoose = require('mongoose');
// process.env.NTBA_FIX_319 = 1;

const bot = require('./src/bot');
const { appConfigs: { MONGO_DB_URL } } = require('./src/config');
const dataBaseConnection = require('./src/dataBase');

const app = express();

dataBaseConnection('local');

const db = mongoose.connection;
db.once('open', () => console.log('Connected'));
db.once('error', (error) => console.log('Error', error));

bot.launch();

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
