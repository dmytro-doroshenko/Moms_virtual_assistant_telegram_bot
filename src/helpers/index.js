module.exports = {
    createDoctorsListForResponse: async (doctorsList, language) => {
        let replyMessage = '';

        await doctorsList.forEach(doctor => {
            const {name, phone, position, specialty} = doctor;

            const row = `- ${position[language]} ${specialty[language].toLowerCase()} ${name[language]}, ${phone} \n`

            replyMessage += row;
        });

        return replyMessage;
    },

    getTriggers: (obj) => {
        const requests_list = [];

        Object.values(obj).forEach(value => {
            requests_list.push(value);
        });

        return requests_list;
    },

    getWeekDay: (timestamp) => {
        const date = new Date(timestamp);

        return date.getDay();
    },
};
