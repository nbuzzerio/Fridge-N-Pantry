require('dotenv').config()
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/database')();

winston.exceptions.handle(new winston.transports.File({ filename: './logs/uncaughtExceptions.log'}));
process.on('unhandledRejection', (exception => {
    throw exception;
}));

winston.add(new winston.transports.File({ filename: './logs/logfile.log'}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));