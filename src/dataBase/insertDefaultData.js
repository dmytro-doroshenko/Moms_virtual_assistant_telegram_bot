const doctorsInfo = [
    {
        name: {
            ru: 'Душенко Инна Аведисовна',
            ua: 'Душенко Інна Аведісовна',
        },
        phone: '0685810949',
        position: {
            ru: 'Доктор',
            ua: 'Лікар',
        },
        specialty: {
            ru: 'акушер-гинеколог',
            ua: 'акушер-гінеколог',
        },
        working_weekdays: [{
            ru: 'Понедельник',
            ua: 'Понеділок',
        }],
    },
    {
        name: {
            ru: 'Сачук Яна Леонтьевна',
            ua: 'Сачук Яна Леонтіївна',
        },
        phone: '0671623897',
        position: {
            ru: 'Доктор',
            ua: 'Лікар',
        },
        specialty: {
            ru: 'неонатолог',
            ua: 'неонатолог',
        },
        working_weekdays: [{
            ru: 'Понедельник',
            ua: 'Понеділок',
        }],
    },
    {
        name: {
            ru: 'Головко Екатерина Анатольевна',
            ua: 'Головко Катерина Анатоліївна',
        },
        phone: '0970917927',
        position: {
            ru: 'Доктор',
            ua: 'Лікар',
        },
        specialty: {
            ru: 'акушер-гинеколог',
            ua: 'акушер-гінеколог',
        },
        working_weekdays: [{
            ru: 'Вторник',
            ua: 'Вівторок',
        }],
    },
    {
        name: {
            ru: 'Самохина Ирина Ивановна',
            ua: 'Самохіна Ірина Іванівна',
        },
        phone: '0671647064',
        position: {
            ru: 'Заведующий отделением выхаживания новорожденных, доктор',
            ua: 'Завідувач відділення виходжування новонароджених, лікар',
        },
        specialty: {
            ru: 'неонатолог',
            ua: 'неонатолог',
        },
        working_weekdays: [{
            ru: 'Вторник',
            ua: 'Вівторок',
        }],
    },
    {
        name: {
            ru: 'Захарченко Раиса Николаевна',
            ua: 'Захарченко Раїса Миколаівна',
        },
        phone: '0981190258',
        position: {
            ru: 'Заведующий областного центра поддержки грудного вскармливания, доктор',
            ua: 'Завідувач обласного центру підтримки грудного вигодовування, лікар',
        },
        specialty: {
            ru: 'акушер-гинеколог',
            ua: 'акушер-гінеколог',
        },
        working_weekdays: [{
            ru: 'Среда',
            ua: 'Середа',
        }],
    },
    {
        name: {
            ru: 'Гончаренко Диана Ивановна',
            ua: 'Гончаренко Діана Іванівна',
        },
        phone: '0984922527',
        position: {
            ru: 'Перинатальный психолог',
            ua: 'Перинатальний психолог',
        },
        specialty: {
            ru: '',
            ua: '',
        },
        working_weekdays: [
            {
                ru: 'Среда',
                ua: 'Середа',
            },
            {
                ru: 'Пятница',
                ua: 'П\'ятниця',
            }],
    },
    {
        name: {
            ru: 'Собко Инна Федоровна',
            ua: 'Собко Інна Федорівна',
        },
        phone: '0989373458',
        position: {
            ru: 'Доктор',
            ua: 'Лікар',
        },
        specialty: {
            ru: 'неонатолог',
            ua: 'неонатолог',
        },
        working_weekdays: [{
            ru: 'Четверг',
            ua: 'Четвер',
        }],
    },
    {
        name: {
            ru: 'Вавренюк Богдана Александровна',
            ua: 'Вавренюк Богдана Олександрівна',
        },
        phone: '0977738158',
        position: {
            ru: 'Детский врач',
            ua: 'Дитячий лікар',
        },
        specialty: {
            ru: 'анестезиолог',
            ua: 'анестезіолог',
        },
        working_weekdays: [{
            ru: 'Четверг',
            ua: 'Четвер',
        }],
    },
    {
        name: {
            ru: 'Ибрагимова Тамила Мехмановна',
            ua: 'Ібрагімова Таміла Мехманівна',
        },
        phone: '0967772617',
        position: {
            ru: 'Доктор',
            ua: 'Лікар',
        },
        specialty: {
            ru: 'акушер-гинеколог',
            ua: 'акушер-гінеколог',
        },
        working_weekdays: [{
            ru: 'Пятница',
            ua: 'П\'ятниця',
        }],
    },
]

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
