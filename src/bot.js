require('dotenv').config();
const Telegraf = require('telegraf');

const {BOT_TOKEN} = require('./config');

const keyboard = require('./keyboard');
const kb = require('./keyboard-button')
const { getChatId } = require('./helper');

const bot = new Telegraf(BOT_TOKEN);

const {userModel} = require('./dataBase/models')

const welcomeMessage = `Welcome! `
bot.start((ctx) => ctx.reply(welcomeMessage))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', async (ctx) => {
  // const data = await userModel(d).save()
  const info = await JSON.stringify(ctx.from);
  return ctx.reply(`success, ${info}`);
});

bot.hears('users', async (ctx) => {
  const data = await userModel.find({});
  return ctx.reply(JSON.stringify(data));
})

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
