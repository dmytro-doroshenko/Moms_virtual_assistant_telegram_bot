const {userModel} = require('../dataBase/models');

module.exports = async (ctx, next) => {
    const {id} = ctx.from;

    await userModel.findOneAndUpdate({telegramId: id}, {lastSeenAt: Date.now()});

    return next();
};
