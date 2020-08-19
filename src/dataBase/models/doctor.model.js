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
            required: false,
        },
        ua: {
            type: String,
            required: false,
        },
    },
    specialty: {
        ru: {
            type: String,
            required: false,
        },
        ua: {
            type: String,
            required: false,
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
