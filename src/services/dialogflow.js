const chatbase = require('@google/chatbase');
const dialogflow = require('dialogflow');
const uuid = require('uuid');

const {normalizeLanguageCode, getFullTrainingPhrase} = require("../helpers/index");

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
      projectId: DIALOGFLOW_PROJECT_ID
    });

    const sessionPath = sessionClient.sessionPath(DIALOGFLOW_PROJECT_ID, sessionId);

    // The text query request.
    const request = {
      session: sessionPath,
      intentView: 1,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: message,
          // The language used by the client
          languageCode: normalizeLanguageCode(languageCode),
        },
      },
    };
    //   Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    logger.info(`Query: ${result.queryText}`);
    const answer = result.fulfillmentText;
    logger.info(`Response: ${answer}`);
    const intentDetectionConfidence = result.intentDetectionConfidence;
    logger.info(`Intent detection confidence: ${intentDetectionConfidence}`);
    if (result.intent) {
        const intentName = result.intent.name;
        logger.info(`Intent name: ${intentName}`);
        logger.info(`Intent display name: ${result.intent.displayName}`);
        chatbase
            .newMessage()
            .setIntent(result.intent.displayName)
            .setMessage(answer)
            .send();
      return {answer, intentDetectionConfidence, intentName};
    }
    logger.info('No intent matched.');
    chatbase
          .newMessage()
          .setAsNotHandled()
          .setMessage('No intent matched.')
          .send();
    return null;
  },

  listIntents: async (category, languageCode) => {
    const intentsClient = new dialogflow.IntentsClient({
      keyFilename: `${__dirname}../../../google-cloud-key.json`,
      projectId: DIALOGFLOW_PROJECT_ID
    });
    // The path to identify the agent that owns the intents.
    const projectAgentPath = intentsClient.projectAgentPath(DIALOGFLOW_PROJECT_ID);

    const request = {
      parent: projectAgentPath,
      languageCode: normalizeLanguageCode(languageCode),
      intentView: 1,
      pageSize: 200,
    };

    // Send the request for listing intents.
    const [response] = await intentsClient.listIntents(request);

    const categoryIntents = [];
    response.forEach(intent => {
      const splitedIntent = intent.displayName.split('.');

      if (splitedIntent[splitedIntent.length-1] === category) {
        const trainingPhrase = getFullTrainingPhrase(intent.trainingPhrases[0].parts);
        categoryIntents.push(trainingPhrase)
      }
    });
    logger.info(`categoryIntents: ${categoryIntents}`);
    return categoryIntents;
  },

  getIntentTrainingPhrase: async (intentName, languageCode) => {
    const intentsClient = new dialogflow.IntentsClient({
      keyFilename: `${__dirname}../../../google-cloud-key.json`,
      projectId: DIALOGFLOW_PROJECT_ID
    });
    // The path to identify the agent that owns the intents.
    const request = {
      name: intentName,
      languageCode: normalizeLanguageCode(languageCode),
      intentView: 1,
    };
    // Send the request for listing intents.
    const [response] = await intentsClient.getIntent(request);

    const result = getFullTrainingPhrase(response.trainingPhrases[0].parts)

    return result;
  }
 };


