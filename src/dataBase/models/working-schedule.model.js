const {model, Schema} = require('mongoose');

const Doctor = require('./doctor.model');

const workingScheduleSchema = new Schema({
    weekday: {
        ua: {
            type: String,
            required: true
        },
        ru: {
            type: String,
            required: true
        }
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: Doctor
    }
})

module.exports = model('working-schedule', workingScheduleSchema);
