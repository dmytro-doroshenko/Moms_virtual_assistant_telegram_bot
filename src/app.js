const {config} = require('./config')
const express = require('express');

const bot = require('./bot');

const app = express();

process.env.NTBA_FIX_319 = 1;

const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => console.log('Connected'));
db.once('error', (error) => console.log('Error', error));

bot.launch()

// app.get('/', (req, res) => {
//   res.send('lala');
// });

// we don't need express
app.listen(5000, () => console.log(2222));
