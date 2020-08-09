const Telegraf = require('telegraf');

const {appConfigs: {BOT_TOKEN}, logger} = require('./config');
const {buttonsText, systemInfo} = require('./constants');
const {botRepliesController} = require('./controllers');
const {getTriggers} = require('./helpers');
// require('./dataBase/insertDefaultData')();
const {
    addNewUserToDbMiddleware,
    changeLanguageMiddleware,
    getChosenLanguageMiddleware,
    getDoctorsOnDutyMiddleware,
    getNLPAnswerMiddleware,
    updateUsersLastVisitTimeMiddleware,
} = require('./middlewares');

const {
    chooseLanguage,
    emergencies,
    inDevelopment,
    languageIsChanged,
    makeAnAppointment,
    sendSorryMessage,
    welcome
} = botRepliesController;
const {ABOUT_US, APPOINTMENT, CHANGE_LANGUAGE, EMERGENCIES, FAQ} = buttonsText;
const {LANGUAGE_CODES} = systemInfo;

const bot = new Telegraf(BOT_TOKEN);

bot.use(addNewUserToDbMiddleware, getChosenLanguageMiddleware, updateUsersLastVisitTimeMiddleware);

bot.action(getTriggers(LANGUAGE_CODES), changeLanguageMiddleware, getChosenLanguageMiddleware, languageIsChanged);

bot.hears(getTriggers(ABOUT_US), welcome); // about should be the same as welcome
bot.hears(getTriggers(APPOINTMENT), getDoctorsOnDutyMiddleware, makeAnAppointment);
bot.hears(getTriggers(CHANGE_LANGUAGE), chooseLanguage);
bot.hears(getTriggers(EMERGENCIES), emergencies);
bot.hears(getTriggers(FAQ), inDevelopment);

bot.start(welcome, logger.log('info', 'Start using bot'));

bot.on("text", getNLPAnswerMiddleware, getDoctorsOnDutyMiddleware, sendSorryMessage);

module.exports = bot;
