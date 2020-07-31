const addNewUserToDbMiddleware = require('./add-new-user-to-db.middleware');
const updateUsersLastVisitTimeMiddleware = require('./update-users-last-visit.middleware');

module.exports = {
    addNewUserToDbMiddleware,
    updateUsersLastVisitTimeMiddleware
};
