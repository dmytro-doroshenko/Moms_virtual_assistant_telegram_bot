const Telegraf = require('telegraf');

const {appConfigs: {BOT_TOKEN}, logger} = require('./config');
const {models: {userModel}} = require('./dataBase');

const {
    addNewUserToDbMiddleware,
    changeLanguageMiddleware,
    getChosenLanguageMiddleware,
    updateUsersLastVisitTimeMiddleware
} = require('./middlewares');
const { chooseLanguageReply, languageIsChangedReply, welcomeReply } = require('./replies');


const bot = new Telegraf(BOT_TOKEN);

bot.use(addNewUserToDbMiddleware, getChosenLanguageMiddleware, updateUsersLastVisitTimeMiddleware);

bot.action(['ua', 'ru'], changeLanguageMiddleware, getChosenLanguageMiddleware, languageIsChangedReply);

bot.command('choose_language', chooseLanguageReply);

bot.help((ctx) => ctx.reply('Send me a sticker'));

bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.start(welcomeReply, logger.log('info', 'Start using bot'));


bot.hears('users', async (ctx) => {
    const data = await userModel.find({});
    return ctx.reply(JSON.stringify(data));
});

bot.hears('whoami', async (ctx) => {
    const info = await JSON.stringify(ctx.from);
    return ctx.reply(info);
});

module.exports = bot;
