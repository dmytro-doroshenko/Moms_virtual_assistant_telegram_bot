const {replyMessages} = require('../constants');

const {LANGUAGE_IS_CHANGED} = replyMessages;

module.exports = (ctx) => {
    const {chosenLanguage} = ctx.state;

    return ctx.reply(LANGUAGE_IS_CHANGED[chosenLanguage]);
};
