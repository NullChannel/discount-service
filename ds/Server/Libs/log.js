/**
 * Created by talnax on 6/7/17.
 */

"use strict";

const winston = require('winston');
var ENV = 'development';   //developmentprocess.env.NODE_ENV;

function getLogger(module) {

   let path = module.filename.split('/').slice(-2).join('/');

   return new winston.Logger({
      transports: [
         new winston.transports.Console({
            colorize: true,
            level: ENV === 'development' ? 'debug' : 'error',
            label: path
         })
      ]
   });
}

module.exports = getLogger;