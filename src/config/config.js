require('dotenv').config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN || 'token not configured',

  MONGO_DB_URL: process.env.MONGO_DB_URL || 'localhost:27017',

  NODE_ENV: process.env.NODE_ENV || 'development',
  CLOUDWATCH_GROUP_NAME: process.env.CLOUDWATCH_GROUP_NAME,
  CLOUDWATCH_ACCESS_KEY: process.env.CLOUDWATCH_ACCESS_KEY,
  CLOUDWATCH_SECRET_ACCESS_KEY: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
  CLOUDWATCH_REGION: process.env.CLOUDWATCH_REGION || 'us-east-1',
};
