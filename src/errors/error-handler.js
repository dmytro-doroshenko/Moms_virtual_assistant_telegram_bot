const {logger} = require('../config');

module.exports = (err, ctx) => {
    logger.error(`Error: ${err.message}, User: ${ctx.from.username}`);
    console.log(`Error: ${err.message}, User: ${ctx.from.username}`);
};
