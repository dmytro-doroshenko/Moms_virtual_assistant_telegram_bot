const {Markup} = require('telegraf');

const {buttonsText, systemInfo, faqButtonsText} = require('./constants');

const {ABOUT_US, APPOINTMENT, CHANGE_LANGUAGE, EMERGENCIES, FAQ, MAIN_MENU} = buttonsText;
const {LANGUAGE_CODES, LANGUAGES} = systemInfo;
const {setButtonsView} = require("./helpers/index");


module.exports = {
    categoryKeyboard: (chosenLanguage) => { 
        const buttons = [];

        Object.keys(faqButtonsText).forEach((key) => {
            const title = faqButtonsText[key][chosenLanguage];
            const button = Markup.callbackButton(title, key);
            buttons.push(button);
        });

        return Markup.inlineKeyboard(setButtonsView(buttons, 2)).resize().extra();
    },

    chooseLanguageInlineKeyboard: () => {
        const buttons = [];

        Object.values(LANGUAGE_CODES).forEach((value) => {
            const button = Markup.callbackButton(LANGUAGES[value], value);
            buttons.push(button);
        });

        return Markup.inlineKeyboard(buttons).extra();
    },

    FAQKeybord:  (questions, chosenLanguage) => {
        return Markup.keyboard([MAIN_MENU[chosenLanguage], ...questions, MAIN_MENU[chosenLanguage]]).resize().extra();
    },

    mainMenuKeyboard: (chosenLanguage) => {
        return Markup.keyboard([
            [FAQ[chosenLanguage], EMERGENCIES[chosenLanguage]],
            [CHANGE_LANGUAGE[chosenLanguage], APPOINTMENT[chosenLanguage], ABOUT_US[chosenLanguage]]
        ])
            .resize()
            .extra();
    },
};
