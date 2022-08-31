const winston = require('winston');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '_' + dd + '_' + yyyy;

module.exports. logger=winston.createLogger({
  transports:[
    new winston.transports.File({
      level:"info",
      filename:`filelog_${today}.log`,
      json:true,
      format:winston.format.combine(winston.format.timestamp(),winston.format.json())
    }),
    new winston.transports.File({
      level:"error",
      filename:`filelog_error_${today}.log`,
      json:true,
      format:winston.format.combine(winston.format.timestamp(),winston.format.json())


    })
  ]
})