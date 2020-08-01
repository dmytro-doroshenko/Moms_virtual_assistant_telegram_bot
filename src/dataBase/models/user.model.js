const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
    },
    telegramId: {
        type: String,
        required: true,
        unique: true
    },
    cameFirstAt: {
        type: Date,
        required: true
    },
    lastSeenAt: {
        type: Date,
        required: true
    },
    chosenLanguage: {
        type: String,
        required: true
    }
});

module.exports = model('user', userSchema);
