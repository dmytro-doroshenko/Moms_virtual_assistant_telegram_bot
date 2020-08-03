const {replyMessages} = require('../constants');

const {WELCOME_MESSAGE} = replyMessages;

module.exports = (ctx) => {
    const {chosenLanguage} = ctx.state;

    return ctx.reply(WELCOME_MESSAGE[chosenLanguage]);
};
