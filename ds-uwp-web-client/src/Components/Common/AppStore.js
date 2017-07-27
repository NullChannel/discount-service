/**
 * Created by talnax on 7/17/2017.
 */

let daInstance = null;

class AppStore {

    constructor() {

        if(!daInstance){
            daInstance = this;
        }

        this._user = {};

        this._userProfile = {};

        this._callbacks = [];

        return daInstance;
    }

    //static getInstance() {
    //   if( daInstance === null ) {
    //      daInstance = new DataStore();
    //      return daInstance;
    //   }
    //   return daInstance;
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

    get userProfile() {
        return this._userProfile;
    }

    set userProfile(userProfile) {
        this._userProfile = userProfile;
        this.update();
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
}

const appStore = new AppStore();
export default appStore;
