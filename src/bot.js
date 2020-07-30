require('dotenv').config();
const Telegraf = require('telegraf');

const keyboard = require('./keyboard');
const kb = require('./keyboard-button')
const { getChatId } = require('./helper');

const bot = new Telegraf(process.env.BOT_TOKEN);

const welcomeMessage = `Welcome! `
bot.start((ctx) => ctx.reply(welcomeMessage))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.hears('Вибрати мову', msg => {
  const chatId = getChatId(msg)
  bot.telegram.sendMessage(chatId, 'chose the language',{
    reply_markup: {
      inline_keyboard: [
        [
          {text: 'ukr', callback_data: 'menu'},
          {text: 'rus', callback_data: 'menu'},
        ]
      ]
    }
  })
})

bot.command('test', msg => {
  // const text = `Привіт,${msg.from.first_name}\nВиберіть команду`;
  msg.telegram.sendMessage(getChatId(msg),'sdf' ,{
    reply_markup: {
      keyboard: keyboard.menu,
      resize_keyboard: true,
      one_time_keyboard: true
    },
  });
});

module.exports = bot;
