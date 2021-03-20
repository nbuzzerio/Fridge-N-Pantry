const winston = require('winston');

module.exports = function() {
    winston.exceptions.handle(new winston.transports.Console());
    winston.exceptions.handle(new winston.transports.File({ filename: './logs/uncaughtExceptions.log'}));
    process.on('unhandledRejection', (exception => {
        throw exception;
    }));
    
    winston.add(new winston.transports.Console({format: winston.format.combine(winston.format.colorize(), winston.format.simple())}));
    winston.add(new winston.transports.File({ filename: './logs/logfile.log'}));
}