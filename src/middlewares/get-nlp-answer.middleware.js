const {detectIntent, getIntentTrainingPhrase} = require('../services/dialogflow');
const {replyMessages, buttonsText} = require('../constants');
const {GET_TRAINING_PHRASE_PART_ONE, GET_TRAINING_PHRASE_PART_TWO} = replyMessages;
const {FAQ} = buttonsText;
 
module.exports = async (ctx, next) => {
    const {chosenLanguage} = ctx.state;
    const userMessage = ctx.update.message.text;
    const result = await detectIntent(userMessage, chosenLanguage);

    if (result === null || result.intentDetectionConfidence < 0.5) {
        return next();
    } 

    if (result.intentDetectionConfidence < 0.95 && result.intentDetectionConfidence > 0.5){

        const responseIntent = await getIntentTrainingPhrase(result.intentName, chosenLanguage);
        const message = `${GET_TRAINING_PHRASE_PART_ONE[chosenLanguage]} \n ❓${responseIntent} \n 👉${result.answer} \n\n${GET_TRAINING_PHRASE_PART_TWO[chosenLanguage]} "${FAQ[chosenLanguage]}"`;

        return ctx.reply(message);
    } 

    return ctx.reply(result.answer);
   
};
