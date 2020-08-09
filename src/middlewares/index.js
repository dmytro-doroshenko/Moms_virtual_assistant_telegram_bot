const addNewUserToDbMiddleware = require('./add-new-user-to-db.middleware');
const changeLanguageMiddleware = require('./change-language.middleware');
const getChosenLanguageMiddleware = require('./get-chosen-language.middleware');
const getDoctorsOnDutyMiddleware = require('./get-doctors-on-duty.middleware');
const getNLPAnswerMiddleware = require('./get-nlp-answer.middleware');
const updateUsersLastVisitTimeMiddleware = require('./update-users-last-visit.middleware');
const userLoggerMiddleware = require('./user-logger.middleware');

module.exports = {
    addNewUserToDbMiddleware,
    changeLanguageMiddleware,
    getChosenLanguageMiddleware,
    getDoctorsOnDutyMiddleware,
    getNLPAnswerMiddleware,
    updateUsersLastVisitTimeMiddleware,
    userLoggerMiddleware,
};
