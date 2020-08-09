const {getWeekDay} = require('../helpers');
const {getAllDoctors, getDoctorsOnDuty} = require('../services/bot.service');

module.exports = async (ctx, next) => {
    const {chosenLanguage} = ctx.state;

    const dayIndex = await getWeekDay(Date.now());

    if (dayIndex === 0 || dayIndex === 6) {
        ctx.state.dayOff = true;
        ctx.state.doctorsOnDuty = await getAllDoctors();
    } else if (dayIndex >= 1 && dayIndex <= 5) {
        ctx.state.doctorsOnDuty = await getDoctorsOnDuty(dayIndex, chosenLanguage);
    } else {
        throw Error('Day of week is invalid');
    }

    return next();
};
