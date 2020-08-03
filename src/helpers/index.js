module.exports = {
    getTriggers: (obj) => {
        const requests_list = [];

        Object.values(obj).forEach(value => {
            requests_list.push(value);
        });

        return requests_list;
    },
};
