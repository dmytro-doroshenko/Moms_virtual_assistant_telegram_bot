require('dotenv').config();

module.exports = {
    BOT_TOKEN: process.env.BOT_TOKEN || 'token not configured',
    MONGO_DB_URL: process.env.MONGO_DB_URL || 'localhost:27017',
};
