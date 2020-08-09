const {Markup} = require('telegraf');

const {buttonsText, systemInfo} = require('./constants');

const {ABOUT_US, APPOINTMENT, CHANGE_LANGUAGE, EMERGENCIES, FAQ} = buttonsText;
const {LANGUAGE_CODES, LANGUAGES} = systemInfo;

module.exports = {
    mainMenuKeyboard: (chosenLanguage) => {
        return Markup.keyboard([
            [FAQ[chosenLanguage], EMERGENCIES[chosenLanguage]],
            [APPOINTMENT[chosenLanguage], CHANGE_LANGUAGE[chosenLanguage], ABOUT_US[chosenLanguage]]
        ])
            .resize()
            .extra();
    },

    chooseLanguageInlineKeyboard: () => {
        const buttons = [];

        Object.values(LANGUAGE_CODES).forEach((value) => {
            const button = Markup.callbackButton(LANGUAGES[value], value);
            buttons.push(button);
        });

        return Markup.inlineKeyboard(buttons).extra();
    },
};
