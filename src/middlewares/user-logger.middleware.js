const {logger} = require('../config');

module.exports = async (ctx, next) => {
    if (ctx.update.callback_query) {
        logger.info(`User: ${ctx.from.username}, Action: ${ctx.updateType} - ${ctx.update.callback_query.message.text}`);
    } else {
        logger.info(`User: ${ctx.from.username}, Action: ${ctx.updateType} - ${ctx.message.text}`);
    }

    return next();
};
