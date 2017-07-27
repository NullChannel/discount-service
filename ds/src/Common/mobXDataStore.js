/**
 * Created by talnax on 6/14/17.
 */

// http://bjeld.com/tips/quick-fix-for-enabling-decorators-with-create-react-app-without-ejecting/
// https://swizec.com/blog/mobx-with-create-react-app/swizec/7158

/*
How to get decorators in create-react-app
Ok, so here’s what you do when setting up a new React app:

1) Run create-react-app. This creates a new app with the official configuration.

2) Run npm run eject. This moves files around and makes your app’s configuration accessible.

3) Run npm install --saveDev babel-plugin-transform-decorators-legacy.
   This installs the Babel plugin for decorators. It’s called legacy even though it’s a feature from the far future.

4) Open package.json, find the "babel" section (line 78 for me), and add 4 lines so it looks like this:

"babel": {
   "plugins": [
      "transform-decorators-legacy"
   ],
       "presets": [
      "react-app"
   ]
},
5) Run npm install --save mobx mobx-react. This installs MobX.
*/

//npm install --save mobx mobx-react
//
//npm install --saveDev babel-plugin-transform-decorators-legacy
//npm install --saveDev babel-plugin-transform-class-properties

import { autorun, observable } from 'mobx';

class AppDataStore {
   @observable user = "Rost"
   @observable filter = ""
}

var store = window.store = new AppDataStore();

export  default store;

autorun(() => {
   console.log(store.filter);
   console.log(store.user);
});
