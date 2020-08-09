const {doctorModel} = require('../dataBase/models');
const {systemInfo} = require('../constants');

const {DAYS_OF_WEEK} = systemInfo;

module.exports = {
    getAllDoctors: () => {
        return doctorModel.find({});
    },

    getDoctorsOnDuty: (dayOfWeekIndex, language) => {
            const dayOfWeek = DAYS_OF_WEEK[dayOfWeekIndex];

            return doctorModel.find({}).where(`working_weekdays.${language}`, dayOfWeek[language]);
    },

};
