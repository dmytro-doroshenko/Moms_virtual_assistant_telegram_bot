const {replyMessages} = require('../constants');
const {createDoctorsListForResponse} = require('../helpers');
const {chooseLanguageInlineKeyboard, mainMenuKeyboard} = require('../keyboard');

const {
    APPOINTMENT_AFTER_MESSAGE,
    APPOINTMENT_BEFORE_MESSAGE,
    APPOINTMENT_DAY_OFF_AFTER_MESSAGE,
    APPOINTMENT_DAY_OFF_BEFORE_MESSAGE,
    CHOOSE_LANGUAGE_MESSAGE,
    DAY_OFF_SORRY_MESSAGE_AFTER,
    DAY_OFF_SORRY_MESSAGE_BEFORE,
    EMERGENCIES_EXTRA_MESSAGE,
    EMERGENCIES_MESSAGE,
    EMERGENCY_CONTACT,
    IN_DEVELOPMENT_MESSAGE,
    LANGUAGE_IS_CHANGED_MESSAGE,
    SORRY_MESSAGE_AFTER,
    SORRY_MESSAGE_BEFORE,
    WELCOME_MESSAGE
} = replyMessages;

module.exports = {
    chooseLanguage: async (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(CHOOSE_LANGUAGE_MESSAGE[chosenLanguage], chooseLanguageInlineKeyboard());
    },

    emergencies: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(EMERGENCIES_MESSAGE[chosenLanguage])
            .then(ctx.reply(EMERGENCIES_EXTRA_MESSAGE[chosenLanguage] + ' ' + EMERGENCY_CONTACT.PHONE_NUMBER))
        // NOTE: after several uses of "ctx.telegram.sendContact" I got next error:
        // ---------------------------------------------------------
        // (node:77853) UnhandledPromiseRejectionWarning: Error: 429: Too Many Requests: retry after 10827
        //     at /home/dmytro/WebstormProjects/TEST_BOT/node_modules/telegraf/core/network/client.js:281:17
        //     at processTicksAndRejections (internal/process/task_queues.js:93:5)
        // ---------------------------------------------------------
        // So I decided to leave this part as a comment. I have no idea how to make button that works with a phone
        // number in another way
        //
        // .then(ctx.telegram.sendContact(
        //     ctx.chat.id,
        //     EMERGENCY_CONTACT.PHONE_NUMBER,
        //     EMERGENCY_CONTACT.NAME[chosenLanguage]
        // ));
    },

    inDevelopment: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(IN_DEVELOPMENT_MESSAGE[chosenLanguage]);
    },

    languageIsChanged: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(LANGUAGE_IS_CHANGED_MESSAGE[chosenLanguage], mainMenuKeyboard(chosenLanguage));
    },

    makeAnAppointment: async (ctx) => {
        const {chosenLanguage, dayOff, doctorsOnDuty} = ctx.state;
        let response = '';

        const doctorsList = await createDoctorsListForResponse(doctorsOnDuty, chosenLanguage);

        if (dayOff) {
            response = APPOINTMENT_DAY_OFF_BEFORE_MESSAGE[chosenLanguage] +
                doctorsList +
                APPOINTMENT_DAY_OFF_AFTER_MESSAGE[chosenLanguage];
        } else {
            response = APPOINTMENT_BEFORE_MESSAGE[chosenLanguage] +
                doctorsList +
                APPOINTMENT_AFTER_MESSAGE[chosenLanguage];
        }

        return ctx.reply(response);
    },

    sendSorryMessage: async (ctx) => {
        const {chosenLanguage, dayOff, doctorsOnDuty} = ctx.state;
        let response = '';

        const doctorsList = await createDoctorsListForResponse(doctorsOnDuty, chosenLanguage);

        if (dayOff) {
            response = DAY_OFF_SORRY_MESSAGE_BEFORE[chosenLanguage] +
                doctorsList +
                DAY_OFF_SORRY_MESSAGE_AFTER[chosenLanguage];
        } else {
            response = SORRY_MESSAGE_BEFORE[chosenLanguage] +
                doctorsList +
                SORRY_MESSAGE_AFTER[chosenLanguage];
        }

        return ctx.reply(response);
    },

    welcome: (ctx) => {
        const {chosenLanguage} = ctx.state;

        return ctx.reply(WELCOME_MESSAGE[chosenLanguage], mainMenuKeyboard(chosenLanguage));
    },
};
