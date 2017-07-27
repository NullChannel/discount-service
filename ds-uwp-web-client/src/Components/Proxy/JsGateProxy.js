/**
 * Created by talnax on 7/14/2017.
 */

import Common, { SourceMode, ProductionType } from '../Common/Common';
import appStore from '../Common/AppStore';

export default class JsGateProxy {

    constructor() {
        this.appStore = appStore;
    }

    getUserUID(callback) {
        if(ProductionType === SourceMode.debug) {
            return callback(false, 'f4972087-59fa-425c-9821-130fe74a9052');
        }
        else {
            // call jsgate
        }
    }

    getAppCountLaunches() {
        if(ProductionType === SourceMode.debug) {
            return 0;   // first time
            //return 1;   // more than first time
        }
        else {
            // call jsgate
        }

    }
}