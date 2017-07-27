/**
 * Created by talnax on 5/28/17.
 */

import React, { Component }   from 'react';
import Common, { SourceMode } from '../../Common/Common';
import IconBtnCtrl            from './../Controls/IconBtnCtrl';
import TR_TableCtrl           from './../Controls/TR_TableCtrl';
import ProgressBarCtrl        from './../Controls/ProgressBarCtrl';
import ServerProxy            from './../../Emulators/Server/ServerProxy';

import './../../styles/TableEntries.css';

class TableEntries extends Component {

   constructor(props) {
      super(props);

      // this.state = {
      //    showProgressBar:  false,
      //    entries:          this.props.entries
      // };

      // this.state = {
      //    showProgressBar:  false
      // };

      this.common = new Common();

      this.server = new ServerProxy();

      this.excludeColumns = ['id_person', 'user_action'];

      this.updateEntry = this.updateEntry.bind(this);
   }

   updateEntry(entry) {
      console.log('TableEntries.updateEntry()', entry );

      // //let entries = Object.assign({}, this.props.entries );
      // let entries = this.common.cloneObject( this.props.entries );
      //
      // entries.forEach( item => {
      //    if( item.id === entry.id ) {
      //       item = entry;
      //    }
      // });

      // entries.forEach( item => {
      //    if( item.id === entry.id ) {
      //       item = entry;
      //    }
      // });

      this.props.handleUpdate(entry);

      
      /*

      // - update list in memory

      //this.setState({ showProgressBar:  true });

      //let own = this;

      // update DB

      this.server.UpdateDiscountEntries(entry, (err, res) => {

         //this.setState({ showProgressBar:  false});

         if(err) return;

         console.log('TableEntries.updateEntry(this.server.UpdateDiscountEntries()): ', res);

      });
      
      */
   }

   generateHeaders() {
      console.log('TableEntries.generateHeaders()');

      var keys = Object.keys(this.props.entries[0]);

      let header = keys.map( key => {

         if(!this.excludeColumns.includes(key)) {

            let words = key.split('_');
            let sum = '';

            words.forEach(word => sum += word.charAt(0).toUpperCase() + word.slice(1));

            if(key === 'id') {
               sum = 'Action';
            }

            return <th key={this.common.GUID()}>{sum}</th>;
         }
      });

      header = <tr>{header}</tr>;

      return header;
   }

   /*
   handleEdit(id) {
      console.log('TableEntries.handleEdit()');

      const target = document.getElementById(id);
      const parent = target.parentNode.parentNode;
      let list = parent.querySelectorAll('td');

      if( list.length === 0 )
         return;

         this.activeEditEntry = {
            id:            id,
            title:         list[1].innerText,
            description:   list[2].innerText,
            image:         list[3].innerText,

            product_type:  list[4].innerText,
            pc_type:       list[5].innerText,
            target_user:   list[6].innerText,
            time_frame:    list[7].innerText,

            toaster_type:  list[8].innerText,
            active_status: list[9].innerText
         };

      console.log(this.activeEditEntry);
   }
   */

   generateRows() {
      console.log('TableEntries.generateRows()');


      let rows = this.props.entries.map( item => {

         return <TR_TableCtrl excludeColumns={this.excludeColumns}
                              updateEntry={this.updateEntry}
                              key={this.common.GUID()}
                              tds={item} />

      });

      return rows;
   }

   render() {

      return (

         <div className="table-entries">
            <table className="discount-entries-table">
               <thead>
               {this.generateHeaders()}
               </thead>
               <tbody>
               {this.generateRows()}
               </tbody>
            </table>
         </div>

      );

      /*
      if(this.state.showProgressBar) {

         return (

            <div className="discount-entries">
               <ProgressBarCtrl />
            </div>

         );
      }
      else {
         return (

            <div className="table-entries">
               <table className="discount-entries-table">
                  <thead>
                  {this.generateHeaders()}
                  </thead>
                  <tbody>
                  {this.generateRows()}
                  </tbody>
               </table>
            </div>

         );
      }
      */
   }
}

export default TableEntries;