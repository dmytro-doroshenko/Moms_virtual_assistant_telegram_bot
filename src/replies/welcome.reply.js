const {models: {botInfoModel, userModel}} = require('../dataBase');

module.exports = async (ctx) => {
    const {id} = ctx.from;

    const user = await userModel.findOne({telegramId: id});

    const {chosenLanguage} = user;

    const welcomeMessage = await botInfoModel.findOne({name: 'welcomeMessage'});

    return ctx.reply(welcomeMessage.params[chosenLanguage]);
};
