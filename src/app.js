const express = require('express');

const bot = require('./bot');

const app = express();

process.env.NTBA_FIX_319 = 1;

bot.launch()

// app.get('/', (req, res) => {
//   res.send('lala');
// });

// we don't need express
app.listen(5000, () => console.log(2222));
