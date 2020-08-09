const {detectIntent} = require('../services/dialogflow');

module.exports = async (ctx, next) => {
    const {chosenLanguage} = ctx.state;
    const userMessage = ctx.update.message.text;

    const result = await detectIntent(userMessage, chosenLanguage);

    if (result) {
        return ctx.reply(result);
    }

    return next();
};
