/**
 * Created by talnax on 6/12/2017.
 */

"use strict";


const UserMode = {
    user_error:     0,
    user_not_exist: 1,
    user_exist:     2,
    user_register:  3,
    user_login:     4,
    user_logout:    5,
    user_psw_fail:  6,
    service_fail:   7
};

const DataMode = {
    data_error:     0,
    data_not_exist: 1,
    data_exist:     2,
    data_corrupt:   3,
    data_set_new:   4,
    data_updated:   5,
    service_fail:   6
};

// ----------------------------------------------------------------- Share data between node.js and client *.js
if ( typeof exports !== "undefined" && exports !== null ) {
    if (typeof module !== 'undefined' && module.exports) {
        exports.UserMode = UserMode;
        exports.DataMode = DataMode;
    }
}
