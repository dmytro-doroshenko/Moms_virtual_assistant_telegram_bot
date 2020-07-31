const {model, Schema} = require('mongoose');

const doctorSchema = new Schema({
    name: {
        ua: {
            type: String,
            required: true
        },
        ru: {
            type: String,
            required: true
        }
    },
    specialty: {
        ua: {
            type: String,
            required: true
        },
        ru: {
            type: String,
            required: true
        }
    },
    phone: {
        type: String,
        required: true
    },
});

module.exports = model('doctor', doctorSchema);
