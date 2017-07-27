/**
 * Created by talnax on 5/28/17.
 */

import React, { Component }            from 'react';
import Common, { ListEntriesOptions }  from './../../Common/Common';
import IconButton             from './../Controls/IconButton';
import ButtonStandard         from './../Controls/ButtonStandard';

import './../../styles/SearchEntries.css';


//const SearchEntriesPanel = (props) => {
class SearchEntries extends Component {

   constructor(props) {
      super(props);

      this.common = new Common();

      //style={{height:'36px'}}
      this.styles_filter_button = {
         height:'39px',
         backgroundColor: 'gray',
         border: '1px solid gray'
      };
   }

   getAllValues() {

      let result = {};
      let empty  = '---';

      if(this.refs.product_type.value !== empty ) {
         result.product_type = this.refs.product_type.value;
      }
      if(this.refs.pc_type.value !== empty ) {
         result.pc_type = this.refs.pc_type.value;
      }
      if(this.refs.target_user.value !== empty ) {
         result.target_user = this.refs.target_user.value;
      }
      if(this.refs.active_status.value !== empty ) {
         result.active_status = this.refs.active_status.value;
      }
      if(this.refs.title_description.value !== '' ) {
         result.title = this.refs.title_description.value;
         result.description = this.refs.title_description.value;
      }

      return Object.keys(result).length > 0 ? result : null;
   }

   handleFilterProxy(e) {
      console.log('SearchEntries.handleFilter()');

      let request = this.getAllValues();

      if(request) {
         this.props.handleFilter(request);
      }
   }

    handleChange(e) {
      console.log('SearchEntries.handleChange()');
   }

   //<select name={item} ref={item} defaultValue={value}  >

   generateSelectOptions(keyName) {
      console.log('TableEntries.generateSelectOptions()');

      let own = this;

      return (
          ListEntriesOptions[keyName].map( item => {
             return <option key={this.common.GUID()} value={item}>{item}</option>;
          }));
   }

    generateSelectNode(keyNameBusiness, keyNameInternal) {

      return (
          <div className="search-list-separator">
             <span>{keyNameBusiness}</span>
             <div className='border-for-select'>
                <select name={keyNameInternal} ref={keyNameInternal} defaultValue={this.props.defaultRequest[keyNameInternal]} >

                   {
                      this.generateSelectOptions(keyNameInternal)
                   }

                </select>
             </div>
          </div>
      );
   }

   render() {

      return (

      <div className="search-entries-panel">

         <div className="search-list-box-entries">

            {this.generateSelectNode('Product Type', 'product_type')}

            {this.generateSelectNode('PC Type', 'pc_type')}

            {this.generateSelectNode('Target User', 'target_user')}

            {this.generateSelectNode('Active Status', 'active_status')}

            <div className="search-list-separator">
               <span>Search For</span>
               <input className='search-list-title-description-input'
                      type="text"
                      ref="title_description"
                      name="title_description"
                      placeholder='Title, Description'
                      onChange={this.handleChange.bind(this)} />

            </div>

            <ButtonStandard type="submit"
                            style={this.styles_filter_button}
                            id={'id-search-button-filter'}
                            onBtnClick={this.handleFilterProxy.bind(this)}
                            buttonName={'Filter'}/>

         </div>

      </div>
   )
   }
}

//return (
//   <div className="search-entries-panel"
//        style={ props.style }
//        onClick={onClickProxy}>
//   </div>
//);

//function onClickProxy() {
//   props.onCtrlClick(props.id);
//}

export default SearchEntries;
