const mongoose = require('mongoose');

const {appConfigs: {MONGO_DB_URL}} = require('../config');

module.exports = (hostingType) => {
    let connection = mongoose.connect(MONGO_DB_URL, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    if (hostingType === 'lambda') {
        mongoose.set('bufferCommands', false);
        mongoose.set('bufferMaxEntries', 0);
    }

    return connection;
};
