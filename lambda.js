const express = require('express');

const bot = require('./src/bot');
const {logger} = require('./src/config');
const dataBaseConnection = require('./src/dataBase');

const app = express();

exports.handler = async (event) => {

    await dataBaseConnection('lambda');

    app.use('*', (err, req, res, next) => {
        logger.error({
            method: req.method,
            url: req.path,
            data: req.body,
            time: new Date(),
            message: err.message,
        });

        next(err);
    });

    const update = JSON.parse(event.body); // get data passed to us
    await bot.handleUpdate(update); // make Telegraf process that data
    return { // return something for webhook, so it doesn't try to send same stuff again
        statusCode: 200,
        body: '',
    };
};
