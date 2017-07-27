/**
 * Created by talnax on 5/13/17.
 */

import React, { Component }            from 'react';
import Common, { SourceMode,
                 ListEntriesOptions }  from './../../Common/Common';
import ButtonStandard                  from './../Controls/ButtonStandard';
import ToasterCtrl                     from './../Controls/ToasterCtrl';
import ServerProxy                     from './../../Emulators/Server/ServerProxy';
import { DataProxyEntries }            from './../../Emulators/Server/DataProxy';
import { DataMode }                    from '../../../Server/Libs/modes';
import dataStore                       from '../../Common/DataStore';

import './../../styles/DiscountForm.css';

class DiscountForm extends Component {

   constructor(props) {
      super(props);

      this.server = new ServerProxy();

      this.common = new Common();

      this.sourceMode = SourceMode.debug;

      this.dataStore = dataStore;

      this.DataProxyEntries = DataProxyEntries;

      this.state = {
         id:            '4f661075-ffb1-45fb-8d4e-0023039b3d60',
         title:         'Discount 10% for HP Envy x360 Convertible Laptop',
         description:   'Fast - Attractive Design - Long Battery Life - Quality Display',
         image:         '',
         product_type:  'laptop',
         pc_type:       'business',
         target_user:   'gamer',
         time_frame:    '9/15/2017',
         toaster_type:  'footer-buy',
         active_status: 'inactive'
      };

      this.placeholder = this.common.cloneObject(this.state);  // let clone = Object.clone(original);
      this.placeholder.image = 'http://welcome.hp-ww.com/.../Module5_elite-x2-20170522.jpg';

      this.handleSubmit  = this.handleSubmit.bind(this);
      this.handleChange  = this.handleChange.bind(this);
   }

   handleChange(e) {

      console.log('handleChange(e.target.name, e.target.value)= ', e.target.name, e.target.value);

      event.preventDefault();

      let target_name = [e.target.name][0];

      if((target_name === 'title' || target_name === 'description') && e.target.value === '' ) {
         let result = this.placeholder[e.target.name];
         this.setState({[e.target.name]: result });
      }
      else {
         this.setState({ [e.target.name]: e.target.value });
      }
   }

   checkEntry(entry) {
      console.log('checkEntry(): ', entry);

      for( let item in entry) {
         if(entry[item] === '') {
            console.log(`Entry -->${item}<-- don't feel and = ${entry[item]}`);
            return false;
         }
      }

      return true;
   }

   handleSubmit(event) {

      console.log('handleSubmit(): ', event);

      event.preventDefault();

      // get all values of input

      //let sm = this.sourceMode === SourceMode.debug;
      let sm = this.sourceMode === SourceMode.release;

      let entry = {};

      if(!sm) {
         entry = {
            id:                this.state.id,
            // title:             sm ?  this.state.title :        this.refs.title.value,
            // description:       sm ?  this.state.description :  this.refs.description.value,
            // image:             sm ?  this.placeholder.image :  this.refs.image.value,
            title:             this.refs.title.value,
            description:       this.refs.description.value,
            image:             this.refs.image.value,

            id_person:         this.dataStore.user.id_person,

            product_type:      this.refs.product_type.value,
            pc_type:           this.refs.pc_type.value,
            target_user:       this.refs.target_user.value,
            active_status:     this.refs.active_status.value,
            time_frame:        this.refs.time_frame.value,
            toaster_type:      'footer-buy',

            user_action: {
               settings: 0,
               cancel: 0,
               buys:   0,
               ignores: 0
            }
         }
      }
      else {
         entry = this.DataProxyEntries[5];
         entry['id_person'] = this.dataStore.user.id_person;
         entry['user_action'] = {
            settings: 0,
            cancel: 0,
            buys:   0,
            ignores: 0
         };
      }

      // check all values

      if(!this.checkEntry(entry)) {
         alert("You don't feel all entry");
         return;
      }

      this.props.showProgressBar(true);

      this.server.AddDiscountEntry(entry,(err, status, value) => {

         this.props.showProgressBar(false);

         if(err) {
            return alert('Add New DiscountEntry Fail...');
         }

         if(status === DataMode.data_exist) {
            return alert('DiscountEntry with this params already exist...');
         }

         if(status !== DataMode.data_set_new) {
            return alert('Server Failing Add New DiscountEntry...');
         }

         this.props.handleCreateDiscount(entry);
      });
   }

   generateSelectOptions(keyName) {
      console.log('TableEntries.generateSelectOptions()');

      let own = this;

      return (
         ListEntriesOptions[keyName].map( item => {
            return <option key={own.common.GUID()} value={item}>{item}</option>;
         }));
   }

   generateSelectNode(keyNameBusiness, keyNameInternal) {

      return (
          <div className="list-separator">
             <span>{keyNameBusiness}</span>
             <div className='border-for-select'>
                <select name={keyNameInternal} ref={keyNameInternal}  >

                   {
                      this.generateSelectOptions(keyNameInternal)
                   }

                </select>
             </div>
          </div>
      );
   }

   render() {

      let own = this;

      return (

         <div className="discount-section">

            <form className="discount-form" onSubmit={this.handleSubmit}>
               <span>Title</span>
               <input type="text"
                      ref="title"
                      name="title"
                      onChange={this.handleChange}
                      placeholder={this.placeholder.title} />

               <span>Description</span>
               <input type="text"
                      ref="description"
                      name="description"
                      onChange={this.handleChange}
                      placeholder={this.placeholder.description} />

                <span>Image URL</span>
                <input type="text"
                       ref="image"
                       name="image"
                       onChange={this.handleChange}
                       placeholder={this.placeholder.image} />

                <div className="list-box-entries">

                   {this.generateSelectNode('Product Type', 'product_type')}

                   {this.generateSelectNode('PC Type', 'pc_type')}

                   {this.generateSelectNode('Target User', 'target_user')}

                   {this.generateSelectNode('Active Status', 'active_status')}

                   <div className="list-separator">
                     <span>Time Frame</span>
                     <input type="date" ref="time_frame"/>
                  </div>

                </div>

               <ButtonStandard type="submit"
                               id={'id-discount-button-submit'}
                               buttonName={'Submit'}/>

            </form>

            <ToasterCtrl title={this.state.title}
                         description={this.state.description}
                         image={this.state.image} />

         </div>
      );
   }
}

export default DiscountForm;


