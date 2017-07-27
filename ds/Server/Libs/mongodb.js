/**
 * Created by rostislavshevtsov on 6/7/17.
 */

"use strict";

let mongo = require('mongodb');

//mongo.Connection.DEFAULT_PORT
const mongoDS = new mongo.Db(
   'ds_db',                        // name of database
   new mongo.Server( "127.0.0.1", 27017 /* mongo.Connection.DEFAULT_PORT */, {})
);

mongoDS.open(function(err) {
   console.log('mongoDS.open');

   if(err) {
      console.log('mongoDS.open: FAIL!!!');
   }
});

/*

// https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
// MongoClient or how to connect in a new and better way

var MongoClient = require('mongodb').MongoClient
   , Server = require('mongodb').Server;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
   var db1 = mongoClient.db("mydb");

   mongoClient.close();
});
*/

/*
// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
   if(!err) {
      console.log("We are connected");
   }
});
*/

exports.mongoDS = mongoDS;