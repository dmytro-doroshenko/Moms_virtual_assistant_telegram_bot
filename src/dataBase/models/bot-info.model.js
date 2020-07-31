const {model, Schema} = require('mongoose');

const botInfoSchema = new Schema({
    language: {
        option: {
            type: String,
            required: true
        },
    }
});

module.exports = model('bot-info', botInfoSchema);
