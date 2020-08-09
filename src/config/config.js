require('dotenv').config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN || 'token not configured',

  DIALOGFLOW_PROJECT_ID: process.env.DIALOGFLOW_PROJECT_ID || "mom-s-bot-bocc",

  MONGO_DB_URL: process.env.MONGO_DB_URL || 'localhost:27017',

  NODE_ENV: process.env.NODE_ENV || 'development',
  CLOUDWATCH_GROUP_NAME: process.env.CLOUDWATCH_GROUP_NAME,
  CLOUDWATCH_ACCESS_KEY: process.env.CLOUDWATCH_ACCESS_KEY,
  CLOUDWATCH_SECRET_ACCESS_KEY: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
  CLOUDWATCH_REGION: process.env.CLOUDWATCH_REGION || 'us-east-1',

  CHATBASE_API_KEY: process.env.CHATBASE_API_KEY || 'wrong chatbase api key',
  CHATBASE_PLATFORM: process.env.CHATBASE_PLATFORM || 'GoogleAssistant',
  CHATBASE_USER_ID: process.env.CHATBASE_USER_ID || 'bkkjnnknknk',
  CHATBASE_VERSION: process.env.CHATBASE_VERSION || '2.0',
};
