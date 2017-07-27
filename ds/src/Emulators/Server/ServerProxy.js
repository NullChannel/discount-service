/**
 * Created by talnax on 5/17/17.
 */

import Common, { SourceMode, EntriesName } from '../../Common/Common';
import { UserMode, DataMode }              from '../../../Server/Libs/modes';
import { DiscountEntries }                 from './DataProxy';

class ServerProxy {

   constructor() {

      this.common = new Common();

      this.sourceMode = SourceMode.release;

      this.entries    = this.sourceMode === SourceMode.debug ? DiscountEntries : [];

      this.test_user = {
         id_person:  '325629ab-8cd3-4653-97fb-ed2904b553e9',
         first_name: 'John',
         last_name:  'McKinley',
         email:      'john.mckinley@mail.com',
         password:   'qqq'
      };
   }

   // ------------------------------------------------------------------ call server functions

   registerUser(user, callback) {
      console.log('ServerProxy.registerUser(): ', user);

      if( this.sourceMode === SourceMode.debug) {
         setTimeout(() => {
            callback(false, UserMode.user_register, this.test_user);
         }, 600 );
      }
      else {

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

         .then(res => res.json())

         .then(result => {
            console.log('registerUser(response)', result);
            return callback(result.err, result.status, result.value);
         })

         .catch(function (error) {
            console.log('registerUser(FAIL(error): ',error);
            return callback(error);
         });
      }
   }

   logInUser(email, password, callback) {
      console.log('ServerProxy.logInUser(): ', email, password );

      if( this.sourceMode === SourceMode.debug) {
         setTimeout(() => {
            return callback(false, UserMode.user_exist, this.test_user);
         }, 600 );
      }
      else {

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
            console.log('logInUser(response)', result);
            callback(result.err, result.status, result.value);
         })

         .catch(function (error) {
            console.log('logInUser(FAIL(error): ',error);
            callback(error);
         });
      }
   }

   logOutUser(user, callback) {
      console.log('ServerProxy.logOutUser(): ', user);

      setTimeout(() => {
         return callback(false);
      }, 600 );
   }

   GetDiscountEntries(request, callback) {
      console.log('GetDiscountEntries(request): ', request );

      if( this.sourceMode === SourceMode.debug) {

         this.parseResults(request, DiscountEntries, (err,results) => {

            setTimeout(() => {
               return callback(err, results);
            }, 600 );
         });
      }
      else {

         // remove 'title' and 'description' for database request

         let req = Object.assign({}, request );   // this.cloneObject(obj[key]);
         if(req.title !== '') {
            delete req.title;
            delete req.description;
         }

         let query   = this.wrapUrlParams(req);
         let domain  = 'http://localhost:1437/';
         let api     = 'get-discount-entries';
         let pathUrl = `${domain}${api}?${query}`; // //fetch('/some/url?' + urlParams);

         console.log(pathUrl);

         // real call to server to add entry

         fetch(pathUrl)

            .then(res => res.json())

            .then(result => {

               console.log('GetDiscountEntries(entries): ', result );

               //if(result.err) {
               //   return callback(result.err);
               //}
               //else {
               //   return callback(result.err, result.value);
               //}

                this.parseResults(request, result.value, (err,list) => {

                   setTimeout(() => {
                      return callback(err, list);
                   }, 600 );
                });
            })

            .catch(function (err) {
               console.log('Request(ReadDiscountEntries()) FAILED', err.message );
               return callback(err);
            });
      }
   }

   // https://github.com/matthew-andrews/isomorphic-fetch/issues/30
   // https://blog.hospodarets.com/fetch_in_action - mode: "no-cors", // cors",
   // Fetch API cannot load http://localhost:1437/add-discount-entry. Response for preflight has invalid HTTP status code 404
   // https://stackoverflow.com/questions/36840396/react-fetch-gives-an-empty-response-body
   AddDiscountEntry(entry, callback) {
      console.log('ServerProxy.AddDiscountEntry(entry): ', entry);

      if( this.sourceMode === SourceMode.debug) {

         setTimeout(() => {
            return callback(false, DataMode.data_set_new, entry);
         }, 600 );
      }
      else {

         // real call to server to add entry

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

            .then(res => res.json())

            .then( result => {
               console.log('CreateDiscountEntry(response)', result);
               callback(result.err, result.status, result.value);
            })

            .catch(function (error) {
               console.log('CreateDiscountEntry(FAIL(error): ',error);
               return callback(error);
            });
      }
   }

   UpdateDiscountEntries(entry, callback) {
      console.log('UpdateDiscountEntries(request): ', entry );

      if( this.sourceMode === SourceMode.debug) {

         setTimeout(() => {
            return callback(false, DataMode.data_updated, entry);
         }, 600 );
      }
      else {
         // real call to server to update entry

         let domain  = 'http://localhost:1437/';
         let api     = 'update-discount-entry';
         let pathUrl = `${domain}${api}`;

         let request = {
            dbfind:     { 'id': entry.id },
            dbupdate:   { '$set': {
               title:         entry.title,
               description:   entry.description,
               image:         entry.image,
               product_type:  entry.product_type,
               pc_type:       entry.pc_type,
               target_user:   entry.target_user,
               time_frame:    entry.time_frame,
               toaster_type:  entry.toaster_type,
               active_status: entry.active_status
            }}
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

            .then( result => {
               console.log('UpdateDiscountEntries(response)', result);
               callback(result.err);
            })

            .catch(function (error) {
               console.log('UpdateDiscountEntries(FAIL(error): ',error);
               return callback(error);
            });
      }
   }

   DeleteDiscountEntries(request, callback) {
      console.log('DeleteDiscountEntries(request): ', request );

      let entries = [];

      setTimeout(() => {
         return callback(false, entries);
      }, 600 );
   }

   GetEntriesParseLocally(request, callback) {
      console.log('GetAllEntriesParseLocally(request): ', request );

      if( this.sourceMode === SourceMode.debug) {

         this.parseResults(request, DiscountEntries, (err,results) => {

            setTimeout(() => {
               return callback(err, results);
            }, 600 );
         });
      }
      else {

         let domain  = 'http://localhost:1437/';
         let api     = 'get-all-discount-entries';
         let pathUrl = `${domain}${api}`;

         // real call to server to add entry

         fetch(pathUrl)

             .then(res => res.json())

             .then(result => {

                console.log('ReadDiscountEntries(entries): ', result );

                if(result.err) {
                   return callback(result.err);
                }

                this.parseResults(request, result.value, (err,list) => {

                   setTimeout(() => {
                      return callback(err, list);
                   }, 600 );
                });
             })

             .catch(function (err) {
                console.log('Request(ReadDiscountEntries()) FAILED', err.message );
                return callback(err);
             });
      }
   }

   // ------------------------------------------------------------------ support functions

   // https://github.com/github/fetch/issues/256
   wrapUrlParams(params) {

      //var params = {
      //   parameter1: 'value_1',
      //   parameter2: 'value 2',
      //   parameter3: 'value&3'
      //};

      //fetch("http://www.abx.com?params=2&y=3")

      //import queryString from 'query-string'
      //fetch(`/some/url/path/?${queryString.stringify(params)}`)

      //const params = { a: 'foo', b: 'bar' };
      //const urlParams = new URLSearchParams(Object.entries(params));
      //fetch('/some/url?' + urlParams);  // can use .toString() if you want to be explicit

      let esc = encodeURIComponent;
      let query = Object.keys(params)
          .map(k => `${esc(k)}=${esc(params[k])}`)
          .join('&');

      return query;
   }

   parseInput(request, entries, callback) {
      console.log('parseInput(request): ', request );

      //let entries = DiscountEntries; // clone

      let requestKeys = Object.keys(request);

      if ( !requestKeys.hasOwnProperty(EntriesName.title) &&
          !requestKeys.hasOwnProperty(EntriesName.description)) {
         return callback(false, entries );
      }

      let results = [];

      for( let i = 0; i < entries.length; i++ ) {

         let entry = entries[i];

         if(entry[EntriesName.title].indexOf(request[EntriesName.title]) > -1 ||
             entry[EntriesName.description].indexOf(request[EntriesName.description]) > -1) {

            results.push(entry);
         }
      }

      return callback(false, results);
   }

   parseSelect(request, callback) {
      console.log('parseSelect(request): ', request );
   }

   parseResults(request, discountEntries, callback) {
      console.log('parseResults(request): ', request );

      let results = [];

      let entries = this.common.cloneObject(discountEntries) ; // clone

      let requestKeys = Object.keys( request );//Object.keys( this.common.cloneObject(request));
      let len_requestKeys = request[EntriesName.title] ? requestKeys.length - 1 : requestKeys.length;


      for( let i = 0; i < entries.length; i++ ) {

         let entry = entries[i];
         let equal_select = 0;
         let equal_input  = 0;

         for( let j = 0; j < len_requestKeys; j++ ) {

            let reqKey     = requestKeys[j];
            let reqValue   = request[reqKey];
            let entryValue = entry[reqKey];

            if(reqKey === EntriesName.title || reqKey === EntriesName.description ) {

               if(entryValue.indexOf(reqValue) > -1 ) {
                  equal_input++;
               }
            }
            else if (entryValue === reqValue) {
               equal_select++;
            }

            //if (entryValue === reqValue) {
            //   index_equal++;
            //}
         }

         if(equal_input + equal_select >= len_requestKeys) {
            results.push(entry);
         }

         equal_input  = 0;
         equal_select = 0;
      }

      //if ( !request.hasOwnProperty(EntriesName.title) &&
      //     !request.hasOwnProperty(EntriesName.description)) {
      //   return callback(false, results );
      //}
      //else {
      //   entries = results.length > 0 ? results : entries;
      //   this.parseInput(request, entries, (err, res) => {
      //      callback(err, res);
      //   });
      //}

      return callback(false, results);
   }
}

export default ServerProxy;
