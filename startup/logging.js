const winston = require('winston');

module.exports = function() {
    winston.exceptions.handle(new winston.transports.File({ filename: './logs/uncaughtExceptions.log'}));
    process.on('unhandledRejection', (exception => {
        throw exception;
    }));
    
    winston.add(new winston.transports.File({ filename: './logs/logfile.log'}));
}