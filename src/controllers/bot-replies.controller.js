const Telegraf = require('telegraf');

const {replyMessages, systemInfo} = require('../constants');
const {mainMenuKeyboard} = require('../keyboard');

const {
    ABOUT_US_MESSAGE,
    CHOOSE_LANGUAGE_MESSAGE,
    EMERGENCIES_EXTRA_MESSAGE,
    EMERGENCIES_MESSAGE,
    EMERGENCY_PHONE_NUMBER,
    IN_DEVELOPMENT_MESSAGE,
    LANGUAGE_IS_CHANGED_MESSAGE,
    WELCOME_MESSAGE
} = replyMessages;
const {LANGUAGE_CODES, LANGUAGES} = systemInfo;
const {Markup} = Telegraf;

module.exports = {
    aboutUs: (ctx) => {
        const {chosenLanguage} = ctx.state;
        return ctx.reply(ABOUT_US_MESSAGE[chosenLanguage], mainMenuKeyboard(chosenLanguage))
    },
    chooseLanguage: async (ctx) => {
        const buttons = [];
        const {chosenLanguage} = ctx.state;

        await Object.values(LANGUAGE_CODES).forEach((value) => {
            const button = Markup.callbackButton(LANGUAGES[value], value);
            buttons.push(button);
        });

        return ctx.reply(CHOOSE_LANGUAGE_MESSAGE[chosenLanguage], Markup.inlineKeyboard(buttons).extra());
    },

    emergencies: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(EMERGENCIES_MESSAGE[chosenLanguage])
            .then(() => ctx.reply(EMERGENCIES_EXTRA_MESSAGE[chosenLanguage] + EMERGENCY_PHONE_NUMBER));
    },

    inDevelopment: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(IN_DEVELOPMENT_MESSAGE[chosenLanguage]);
    },

    languageIsChanged: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(LANGUAGE_IS_CHANGED_MESSAGE[chosenLanguage], mainMenuKeyboard(chosenLanguage));
    },

    welcome: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(WELCOME_MESSAGE[chosenLanguage], mainMenuKeyboard(chosenLanguage));
    },
};
