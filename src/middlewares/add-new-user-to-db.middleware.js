const {models: {userModel}} = require('../dataBase');

module.exports = async (ctx, next) => {

    const {id, first_name, username} = ctx.from;

    const userFromDB = await userModel.findOne({telegramId: id});

    if (!userFromDB) {
        const userInfo = {
            telegramId: id,
            firstName: first_name,
            userName: username,
            cameFirstAt: Date.now(),
            lastSeenAt: Date.now(),
            chosenLanguage: 'ua'
        };
        await userModel(userInfo).save();
    }

    return next();
}
