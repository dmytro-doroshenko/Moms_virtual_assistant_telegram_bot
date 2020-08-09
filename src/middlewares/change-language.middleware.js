const {userModel} = require('../dataBase/models');

module.exports = async (ctx, next) => {
    const chosenLanguage = ctx.update.callback_query.data;
    const {id} = ctx.from;

    await userModel.findOneAndUpdate({telegramId: id}, {chosenLanguage});

    return next();
};
