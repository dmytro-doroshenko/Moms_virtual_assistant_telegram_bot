const chatbase = require('@google/chatbase');
const dialogflow = require('dialogflow');
const uuid = require('uuid');

const {
  appConfigs: {
    DIALOGFLOW_PROJECT_ID,
    CHATBASE_API_KEY,
    CHATBASE_PLATFORM,
    CHATBASE_USER_ID,
    CHATBASE_VERSION,
  },
  logger,
} = require('../config');

chatbase
  .setApiKey(CHATBASE_API_KEY)
  .setPlatform(CHATBASE_PLATFORM)
  .setUserId(CHATBASE_USER_ID)
  .setVersion(CHATBASE_VERSION);

module.exports = {
  detectIntent: async (message, languageCode) => {
    const sessionId = uuid.v4();
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
      keyFilename: `${__dirname}../../../google-cloud-key.json`,
    });
    const sessionPath = sessionClient.sessionPath(DIALOGFLOW_PROJECT_ID, sessionId);

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: message,
          // The language used by the client
          languageCode,
        },
      },
    };

    sessionClient
        .detectIntent(request)
        .then((responses) => {
          logger.info('Detected intent');
          const { queryResult } = responses[0];
          const { queryText, fulfillmentText, intent } = queryResult;
          logger.info(`  Query: ${queryText}`);
          logger.info(`  Response: ${fulfillmentText}`);

          if (intent) {
            logger.info(`  Intent: ${intent.displayName}`);
            return chatbase
              .newMessage()
              .setIntent(intent.displayName)
              .setMessage(fulfillmentText)
              .send();
          }
          logger.info('No intent matched.');
          return chatbase
            .newMessage()
            .setAsNotHandled()
            .setMessage(fulfillmentText)
            .send();
        })
        .then(() => {
          console.log('send fulfillmentText');
        })
        .catch((err) => {
          console.error(err);
        });

    //   Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    //    logger.info(`Query: ${result.queryText}`);
    const answer = result.fulfillmentText;
    //    logger.info(`Response: ${answer}`);
    if (result.intent) {
      //      logger.info(`Intent matched: ${result.intent.displayName}`);
      return answer;
    }
    //    logger.info('No intent matched.');
    return null;
  },
};
