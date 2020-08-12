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

    //   Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    logger.info(`Query: ${result.queryText}`);
    const answer = result.fulfillmentText;
    logger.info(`Response: ${answer}`);
    if (result.intent) {
        logger.info(`Intent matched: ${result.intent.displayName}`);
        chatbase
            .newMessage()
            .setIntent(result.intent.displayName)
            .setMessage(answer)
            .send();
      return answer;
    }

    logger.info('No intent matched.');
    chatbase
          .newMessage()
          .setAsNotHandled()
          .send();
    return null;
  },
};
