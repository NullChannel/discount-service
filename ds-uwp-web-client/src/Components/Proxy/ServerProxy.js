/**
 * Created by talnax on 7/14/2017.
 */

import Common, { SourceMode, ProductionType, UserMode, DataMode } from '../Common/Common';
import appStore from '../Common/AppStore';
import { DataProxy } from './DataProxy';

export default class ServerProxy {

    constructor() {
        this.sourceMode = SourceMode.debug;
        this.appStore = appStore;
    }

    /**
     * logInUser() function
     *
     * @param -
     * @return -
     */
    logInUser(user_id, callback) {
        //if(this.sourceMode === SourceMode.debug) {
        if(ProductionType === SourceMode.debug) {
            setTimeout(() => {
                return callback(false, UserMode.user_exist, 'f4972087-59fa-425c-9821-130fe74a9052');
            }, 1000);
        }
        else {
            // call server
        }
    }

    /**
     * setUserProfile() function
     *
     * @param -
     * @return -
     */
    setUserProfile(user_id, callback) {
        //if(this.sourceMode === SourceMode.debug) {
        if(ProductionType === SourceMode.debug) {
            setTimeout(() => {
                return callback(false, UserMode.profile_exist, {
                    laptop: false,
                    printer: false,
                    desktop: false,
                    monitor: false,
                    accessories: true,
                    multimedia: false
                });
            }, 500);
        }
        else {
            // call server
        }
    }

    /**
     * getUserProfile() function
     *
     * @param -
     * @return -
     */
    getUserProfile(user_id, callback) {
        //if(this.sourceMode === SourceMode.debug) {
        if(ProductionType === SourceMode.debug) {
            setTimeout(() => {
                return callback(false, UserMode.profile_exist, {
                    laptop: false,
                    printer: false,
                    desktop: false,
                    monitor: false,
                    accessories: true,
                    multimedia: false
                });
            }, 500);
        }
        else {
            // call server
        }
    }

    /**
     * getUserProfile() function
     *
     * @param -
     * @return -
     */
    GetDiscountsSearchResult(search_for, callback) {

        if(ProductionType === SourceMode.debug) {

            setTimeout(() => {

               let results = DataProxy.filter(item => {
                  if(item.title.indexOf(search_for) > -1) {
                     return item;
                  }
                  if(item.description.indexOf(search_for) > -1) {
                     return item;
                  }
               });

                return callback(false, DataMode.data_exist, results);

            }, 1000);
        }
        else {
            // call server
        }
    }
}
