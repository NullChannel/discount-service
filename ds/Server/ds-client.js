/**
 * Created by rostislavshevtsov on 6/10/17.
 */
"use strict";

const fetch = require('node-fetch'),
      dataEntries = require('./../src/Emulators/Server/DataProxy').DataProxyEntries;

let dsUser = {
   id_person:  '325629ab-8cd3-4653-97fb-ed2904b553e9',
   first_name: 'John',
   last_name:  'McKinley',
   email:      'john.mckinley@mail.com',
   password:   'qqq'
};

let dsEntry = {
   id:            '702e5e32-59ee-415d-b1a7-268ef3c35019',
   title:         'Discount 30% for HP ENVY x360 Convertible Laptop',
   description:   'Speedy general performance; Lots of ports',
   image:         'http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c05095142.png',

   product_type:  'laptop',
   pc_type:       'premium',
   target_user:   'business',
   time_frame:    '9/15/2017',

   toaster_type:  'footer-buy',
   active_status: 'active'
};

function createDiscountEntry(entry, callback) {
   console.log('ds-client.CreateDiscountEntry(entry): ', entry );

   let domain  = 'http://localhost:1437/';
   let api     = 'add-discount-entry';
   let pathUrl = `${domain}${api}`;

   let request = {
      entry: entry
   };

   fetch( pathUrl, {
      method: "post",
      headers: {
         'Accept': '*/*',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
      })
      .then(function (response) {
         console.log('CreateDiscountEntry(response)', response);

          callback(result.err, result.status, result.value);
      })
      .catch(function (error) {
         console.log(error);
         return callback(error);
   });
}

function makeRegistration(user, callback) {
   console.log('ds-client.makeRegistration(user): ', user );

   let domain  = 'http://localhost:1437/';
   let api     = 'register-user';
   let pathUrl = `${domain}${api}`;

   let request = {
      user: user
   };

   fetch( pathUrl, {
      method: "post",
      headers: {
         'Accept': '*/*',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
   })
   .then(function (result) {

      console.log('makeRegistration(response)', result);

      return callback(result.err, result.status, result.value);
   })
   .catch(function (error) {
      return callback(error);
   });
}

function makeLogIn(email, password, callback) {
    console.log('ds-client.makeRegistration(user): ', email, password );

   let domain  = 'http://localhost:1437/';
   let api     = 'login-user';
   let pathUrl = `${domain}${api}`;

    let request = {
        user: {
            email: email,
            password: password
        }
    };

   fetch( pathUrl, {
      method: "post",
      headers: {
         'Accept': '*/*',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
   })
   .then(res => res.json())

   .then(result => {

       console.log('makeLogIn(response)', result);

       return callback(result.err, result.status, result.value);
   })
   .catch(function (error) {
       return callback(error);
   });
}

setTimeout(function() {

   dsEntry.id_person = dsUser.id_person;
   createDiscountEntry( /*dsEntry*/ dataEntries[5], (err, result) => {
      if(!err) {
         console.log(result);
      }
   });
    /**/

    /*
   makeRegistration(user, (err, result) => {
      if(!err) {
         console.log('makeRegistration(): ',result);
      }
   });
   */

   /*
   makeLogIn(user.email, user.password, (err, result) => {
      if(!err) {
         console.log(result);
      }
   });
   */

}, 300);


