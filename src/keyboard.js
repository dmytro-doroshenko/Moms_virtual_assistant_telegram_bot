const {Markup} = require('telegraf');

const {buttonsText} = require('./constants');

const {ABOUT_US, APPOINTMENT, CHANGE_LANGUAGE, EMERGENCIES, FAQ} = buttonsText;

module.exports = {
  mainMenuKeyboard: (chosenLanguage) => {
    return Markup.keyboard([
      [FAQ[chosenLanguage], EMERGENCIES[chosenLanguage]],
      [APPOINTMENT[chosenLanguage], CHANGE_LANGUAGE[chosenLanguage], ABOUT_US[chosenLanguage]]
    ])
        .resize()
        .extra()
  },
};
