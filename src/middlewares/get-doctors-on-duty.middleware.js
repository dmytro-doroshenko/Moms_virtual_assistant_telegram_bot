const {systemInfo} = require('../constants');
const {getAllDoctors, getDoctorsOnDuty} = require('../services/bot.service');

const {WORKING_HOURS} = systemInfo;

module.exports = async (ctx, next) => {
    const {chosenLanguage} = ctx.state;

    const now = new Date();
    let dayIndex = now.getUTCDay();
    const currHour = now.getUTCHours() + 3;

    const workingHoursEnd = +WORKING_HOURS[dayIndex].to.split(':')[0];

    if (currHour >= workingHoursEnd) {
        ctx.state.tooLate = true;
        dayIndex = dayIndex === 6 ? 0 : ++dayIndex;
    }

    if (dayIndex === 0 || dayIndex === 6) {
        ctx.state.dayOff = true;
        ctx.state.doctorsOnDuty = await getAllDoctors();
    } else if (dayIndex >= 1 && dayIndex <= 5) {
        ctx.state.doctorsOnDuty = await getDoctorsOnDuty(dayIndex, chosenLanguage);
    } else {
        throw Error('Day of week is invalid');
    }

    ctx.state.workingHours = {
        from: +WORKING_HOURS[dayIndex].from.split(':')[0],
        to: +WORKING_HOURS[dayIndex].to.split(':')[0],
    }

    return next();
};
