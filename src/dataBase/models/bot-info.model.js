const {model, Schema} = require('mongoose');

const botInfoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    params: {
        type: Schema.Types.Mixed,
        required: true
    }
});

module.exports = model('bot-info', botInfoSchema);
