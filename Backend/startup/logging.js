const winston = require('winston');
require('express-async-errors');

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }));
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
}