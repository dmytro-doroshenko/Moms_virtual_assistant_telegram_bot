const Telegraf = require('telegraf');

const {appConfigs: {BOT_TOKEN}} = require('./config');
const {buttonsText, systemInfo, faqButtonsText} = require('./constants');
const {botRepliesController} = require('./controllers');
const {errorHandler} = require('./errors');
const {getTriggers} = require('./helpers');
const {
    addNewUserToDbMiddleware,
    changeLanguageMiddleware,
    getChosenLanguageMiddleware,
    getDoctorsOnDutyMiddleware,
    getNLPAnswerMiddleware,
    updateUsersLastVisitTimeMiddleware,
    userLoggerMiddleware,
} = require('./middlewares');

const {
    backToMainMenu,
    chooseLanguage,
    emergencies,
    languageIsChanged,
    makeAnAppointment,
    categoriesKeyboard,
    sendSorryMessage,
    categoryIntents,
    welcome
} = botRepliesController;

const {ABOUT_US, APPOINTMENT, CHANGE_LANGUAGE, EMERGENCIES, FAQ, MAIN_MENU} = buttonsText;
const {LANGUAGE_CODES} = systemInfo;

const bot = new Telegraf(BOT_TOKEN);

bot.use(addNewUserToDbMiddleware, getChosenLanguageMiddleware, updateUsersLastVisitTimeMiddleware, userLoggerMiddleware);

bot.action(getTriggers(LANGUAGE_CODES), changeLanguageMiddleware, getChosenLanguageMiddleware, languageIsChanged);

bot.hears(getTriggers(ABOUT_US), welcome); // about should be the same as welcome
bot.hears(getTriggers(APPOINTMENT), getDoctorsOnDutyMiddleware, makeAnAppointment);
bot.hears(getTriggers(CHANGE_LANGUAGE), chooseLanguage);
bot.hears(getTriggers(EMERGENCIES), emergencies);
bot.hears(getTriggers(FAQ), categoriesKeyboard);
bot.hears(getTriggers(MAIN_MENU), backToMainMenu);



bot.start(welcome);

bot.on("text", getNLPAnswerMiddleware, getDoctorsOnDutyMiddleware, sendSorryMessage);

for (const cat of Object.keys(faqButtonsText)) {
    bot.action(cat, (ctx) => categoryIntents(ctx, cat));
}

bot.catch(errorHandler);

module.exports = bot;
