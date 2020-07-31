const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    telegramId: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
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
})

module.exports = model('user', userSchema);
