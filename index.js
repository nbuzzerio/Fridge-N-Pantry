require('dotenv').config()
const mongoose = require('mongoose');
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/routes')(app);

winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtExceptions.log'}));
process.on('unhandledRejection', (exception => {
    throw exception;
}));

winston.add(new winston.transports.File({ filename: 'logfile.log'}));

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));