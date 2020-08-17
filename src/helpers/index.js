module.exports = {
    createDoctorsListForResponse: async (doctorsList, language) => {
        let replyMessage = '';

        await doctorsList.forEach(doctor => {
            const {name, phone, position, specialty} = doctor;

            const row = `${name[language]}, \n ${position[language].toLowerCase()} ` +
                `${specialty[language].toLowerCase()}, \n ${phone} \n\n`

            replyMessage += row;
        });

        return replyMessage;
    },

    getFullTrainingPhrase: (parts) => {
        return parts.map(p => p.text).join("");
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

    setButtonsView: (buttons, row) => {
        const buttonsBox = [];
        let i = 0;
        while(i < buttons.length) {
            const buttonRow = [];
            for (let j = 0; j < row && i < buttons.length; j++) {
                if(buttons[i].text.length > 25) {
                    buttonRow.push(buttons[i]);
                    j++;
                    i++;
                }
                else {
                    buttonRow.push(buttons[i]);
                    i++;
                }
            }
            buttonsBox.push(buttonRow);
        }
        return buttonsBox;
    },

    normalizeLanguageCode: (languageCode) => {
        return languageCode === 'ua' ? 'uk' : 'ru';
    }
};
