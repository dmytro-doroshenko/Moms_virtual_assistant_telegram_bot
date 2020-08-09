const {model, Schema} = require('mongoose');

const doctorSchema = new Schema({
    name: {
        ru: {
            type: String,
            required: true,
        },
        ua: {
            type: String,
            required: true,
        },
    },
    phone: {
        type: String,
        required: true,
    },
    position: {
        ru: {
            type: String,
        },
        ua: {
            type: String,
        },
    },
    specialty: {
        ru: {
            type: String,
            required: true,
        },
        ua: {
            type: String,
            required: true,
        },
    },
    working_weekdays: [{
        ru: {
            type: String,
            required: true,
        },
        ua: {
            type: String,
            required: true,
        },
    }],
});

module.exports = model('doctor', doctorSchema);
