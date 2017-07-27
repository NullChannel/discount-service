/**
 * Created by talnax on 6/1/17.
 */


import React, { Component }            from 'react';
import Common, { SourceMode,
                 ListEntriesOptions }  from '../../Common/Common';
import IconBtnCtrl                     from './IconBtnCtrl';

import './../../styles/TR_TableCtrl.css';


class TR_TableCtrl extends Component {

   constructor(props) {
      super(props);

      this.common = new Common();

      this.editionalEntry = this.common.cloneObject(this.props.tds);

      this.state = {
         edit:       false
      };

      this.stylesIconBtnCtrl = {
         textShadow: '1px 1px lightgray',
         fontSize: '18px',
         color: 'dodgerblue'
      };

      //this.excludeColumns = ['id_person', 'user_action'];
   }

   handleEdit(id) {
      console.log('TableEntries.handleEdit()');

      event.preventDefault();

      if(this.state.edit) {

         let entryNow = {
            id:                id,
            title:             this.refs.title.value,
            description:       this.refs.description.value,
            image:             this.refs.image.value,

            product_type:      this.refs.product_type.value,
            pc_type:           this.refs.pc_type.value,
            target_user:       this.refs.target_user.value,
            time_frame:        this.props.tds.time_frame,
            toaster_type:      this.props.tds.toaster_type,
            active_status:     this.refs.active_status.value
         };

         //this.editionalEntry.product_type  = this.refs.product_type.value;
         //this.editionalEntry.pc_type       = this.refs.pc_type.value;
         //this.editionalEntry.target_user   = this.refs.target_user.value;
         //this.editionalEntry.active_status = this.refs.active_status.value;

         if(this.common.isEquivalent(entryNow, this.editionalEntry)) {
            // user didn't edit it, do nothing

            console.log("handleEdit() : user didn't edit it, do nothing");
         }
         else {

            this.editionalEntry = entryNow; // update original entry

            console.log("handleEdit() : user edit it, update data");

            // - update list in memory

            this.props.updateEntry(this.editionalEntry);
         }
      }

      this.setState({edit: !this.state.edit});
   }

   handleChange(e) {

      console.log('TableEntries.handleChange(e.target.name, e.target.value)= ', e.target.name, e.target.value);

      event.preventDefault();

      console.log('[e.target.name]:', [e.target.name]);

      this.editionalEntry[e.target.name] = e.target.value;

      this.setState({ [e.target.name] : e.target.value });
   }

   generateSelectOptions(keyName, selectedName) {
      console.log('TableEntries.generateSelectOptions()');

      let own = this;

      return (
         ListEntriesOptions[keyName].map( item => {
         return <option key={own.common.GUID()} value={item} >{item}</option>;
      }));

      // return <option key={own.common.GUID()} value={item} selected={selectedName === item}>{item}</option>;
   }

   generateRowsEdit() {
      console.log('TR_TableCtrl.generateRowsEdit()');

      let entriesOptions = Object.keys(ListEntriesOptions);

      let cell = [];
      let td;

      // onChange={this.handleChange.bind(this)}

      for( let item in this.editionalEntry ) {

         if(this.props.excludeColumns.includes(item))
            continue;

         let value = this.editionalEntry[item];

         if (item === 'id') {

            td = <td key={this.common.GUID()}>

               <IconBtnCtrl id={value}
                            icon={'nc-icon-download'}
                            style={this.stylesIconBtnCtrl}
                            onCtrlClick={this.handleEdit.bind(this)} />
            </td>;
         }
         else if(item === 'title' || item === 'description' || item === 'image' ) {

            td = <td key={this.common.GUID()}>

               <textarea key={this.common.GUID()} className="tr-table-edit"
                         type="text"
                         name={item}
                         defaultValue={value}
                         ref={item} />

            </td>
         }
         else if(entriesOptions.includes(item)) {

            td = <td key={this.common.GUID()}>

               <div className='border-for-select'>
                  <select name={item} ref={item} defaultValue={value}  >
                     {
                        this.generateSelectOptions(item, value)
                     }
                  </select>
               </div>

            </td>
         }
         else {
            td = <td key={this.common.GUID()}>{value}</td>;
         }

         cell.push(td);
      }

      return cell;
   }

   generateRows() {
      console.log('TR_TableCtrl.generateRows()');

      let cell = [];
      let td;

      for( let item in this.editionalEntry ) {

         if(this.props.excludeColumns.includes(item))
            continue;

         let guid = this.common.GUID();

         let value = this.editionalEntry[item];

         if (item === 'id') {

            td = <td key={guid}>

               <IconBtnCtrl id={value}
                            icon={'nc-icon-pencil'}
                            style={this.stylesIconBtnCtrl}
                            onCtrlClick={this.handleEdit.bind(this)}/>
            </td>
         }
         else {
            td = <td key={guid}>{value}</td>;
         }

         cell.push(td);
      }

      return cell;
   }

   render() {
      return (

         <tr key={this.common.GUID()} className="tr-table-ctrl">
            {
               !this.state.edit ? this.generateRows() : this.generateRowsEdit()
            }
         </tr>
      );
   }
}

export default TR_TableCtrl;