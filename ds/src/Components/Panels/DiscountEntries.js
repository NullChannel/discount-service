/**
 * Created by talnax on 5/19/17.
 */

"use strict";

// React create table: http://jsfiddle.net/jhudson8/dahdx6eu/

// 1. constructor
// 2. componentWillMount
// 3. render
// 4. componentDidMount

import React, { Component }   from 'react';
import TableEntries           from './TableEntries';
import SearchEntries          from './SearchEntries';
import Common, { SourceMode } from '../../Common/Common';
import ProgressBarCtrl        from './../Controls/ProgressBarCtrl';
import ServerProxy            from './../../Emulators/Server/ServerProxy';

import dataStore              from '../../Common/DataStore';

import './../../styles/DiscountEntries.css';

class DiscountEntries extends Component {

   constructor(props) {
      super(props);

      this.dataStore = dataStore;

      this.state = {
         showProgressBar:  false,
         isEntryLoaded:    false,
         entries:          []
      };

      this.common = new Common();
      this.server = new ServerProxy();

      this.defaultRequest = {};

      this.handleFilter  = this.handleFilter.bind(this);
      this.handleUpdate  = this.handleUpdate.bind(this);
   }

   componentWillMount() {
      console.log('DiscountEntries.componentWillMount()');
   }

   componentDidMount() {
      console.log('DiscountEntries.componentDidMount()');
      //setTimeout( this.loadEntries(), 0);
   }

   handleFilter(request) {
      console.log('DiscountEntries.handleSearch()');

      this.defaultRequest = request;

      this.loadEntries(request);
   }

   handleUpdate(entry) {

      let entries = this.state.entries.map( item => {
         if( item.id === entry.id ) {
            return entry;
         }
         return item;
      });

      this.updateUI(true,false,[]);

      this.server.UpdateDiscountEntries(entry, (err, res) => {

         //this.setState({ showProgressBar:  false});

         if(err)  {
            return this.updateUI(false,false,[]);
         }

         this.updateUI(false,true,entries);
      });
   }

   loadEntries(request) {
      console.log('DiscountEntries.loadEntries()');

      this.updateUI(true,false,[]);

      //this.server.GetEntriesParseLocally(request, (err, entries) => {
      this.server.GetDiscountEntries(request, (err, entries) => {

         if(err)  {
            return this.updateUI(false,false,[]);
         }

         console.log('DiscountEntries.GetDiscountEntries(): ', entries);

         if(!entries || entries.length === 0) {
            this.updateUI(false,false,[]);
         }
         else {
            this.updateUI(false,true,entries);
         }
      });
   }

   updateUI(showProgressBar,isEntryLoaded,entries) {
      this.setState({
         showProgressBar:  showProgressBar,
         isEntryLoaded:    isEntryLoaded,
         entries:          entries
      });
   }

   getRenderValue() {
      console.log('DiscountEntries.getRenderValue()');

      let functionality = '';

      if(this.state.showProgressBar) {

         functionality =
            <div className="discount-entries">
               <ProgressBarCtrl />
            </div>
      }
      else if(this.state.isEntryLoaded === false && this.state.entries.length === 0 ) {

         functionality =
            <div className="discount-entries">
               <SearchEntries defaultRequest={this.defaultRequest} handleFilter={this.handleFilter} />
            </div>
      }
      else {

         functionality =
            <div className="discount-entries">
               <SearchEntries defaultRequest={this.defaultRequest} handleFilter={this.handleFilter} />
               <TableEntries entries={this.state.entries} handleUpdate={this.handleUpdate} />
            </div>
      }

      return functionality;
   }

   render() {

      return (
         this.getRenderValue()
      )
   }
}

export default DiscountEntries;
