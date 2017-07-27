/**
 * Created by talnax on 6/9/17.
 */

"use strict";

var url    = require('url'),
   http    = require('http'),
   msgback = require('./msgback');

// !!! examples: https://mongodb.github.io/node-mongodb-native/api-generated/collection.html

/*
 Examples of request:

 var reciver_request = { '$or': [ { "reciver.id": '4509' }, { "reciver.id": '90645'  } ] };
 var sender_request = { '$or': [ { "sender.id": '4509' }, { "sender.id": '90645'  } ] };
 var dbrequest = { '$and': [ reciver_request, sender_request ] };

 > Let’s say that we want to look for all the people, who are either male or developers,
 > they’re less than 40 years of age.
 var dbrequest = { $or : [ { "gender" : "m", "occupation" : "developer" } ], "age" : { "$gt" : 40 } }

 var request = {
 dbcollection:   'users',
 dbrequest:      dbrequest
 };

 // nodejs - mongodb native find all documents
 https://stackoverflow.com/questions/21626896/nodejs-mongodb-native-find-all-documents

 */
exports.dbFindItems = function(dbRequest, mongoDB, callback) {

   var msgBack = new msgback(callback);

   try {

      mongoDB.collection( dbRequest.collection, function(err, collection) {
         if(err) {
            msgBack.setMessage( true, 'ERROR[dbFindItems]: ' + err.message);
            return msgBack.callBack();
         }

         collection.find( dbRequest.request,
            dbRequest.hasOwnProperty('dbreturn')?  dbRequest.dbreturn: {},
            function (err, cursor) {
               if(err) {
                  msgBack.setMessage( true, 'ERROR[/db-find.collection.find()]: ' + err.message);
                  return msgBack.callBack();
               }
               cursor.toArray(function (err, items) {
                  if( !err) {
                     msgBack.setMessage( false, items );
                  }
                  else {
                     msgBack.setMessage( true, 'ERROR[/rdb-find.cursor.toArray()]: ' + err.message );
                  }
                  return msgBack.callBack();
               });
            });
      });
   }
   catch(err) {
      console.log('ERROR(mongo-api.dbFindItems())' + err );
   }
};

exports.dbAddItem = function(dbRequest, mongoDB, callback ) {

   var msgBack = new msgback(callback);

   try {

      mongoDB.collection(dbRequest.collection, function(err, collection) {

         if(err) {
            msgBack.setMessage( true, 'ERROR[/dbAddItem]: ' + err.message);
            return msgBack.callBack();
         }

         collection.insert(dbRequest.request, function (err) {
            if(err) {
               msgBack.setMessage( true, 'ERROR[/dbAddItem]: ' + err.message);
            }
            else {
               msgBack.setMessage( false, 'SUCCESS(/dbAddItem, was done)');
            }
            return msgBack.callBack();
         });
      });
   }
   catch(err) {
      console.log('ERROR(mongo-api.addItem())' + err );
   }
};

/*
 db.users.update ( { user.id : '1' }, { $set: {  job: 'developers', city: 'San-Francisco' } } );

 // http://stackoverflow.com/questions/10383682/mongodb-update-insert-a-list-of-item-to-an-array

 db.collection.update( criteria, objNew, upsert, multi )
 for array: db.test.update( {"name": "x"}, {"$pushAll": {"arr": [1, 2, 3]}}, false, true)
 If you want to update multiple records, it's important to pass 'true' as the 4th argument to the update function
 */
exports.dbUpdateItem = function(dbRequest, mongoDB, callback ) {

   var msgBack = new msgback(callback);

   try {

      mongoDB.collection(dbRequest.collection, function(err, collection) {
         if(err) {
            msgBack.setMessageBack( true, 'ERROR[/dbUpdate]: ' + err.message);
            return msgBack.callBack();
         }
         
         //collection.update( dbRequest.dbrequest, function (err, cursor) {
         collection.update(
            dbRequest.dbfind,
            dbRequest.dbupdate,
            dbRequest.hasOwnProperty('dbupsert')? dbRequest.dbupsert: {},
            function(err, result) {
               if(err) {
                  msgBack.setMessage( true, 'ERROR[/dbUpdate]: ' + err.message);
               }
               else {
                  msgBack.setMessage( false, 'SUCCESS(/db-update, was done)');
               }
               return msgBack.callBack();
            });
      });
   }
   catch(err) {
      console.log('ERROR(mongo-api.dbUpdate())' + err );
   }
};

