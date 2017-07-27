/**
 * Created by talnax on 5/15/17.
 */

"use strict";

import React, { Component }   from 'react';
import SearchEntries          from './SearchEntries';
import GraphEntries           from './GraphEntries';
import Common, { SourceMode } from '../../Common/Common';
import ProgressBarCtrl        from './../Controls/ProgressBarCtrl';
import ServerProxy            from './../../Emulators/Server/ServerProxy';

import dataStore              from '../../Common/DataStore';

import './../../styles/DiscountStatistics.css';

class DiscountStatistics extends Component {

   constructor(props) {
      super(props);

      this.state = {};

      this.dataStore = dataStore;

      this.state = {
         showProgressBar:  false,
         isEntryLoaded:    false,
         entries:          [],
         d3Data:           null
      };

      this.common = new Common();
      this.server = new ServerProxy();

      this.defaultRequest = {};

      this.handleFilter  = this.handleFilter.bind(this);
   }

   handleFilter(request) {
      console.log('DiscountStatistics.handleSearch()');

      this.defaultRequest = request;

      this.loadEntries(request);
   }

   getUserActionValues(entries) {

      if(entries.length > 0) {

         // let analysisData = entries.map( entry => {
         //    if(entry.hasOwnProperty('user_action')) {
         //       return entry.user_action;
         //    }
         // });

         let analysisData = [];
         entries.forEach( entry => {
            if(entry.hasOwnProperty('user_action')) {
               analysisData.push(entry.user_action);
            }
         });

         if( analysisData.length > 0 ) {

            let d3Data = {
               //actions: ['settings', 'cancel', 'buys'],
               actions: [],
               values: []
            };

            let groupValueExist = false;

            analysisData.forEach( item => {

               let index = 0;

               for( let key in item ) {

                  if( !d3Data.actions.includes(key)) {
                     d3Data.actions.push(key);
                  }

                  if(!groupValueExist) {
                     d3Data.values.push(item[key])
                  }
                  else {
                     d3Data.values[index] += item[key];

                     index++;
                  }
               }
               groupValueExist = true;
            });

            return d3Data;
         }
         else {
            return null;
         }
      }
      else {
         return null;
      }
   }

   updateUI(showProgressBar,isEntryLoaded,entries) {

      this.setState({
         showProgressBar:  showProgressBar,
         isEntryLoaded:    isEntryLoaded,
         entries:          entries,
         d3Data:           this.getUserActionValues(entries)
      });
   }

   loadEntries(request) {
      console.log('DiscountEntries.loadEntries()');

      this.updateUI(true,false,[]);

      this.server.GetDiscountEntries(request, (err, entries) => {

         if(err)  {

            this.updateUI(false,false,[]);
         }
         else {
            console.log('DiscountEntries.GetDiscountEntries(): ', entries);

            if(!entries || entries.length === 0) {

               this.updateUI(false,false,[]);
            }
            else {
               this.updateUI(false,true,entries);
            }
         }
      });
   }

   getRenderValue() {
      console.log('DiscountStatistics.getRenderValue()');

      let functionality = '';

      if(this.state.showProgressBar) {

         functionality =
             <div className="discount-statistics">
                <ProgressBarCtrl />
             </div>
      }
      // else if(this.state.isEntryLoaded === false && this.state.entries.length === 0 ) {
      //
      //    functionality =
      //        <div className="discount-statistics">
      //           <SearchEntriesPanel defaultRequest={this.defaultRequest} handleFilter={this.handleFilter} />
      //        </div>
      // }
      else if(this.state.d3Data !== null) {

         functionality =
             <div className="discount-statistics">
                <SearchEntries defaultRequest={this.defaultRequest} handleFilter={this.handleFilter} />
                <GraphEntries d3Data={this.state.d3Data} />
             </div>
      }
      else {

         functionality =
            <div className="discount-statistics">
               <SearchEntries defaultRequest={this.defaultRequest} handleFilter={this.handleFilter} />
            </div>
      }

      return functionality;
   }

   render() {

      return (
          this.getRenderValue()
      );
   }
}

export default DiscountStatistics;



