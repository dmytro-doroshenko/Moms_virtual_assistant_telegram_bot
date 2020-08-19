const {doctorsInfo} = require('../constants');

setDoctorsInfo = async (doctors, updateAll = false) => {
    const {doctorModel} = require('./models');

    for (const doctor of doctors) {

        const inDatabase = await doctorModel.findOne({name: doctor.name});

        if (!inDatabase) {
            await doctorModel(doctor).save();
        } else if (updateAll){
            await doctorModel.findByIdAndUpdate({_id: inDatabase._id}, doctor);
        }
    }
};

module.exports = async () => {
    await setDoctorsInfo(doctorsInfo);
};
