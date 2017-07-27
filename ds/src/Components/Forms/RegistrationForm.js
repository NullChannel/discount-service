/**
 * Created by talnax on 5/15/17.
 */

import React, { Component }     from 'react';
import Common, { SourceMode }   from '../../Common/Common';
import { UserMode }             from '../../../Server/Libs/modes';
import ButtonStandard           from './../Controls/ButtonStandard';
import ServerProxy              from './../../Emulators/Server/ServerProxy';

import './../../styles/RegistrationForm.css';

class RegistrationForm extends Component {

   constructor(props) {
      super(props);

      this.common = new Common();

      this.sourceMode = SourceMode.debug; 

      this.state = {
         id_person:  '325629ab-8cd3-4653-97fb-ed2904b553e9',
         first_name: 'John',
         last_name:  'McKinley',
         email:      'john.mckinley@mail.com',
         password:   'qqq'
      };

      this.handleSubmit  = this.handleSubmit.bind(this);
      this.handleChange  = this.handleChange.bind(this);

      this.server  = new ServerProxy();
   }

   handleChange(event) {
      console.log('RegistrationForm.handleChange(): ', event);
   }

    getValues() {

        let mode = this.sourceMode === SourceMode.debug;

        let result = {
            id_person:  mode ? this.state.id_person  : this.common.GUID(),
            first_name: mode ? this.state.first_name : this.refs.first_name.value,
            last_name:  mode ? this.state.last_name  : this.refs.last_name.value,
            email:      mode ? this.state.email      : this.refs.email.value,
            password:   mode ? this.state.password   : this.refs.password.value
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

      console.log('RegistrationForm.handleSubmit(): ', event);
       // get all values of input

       let user = this.getValues();
       if(!user) return alert('One of values is empty or incorrect...');

      // check all values
      // let bRes = CheckValues(user);

       // make registration

      this.props.showProgressBar(true);

      this.server.registerUser(user, (err, status, value) => {

            this.props.showProgressBar(false);

            if(err) {
                return alert('Registration Fail...');
            }

            if(status === UserMode.user_exist) {
                return alert('User with this credential already exist...');
            }

            this.props.handleRegistration(true, value);
      });
   }

   render() {
      return (

      <form className="registration-form" onSubmit={this.handleSubmit}>

            <span>First Name:</span>
            <input type="text"
                   ref="first_name"
                   placeholder={this.state.first_name} />

            <span>Last Name:</span>
            <input type="text"
                   ref="last_name"
                   placeholder={this.state.last_name} />

            <span>eMail:</span>
            <input type="text"
                   ref="email"
                   placeholder={this.state.email} />

            <span>Password:</span>
            <input type="password"
                   ref="password"
                   placeholder={this.state.password} />

            <ButtonStandard type="submit"
                            id={'id-registration-button-submit'}
                            buttonName={'Submit'}/>
         </form>
      );
   }
}

export default RegistrationForm;