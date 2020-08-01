const express = require('express');
const mongoose = require('mongoose');
// process.env.NTBA_FIX_319 = 1;

const bot = require('./src/bot');
const {MONGO_DB_URL} = require('./src/config');

const app = express();

mongoose.connect(MONGO_DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.once('open', () => console.log('Connected'));
db.once('error', (error) => console.log('Error', error));

bot.launch();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

