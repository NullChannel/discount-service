/**
 * Created by talnax on 6/14/17.
 */

// http://amanvirk.me/singleton-classes-in-es6/

"use strict";


let dsInstance = null;

class DataStore {

   constructor() {

      if(!dsInstance){
         dsInstance = this;
      }

      this._user = {};

      this._entry = {};

      this._callbacks = [];

      return dsInstance;
   }

   //static getInstance() {
   //   if( dsInstance === null ) {
   //      dsInstance = new DataStore();
   //      return dsInstance;
   //   }
   //   return dsInstance;
   //}

   subscribe(callback) {
      this._callbacks.pus(callback);
   }

   unsubscribe(callback) {
      this._callbacks.filter( cb => cb !== callback );
   }

   update() {
      this._callbacks.forEach( callback => callback());
   }

   get user() {
      return this._user;
   }

   set user(newUser) {
      this._user = newUser;
      this.update();
   }

   get entry() {
      return this._entry;
   }

   set entry(newEntry) {
      this._entry = newEntry;
      this.update();

      //var obj = { a: 1 };
      //var copy = Object.assign({}, obj);
      //console.log(copy); // { a: 1 }
   }
}

 //const dataStore = DataStore.getInstance();
const dataStore = new DataStore();
export default dataStore;











/*
//https://k94n.com/es6-modules-single-instance-pattern
class DataStore {

   constructor() {

      this._user = {};

      this._entry = {};

      this._callbacks = [];
   }

   get user() {
      return this._user;
   }

   set user(newUser) {
      this._user = newUser;
      this.update();
   }

   get entry() {
      return this._entry;
   }

   set entry(newEntry) {
      this._entry = newEntry;
      this.update();
   }

   subscribe(callback) {
      this._callbacks.pus(callback);
   }

   unsubscribe(callback) {
      this._callbacks.filter( cb => cb !== callback );
   }

   update() {
      this._callbacks.forEach( callback => callback());
   }
}

//export let dataStore = new DataStore();
const dataStore = new DataStore();
export default dataStore;
//export default new DataStore();

*/