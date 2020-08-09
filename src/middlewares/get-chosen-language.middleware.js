const {userModel} = require('../dataBase/models');

module.exports = async (ctx, next) => {
    const {id} = ctx.from;

    const user = await userModel.findOne({telegramId: id});

    const {chosenLanguage} = user;

    ctx.state.chosenLanguage = chosenLanguage;

    return next();
};
