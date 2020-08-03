const Telegraf = require('telegraf');

const {replyMessages, systemInfo} = require('../constants');

const {LANGUAGE_CODES, LANGUAGES} = systemInfo;
const {CHOOSE_LANGUAGE_TEXT} = replyMessages;
const {Markup} = Telegraf;

module.exports = async (ctx) => {
    const buttons = [];
    const {chosenLanguage} = ctx.state;

    await Object.values(LANGUAGE_CODES).forEach((value) => {
        const button = Markup.callbackButton(LANGUAGES[value], value);
        buttons.push(button);
    });

    return ctx.reply(CHOOSE_LANGUAGE_TEXT[chosenLanguage], Markup.inlineKeyboard(buttons).extra());
};
