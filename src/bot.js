const Telegraf = require('telegraf');

const {BOT_TOKEN} = require('./config');
const {models: {userModel}} = require('./dataBase');
require('./dataBase/insertDefaultData')();
const {getChatId} = require('./helper');
const keyboard = require('./keyboard');
const kb = require('./keyboard-button')
const {addNewUserToDbMiddleware, updateUsersLastVisitTimeMiddleware} = require('./middlewares');
const {welcomeReply} = require('./replies');

const bot = new Telegraf(BOT_TOKEN);

bot.use(addNewUserToDbMiddleware, updateUsersLastVisitTimeMiddleware);

bot.start(welcomeReply);

bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.hears('whoami', async (ctx) => {
    const info = await JSON.stringify(ctx.from);
    return ctx.reply(info);
});

bot.hears('users', async (ctx) => {
    const data = await userModel.find({});
    return ctx.reply(JSON.stringify(data));
})

bot.hears('Вибрати мову', ctx => {
    const chatId = getChatId(ctx)
    bot.telegram.sendMessage(chatId, 'Виберіть мову/Выберите язык', {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Українська', callback_data: 'menu'},
                    {text: 'Русский', callback_data: 'menu'},
                ]
            ]
        }
    })
})

bot.command('test', msg => {
    // const text = `Привіт,${msg.from.first_name}\nВиберіть команду`;
    msg.telegram.sendMessage(getChatId(msg), 'sdf', {
        reply_markup: {
            keyboard: keyboard.menu,
            resize_keyboard: true,
            one_time_keyboard: true
        },
    });
});

module.exports = bot;
