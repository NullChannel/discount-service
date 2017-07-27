/**
 * Created by talnax on 6/12/2017.
 */

"use strict";

const   msgback   = require('./msgback'),
        mongoApi  = require('./mongo-api'),
        modes     = require('./modes'),
        crypto    = require('crypto');

// register new user to db.
exports.registerUser = function(dbRequest, mongoDB, callback ) {

    let msgBack = new msgback(callback);

    try {

        let checkUser = {
            collection: dbRequest.collection,

           request : {
              first_name: dbRequest.request.first_name,
              last_name:  dbRequest.request.last_name,
              email:      dbRequest.request.email
           }
        };

        mongoApi.dbFindItems(checkUser, mongoDB, msg => {
            if(msg.err) {

                msgBack.setMessage( true, {
                    status: modes.UserMode.user_error,
                    value: msg.param
                });

                return msgBack.callBack();
            }
            else {
                if(msg.param.length > 0) {
                    msgBack.setMessage( false, {
                        status: modes.UserMode.user_exist,
                        value: null
                    });

                    return msgBack.callBack();
                }
                else {

                   var passwordData = getSaltHashPassword(dbRequest.request['password']);
                   dbRequest.request['password'] = passwordData.passwordHash;
                   dbRequest.request['salt']     = passwordData.salt;

                   mongoApi.dbAddItem (dbRequest, mongoDB, msg => {

                        if(msg.err) {
                            msgBack.setMessage( true, {
                                status: modes.UserMode.user_error,
                                value: null
                            });
                            return msgBack.callBack();
                        }

                        msgBack.setMessage( false, {
                            status: modes.UserMode.user_register,
                            value: dbRequest.request
                        });

                        return msgBack.callBack();
                    });
                }
            }
        });
    }
    catch(err) {

        let error = `CATCH(authentication.registerUser())' + ${err}`;
        console.log( error );

        msgBack.setMessage( true, {
            status: modes.UserMode.service_fail,
            value: error
        });

        msgBack.callBack();
    }
};

// register new user to db.
exports.logInUser = function(dbRequest, mongoDB, callback ) {

    let msgBack = new msgback(callback);

    try {

        let checkUser = {
            collection: dbRequest.collection,

            request : {
                email: dbRequest.user.email
            }
        };

        mongoApi.dbFindItems(checkUser, mongoDB, msg => {
            if(msg.err) {
                msgBack.setMessage( true, {
                    status: modes.UserMode.user_error,
                    value: msg.param
                });
                return msgBack.callBack();
            }
            else {
                if(msg.param.length === 0) {

                    msgBack.setMessage( false, {
                        status: modes.UserMode.user_not_exist,
                        value: null
                    });

                    return msgBack.callBack();
                }
                else {
                    var dbUser = msg.param[0];

                    let res = this.checkUserFromDB(dbRequest.user, dbUser);

                    let message = !res ? modes.UserMode.user_not_exist : modes.UserMode.user_exist;

                    msgBack.setMessage( false, {
                        status: modes.UserMode.user_register,
                        value: dbUser
                    });

                    return msgBack.callBack();
                }
            }
        });
    }
    catch(err) {

        let error = `CATCH(authentication.logInUser())' + ${err}`;
        console.log( error );

        msgBack.setMessage( true, {
            status: modes.UserMode.service_fail,
            value: error
        });

        msgBack.callBack();
    }
};

exports.checkUserFromDB = function( requestUser, dbUser  ) {
    try {
        var passwordData = sha512( requestUser['password'], dbUser['salt'] );

        return dbUser['password'] === passwordData.passwordHash;

        //if( dbUser['password'] === passwordData.passwordHash ) {
        //    return true;
        //}
        //
        //return false;
    }
    catch(err) {
        console.log('CATCH(check_user_from_db())' + err );
        return false;
    }
};

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')     // convert to hexadecimal format
        .slice(0,length);    // return required number of characters
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); // Hashing algorithm sha512
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function getSaltHashPassword( password ) {

    var salt = genRandomString(16); // Gives us salt of length 16

    var passwordData = sha512( password, salt );

    //console.log( 'UserPassword = ' + userpassword );
    //console.log( 'Passwordhash = ' + passwordData.passwordHash );
    //console.log( '\nSalt = ' + passwordData.salt );

    return passwordData;
}