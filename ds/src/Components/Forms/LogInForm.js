/**
 * Created by talnax on 5/15/17.
 */


import React, { Component }   from 'react';
import ButtonStandard         from './../Controls/ButtonStandard';
import Common, { SourceMode } from '../../Common/Common';
import { UserMode }           from '../../../Server/Libs/modes';
import ServerProxy            from './../../Emulators/Server/ServerProxy';
import dataStore              from '../../Common/DataStore';

import './../../styles/LogInForm.css';

class LogInForm extends Component {

   constructor(props) {
      super(props);

      this.sourceMode = SourceMode.debug;

      this.dataStore = dataStore;

      this.state = {
         email:      'john.mckinley@mail.com',
         password:   'qqq'
      };

      this.server  = new ServerProxy();

      this.handleSubmit  = this.handleSubmit.bind(this);
      this.handleChange  = this.handleChange.bind(this);
   }

   handleChange(event) {
      console.log('LogInForm.handleChange(): ', event);
   }

   getValues() {
      "use strict";

      let mode = this.sourceMode === SourceMode.debug;

      let result = {
         email:     mode ? this.state.email    : this.refs.email.value,
         password:  mode ? this.state.password : this.refs.password.value
      };

      // check email format

      for( let key in result ) {
         if(result[key] === '')
            return null;
      }

      return result;
   }

   handleSubmit(event) {
      event.preventDefault();

      console.log('LogInForm.handleSubmit(): ', event);

      // get all values of input

      let result = this.getValues();
      if(!result) return alert('Password or eMail is incorrect...');

      // make login

      this.props.showProgressBar(true);

      this.server.logInUser(result.email, result.password, (err, status, value) => {

         this.props.showProgressBar(false);

         if(err) {
            return alert('Login Fail...');
         }

         if(status === UserMode.user_not_exist) {
            return alert('User with this credential not exist...');
         }

         this.dataStore.user = value;

         this.props.handleLogIn(true, value);
      });
   }

   render() {
      return (
         <form className="login-form" onSubmit={this.handleSubmit}>
            <span>eMail:</span>
            <input type="text"
                   ref="email"
                   placeholder='Insert your email' />

            <span>Password:</span>
            <input type="password"
                   ref="password"
                   placeholder='Insert your password' />

            <ButtonStandard type="submit"
                            id={'id-registration-button-submit'}
                            buttonName={'Submit'}/>
         </form>
      );
   }
}

export default LogInForm;
