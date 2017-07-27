/**
 * Created by talnax on 6/7/17.
 */

// Restart node upon changing a file
// https://stackoverflow.com/questions/11175676/restart-node-upon-changing-a-file
// https://github.com/codedojo/redux-basics/blob/async/server.js
// https://stackoverflow.com/questions/36840396/react-fetch-gives-an-empty-response-body

"use strict";

const fs          = require('fs'),
      express     = require('express'),
      log         = require('./Libs/log')(module),
      cors        = require('cors'),                  // https://github.com/expressjs/cors
      http        = require('http'),
      querystring = require('querystring'),
      url         = require('url'),
      utl         = require('util'),
      path        = require('path'),
      bodyParser  = require('body-parser'),
      dataApi     = require('./Libs/data-api'),
      mongoApi    = require('./Libs/mongo-api'),
      authApi     = require('./Libs/auth-api'),
      msgback     = require('./Libs/msgback'),
      modes       = require('./Libs//modes'),
      mongoDS     = require('./Libs/mongodb').mongoDS;


const app    = express(),
      server = http.createServer(app);

const sourceMode = 'release';
//const sourceMode = 'debug';

process.on('uncaughtException', function (err) {
   log.info(err.stack);
});

fs.readFile( __dirname + '/config.json', function (err, data) {
   if( err ) {
      log.info("Error open 'config.json'", err.message);
   }
   else {
      let serverConfig = JSON.parse(data);

      let server_host = serverConfig.host;   console.log('host: ', server_host);
      let server_port = serverConfig.port;   console.log('port: ', server_port);

      if( serverConfig )  {
         server.listen(server_port, server_host, function() {
            log.info("ds-server listening -> http://" + server_host + ":" + server_port);
         });
      }
   }
});

// app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
// });

app.use(cors());
app.use(bodyParser.json());
//app.use(express.bodyParser());


app.get('/', (req, res) => {
   console.log('\n\n ds-server.default("/")');
   res.send({
      err:    false,
      status: modes.DataMode.data_exist,
      value: 'Discount-Service Running...'
   });
});

// ----------------------------------------------------------------- REGISTER User

app.post('/register-user', (req, res) => {

    console.log('\n\n ds-server.register-user ');
    console.log('register-user(req.url)): ',req.url);
    console.log('register-user(req.body): ', req.body);
    console.log('register-user(req.headers): \n', req.headers);

   let dbRequest = {
      request:    req.body.user,
      collection: 'sales-users'
   };

   authApi.registerUser(dbRequest, mongoDS, msgback => {

      if(msgback.err) {
         return res.send(msgback);
      }

      let result = {
         err:    msgback.err,
         status: msgback.param.status,
         value:  msgback.param.value
      };

      res.send(result);
   });
});

// ----------------------------------------------------------------- LOGIN User

app.post('/login-user', (req, res) => {

   let dbRequest = {
      user:       req.body.user,
      collection: 'sales-users'
   };

   authApi.logInUser(dbRequest, mongoDS, msgback => {

      if(msgback.err) {
         return res.send(msgback);
      }

      res.send({
         err:    msgback.err,
         status: msgback.param.status,
         value:  msgback.param.value
      });
   });
});

// ----------------------------------------------------------------- GET ALL Entries

//const DiscountEntries = require('./Emulators/data-proxy');
//const dataEntries = require('./Emulators/data-entries.json');
const dataEntries = require('./../src/Emulators/Server/DataProxy').DataProxyEntries;
app.get('/get-all-discount-entries', (req, res) => {

   if(sourceMode === 'release') {

      let dbRequest = {
         request:    {},
         dbreturn : {
            '_id':   0  // Exclude '_id'
         },
         collection: 'entries'
      };

      mongoApi.dbFindItems(dbRequest, mongoDS, msgback => {
         if(msgback.err) {
            return res.send({
               err:    msgback.err,
               status: modes.DataMode.data_not_exist,
               value:  null
            });
         }

         res.send({
            err:    false,
            status: modes.DataMode.data_exist,
            value:  msgback.param
         });
      });
   }
   else {
      res.send({
         err:    false,
         status: modes.DataMode.data_exist,
         value:  dataEntries
      });
   }
});

app.get('/get-discount-entries', (req, res) => {

   var query     = querystring.parse(url.parse(req.url).query);

   for( let item in query ) {
      query[item] = query[item].split('?')[0];  // remove '?'
   }

   if(sourceMode === 'release') {

      let dbRequest = {
         request:    query,
         dbreturn : {
            '_id':   0  // Exclude '_id'
         },
         collection: 'entries'
      };

      mongoApi.dbFindItems(dbRequest, mongoDS, msgback => {
         if(msgback.err) {
            return res.send({
               err:    msgback.err,
               status: modes.DataMode.data_not_exist,
               value:  null
            });
         }

         res.send({
            err:    false,
            status: modes.DataMode.data_exist,
            value:  msgback.param
         });
      });
   }
   else {
      res.send({
         err:    false,
         status:  modes.DataMode.data_exist,
         value:  dataEntries
      });
   }
});


// ----------------------------------------------------------------- ADD Entry

app.post('/add-discount-entry', (req, res) => {
   
   let dbRequest = {
      request:    req.body.entry,
      collection: 'entries'
   };

   dataApi.addNewDiscountEntry(dbRequest, mongoDS, msgback => {

      if(msgback.err) {
         return res.send(msgback);
      }

      let result = {
         err:    msgback.err,
         status: msgback.param.status,
         value:  msgback.param.value
      };

      res.send(result);
   });
});

// ----------------------------------------------------------------- UPDATE Entry

app.post('/update-discount-entry', (req, res) => {

   let dbRequest = {
      dbfind:     req.body.dbfind,
      dbupdate:   req.body.dbupdate,
      collection: 'entries'
   };

   mongoApi.dbUpdateItem(dbRequest, mongoDS, msgback => {
      if(msgback.err) {
         res.send(msgback);
      }

      res.send({
         err:   false,
         status: modes.DataMode.data_updated,
         value:  msgback.param
      });
   });
});


// for 404
app.use(function(req, res, next) {
   // In Express 404s are not the result of an error, thus the error-handler
   // middleware will not capture 404s, this is because a 404 is simply the
   // absence of additional work to do, in other words Express has executed
   // all middleware / routes and found that none of them responded.
   // All you need to do is add a middleware at the very bottom below all
   // the others to handle a 404:
   // http://expressjs.com/faq.html
   //res.send(404, 'Sorry cant find that!');

   //var msgback = {
   //   err:   true,
   //   param: null
   //};
   //
   //utils.serverResponse( req, res, msgback, function() {});

   res.send(404, "Sorry we don't find that");
   
   // Sat, 10 Jun 2017 07:50:52 GMT express deprecated res.send(status, body):
   // Use res.status(status).send(body) instead at Server/ds-server.js:111:8
});

// for error 'next(new Error('Ooops'));
app.use(function(err, req, res, next) {
   // NODE_ENV = 'production'
   if(app.get('env') === 'development') {
      let errorHandler = express.errorHandler();
      errorHandler(err, req, res, next);
   }
   else {
      res.send(505);
   }
});