/**
 * Created by talnax on 7/23/17.
 */

// 1. constructor
// 2. componentWillMount
// 3. render
// 4. componentDidMount

import React, { Component } from 'react';
import Common, { DiscountPanels, ProductionType, SourceMode } from './../Common/Common';
import ServerProxy  from './../Proxy/ServerProxy';

import ButtonStandard  from './../Controls/ButtonStandard';
import ProgressBarCtrl  from './../Controls/ProgressBarCtrl';

import './../../Styles/SearchPanel.css';


export default class SearchPanel extends Component {
   
   constructor( props ) {
      super( props );
      
      this.common = new Common();

      this.serverProxy = new ServerProxy();
      
      //this.poxyOnClickSearch = this.proxyOnClickSearch.bind(this);

      this.state = {
         searchSection: true,
         progressBarSection: false,
         searchResultSection: false
      }
   }

   /**
    * handleSearch() event
    * Get value of user input in search-text-box
    *
    * @param e - event handler
    * @return send request to server
    */
   handleSearch(e) {
      console.log('SearchPanel.handleSearchProxy()');

      if(ProductionType === SourceMode.debug) {
         this.refs.search_value.value = 'Laptop';
      }

      if(this.refs.search_value.value !== '' ) {
         
         // 1. show 'ProgressBar
         // 2. send request to server
         // 3. get Response
         // 4. show result

         return this.sendServerRequest(this.refs.search_value.value);
      }
      else {
         alert('Please feel search value');
      }
   }

   /**
    * sendServerRequest() function
    * 1. show 'ProgressBar
    * 2. send request to server
    * 3. get Response
    * 4. show result
    * 5. hide "ProgressBar"
    *
    * @param search_value - user value of search in text-box
    * @return none
    */
   sendServerRequest(search_value) {

      // show 'ProgressBar'
      this.setState({
         searchSection: false,
         progressBarSection: true,
         searchResultSection: false
      });

      // send request to server
      this.serverProxy.GetDiscountsSearchResult(search_value, (err, status, results) => {

         // hide "ProgressBar"

         if(err) {

            return this.setState({
               searchSection: true,
               progressBarSection: false,
               searchResultSection: false
            });
         }

         // show result

         return this.setState({
            searchSection: false,
            progressBarSection: false,
            searchResultSection: true
         });

      });
   }

   /**
    * showSearchSection() function
    * show only search-section
    *
    * @param - none
    * @return - send html content
    */
   showSearchSection() {

     return (

         <div className="search-section">

            <div className="search-separator">
               <div className="search-title">Search Discount For :</div>
               <input className='search-input'
                      type="text"
                      ref="search_value"
                      name="search_value"
                      placeholder='example: laptop 15%'/>
            </div>

            <ButtonStandard type="submit"
                            style={this.styles_filter_button}
                            id={'id-search-button'}
                            onBtnClick={this.handleSearch.bind(this)}
                            buttonName={'Search'}/>

         </div>
     )
   }

   /**
    * showProgressBarSection() function
    * show only progress-bar-section
    *
    * @param - none
    * @return - send html content
    */
   showProgressBarSection() {

      return (

          <div className="search-section">
             <ProgressBarCtrl />
          </div>
      )
   }

   /**
    * showSearchSection() function
    * show only search-result-section
    *
    * @param - none
    * @return - send html content
    */
   showSearchResultSection() {

      return (

          <div className="search-section">

          </div>
      )
   }

   getRenderValue() {

      if(this.state.searchSection) {
         return this.showSearchSection();
      }
      else if( this.state.progressBarSection) {
         return this.showProgressBarSection();
      }
      else {
         return this.showSearchResultSection();
      }
   }

   render() {

      this.styles_filter_button = {
         // height:'39px',
         // backgroundColor: 'gray',
         // border: '1px solid gray'
         fontSize:   '18px',
         marginTop:  '63px',
         fontFamily: 'RalewayLight'
      };

      return (

         <div className="search-panel">

            {
                this.getRenderValue()
            }

         </div>

      )
   }
}

