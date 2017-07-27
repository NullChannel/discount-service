/**
 * Created by talnax on 5/12/17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import store from './Common/AppDataStore'
import dataStore from './Common/DataStore'

import './styles/icomoon.css';
import './index.css';

ReactDOM.render( <App />, document.getElementById('root'));

// getElementById	            id	-	везде
// getElementsByName	         name	-	везде
// getElementsByTagName	      тег или '*'	✔	везде
// getElementsByClassName	   классу	✔	кроме IE8-
// querySelector	            CSS-селектор	✔	везде
// querySelectorAll	         CSS-селектор	✔	везде

/*
import React from 'react';
import ReactDOM         from 'react-dom';
import { Provider }     from 'react-redux';
import { createStore }  from 'redux';

import App from './App';
//import {appStore} from "./Common/AppStore";

import './styles/icomoon.css';
import './index.css';


function reducer( state = [], action = 'ADD_ENTRY' ) {
   state = state || [];

   if(action.type === 'ADD_ENTRY') {
      return [
         ...state,
         action.payload
      ]
   }

   return state;
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById('root')
);
*/
