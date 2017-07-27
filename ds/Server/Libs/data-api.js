/**
 * Created by talnax on 6/14/2017.
 */

"use strict";

const   msgback   = require('./msgback'),
        mongoApi  = require('./mongo-api'),
        modes     = require('./modes'),
        crypto    = require('crypto');

exports.addNewDiscountEntry = function(dbRequest, mongoDB, callback ) {

    let msgBack = new msgback(callback);

    try {

        let checkData = {
            collection: dbRequest.collection,

            request : {
                title:       dbRequest.request.title,
                description: dbRequest.request.description
            }
        };

        mongoApi.dbFindItems(checkData, mongoDB, msg => {
            if(msg.err) {

                msgBack.setMessage( true, {
                    status: modes.DataMode.data_error,
                    value: msg.param
                });

                return msgBack.callBack();
            }
            else {
                if(msg.param.length > 0) {
                    msgBack.setMessage( false, {
                        status: modes.DataMode.data_exist,
                        value: null
                    });

                    return msgBack.callBack();
                }
                else {

                    mongoApi.dbAddItem (dbRequest, mongoDB, msg => {

                        if(msg.err) {
                            msgBack.setMessage( true, {
                                status: modes.DataMode.data_error,
                                value: null
                            });
                            return msgBack.callBack();
                        }

                        msgBack.setMessage( false, {
                            status: modes.DataMode.data_set_new,
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
            status: modes.DataMode.service_fail,
            value: error
        });

        msgBack.callBack();
    }

}
