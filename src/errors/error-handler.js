const {logger} = require('../config');

module.exports = (err, ctx) => {
    logger.error(`Error: ${err.message}, User: ${ctx.from.username}`);
};
