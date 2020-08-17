const {replyMessages} = require('../constants');
const {createDoctorsListForResponse} = require('../helpers');
const {chooseLanguageInlineKeyboard, mainMenuKeyboard, categoryKeyboard, FAQKeybord} = require('../keyboard');
const {listIntents} = require("../services/dialogflow");
const {faqButtonsText} = require('../constants');

const {
    APPOINTMENT_AFTER_MESSAGE,
    APPOINTMENT_BEFORE_MESSAGE,
    APPOINTMENT_DAY_OFF_AFTER_MESSAGE,
    APPOINTMENT_DAY_OFF_AND_TOO_LATE_AFTER_MESSAGE,
    APPOINTMENT_DAY_OFF_AND_TOO_LATE_BEFORE_MESSAGE,
    APPOINTMENT_DAY_OFF_BEFORE_MESSAGE,
    APPOINTMENT_TOO_LATE_AFTER_MESSAGE,
    APPOINTMENT_TOO_LATE_BEFORE_MESSAGE,
    BACK_TO_MENU_MESSAGE,
    CHOOSE_LANGUAGE_MESSAGE,
    CHOOSE_QUESTION_MESSAGE_PART_ONE,
    CHOOSE_QUESTION_MESSAGE_PART_TWO,
    EMERGENCIES_EXTRA_MESSAGE,
    EMERGENCIES_MESSAGE,
    EMERGENCY_CONTACT,
    FAQ_MESSAGE,
    LANGUAGE_IS_CHANGED_MESSAGE,
    SORRY_MESSAGE_AFTER,
    SORRY_MESSAGE_BEFORE,
    SORRY_MESSAGE_DAY_OFF_AFTER,
    SORRY_MESSAGE_DAY_OFF_AND_TOO_LATE_AFTER,
    SORRY_MESSAGE_DAY_OFF_AND_TOO_LATE_BEFORE,
    SORRY_MESSAGE_DAY_OFF_BEFORE,
    SORRY_MESSAGE_TOO_LATE_AFTER,
    SORRY_MESSAGE_TOO_LATE_BEFORE,
    WELCOME_MESSAGE
} = replyMessages;

module.exports = {
    backToMainMenu: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(BACK_TO_MENU_MESSAGE[chosenLanguage], mainMenuKeyboard(chosenLanguage))
    },

    categoriesKeyboard: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(FAQ_MESSAGE[chosenLanguage], categoryKeyboard(chosenLanguage))
    },

    categoryIntents: async (ctx, category) => {
        const {chosenLanguage} = ctx.state;
        const intents = await listIntents(category, chosenLanguage);

        return ctx.reply(CHOOSE_QUESTION_MESSAGE_PART_ONE[chosenLanguage] +
            '"' + faqButtonsText[category][chosenLanguage] +
            '". \n' + CHOOSE_QUESTION_MESSAGE_PART_TWO[[chosenLanguage]], FAQKeybord(intents, chosenLanguage));
    },

    chooseLanguage: async (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(CHOOSE_LANGUAGE_MESSAGE[chosenLanguage], chooseLanguageInlineKeyboard());
    },

    emergencies: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(EMERGENCIES_MESSAGE[chosenLanguage])
            .then(() => ctx.reply(EMERGENCIES_EXTRA_MESSAGE[chosenLanguage] + ' ' + EMERGENCY_CONTACT.PHONE_NUMBER));
    },

    languageIsChanged: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(LANGUAGE_IS_CHANGED_MESSAGE[chosenLanguage], mainMenuKeyboard(chosenLanguage));
    },

    makeAnAppointment: async (ctx) => {
        const {chosenLanguage, dayOff, doctorsOnDuty, tooLate, workingHours} = ctx.state;
        const {from, to} = workingHours;
        let response;

        const doctorsList = await createDoctorsListForResponse(doctorsOnDuty, chosenLanguage);

        if (dayOff && tooLate) {
            response = APPOINTMENT_DAY_OFF_AND_TOO_LATE_BEFORE_MESSAGE[chosenLanguage] +
                doctorsList +
                APPOINTMENT_DAY_OFF_AND_TOO_LATE_AFTER_MESSAGE[chosenLanguage](from, to);
        } else if (tooLate) {
            response = APPOINTMENT_TOO_LATE_BEFORE_MESSAGE[chosenLanguage] +
                doctorsList +
                APPOINTMENT_TOO_LATE_AFTER_MESSAGE[chosenLanguage](from, to);
        } else if (dayOff) {
            response = APPOINTMENT_DAY_OFF_BEFORE_MESSAGE[chosenLanguage] +
                doctorsList +
                APPOINTMENT_DAY_OFF_AFTER_MESSAGE[chosenLanguage](from, to);
        } else {
            response = APPOINTMENT_BEFORE_MESSAGE[chosenLanguage] +
                doctorsList +
                APPOINTMENT_AFTER_MESSAGE[chosenLanguage](from, to);
        }

        return ctx.reply(response);
    },

    sendSorryMessage: async (ctx) => {
        const {chosenLanguage, dayOff, doctorsOnDuty, tooLate, workingHours} = ctx.state;
        const {from, to} = workingHours;
        let response;

        const doctorsList = await createDoctorsListForResponse(doctorsOnDuty, chosenLanguage);

        if (dayOff && tooLate) {
            response = SORRY_MESSAGE_DAY_OFF_AND_TOO_LATE_BEFORE[chosenLanguage] +
                doctorsList +
                SORRY_MESSAGE_DAY_OFF_AND_TOO_LATE_AFTER[chosenLanguage](from, to);
        } else if (tooLate) {
            response = SORRY_MESSAGE_TOO_LATE_BEFORE[chosenLanguage] +
                doctorsList +
                SORRY_MESSAGE_TOO_LATE_AFTER[chosenLanguage](from, to);
        } else if (dayOff) {
            response = SORRY_MESSAGE_DAY_OFF_BEFORE[chosenLanguage] +
                doctorsList +
                SORRY_MESSAGE_DAY_OFF_AFTER[chosenLanguage](from, to);
        } else {
            response = SORRY_MESSAGE_BEFORE[chosenLanguage] +
                doctorsList +
                SORRY_MESSAGE_AFTER[chosenLanguage](from, to);
        }

        return ctx.reply(response);
    },

    welcome: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(WELCOME_MESSAGE[chosenLanguage], mainMenuKeyboard(chosenLanguage));
    },
};
