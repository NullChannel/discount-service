/**
 * Created by talnax on 5/11/17.
 */

import React, { Component } from 'react';

import Common, {ToolBarIds, HeaderTile } from '../../Common/Common';
import IconButton  from './../Controls/IconButton';

import './../../styles/AppHeader.css';

class AppHeader extends Component {

   constructor(props) {
      super(props);

      this.handleToolBar  = this.handleToolBar.bind(this);

   }

   handleToolBar(id) {
      console.log('User click toolbar with id=', id);

        if( id === ToolBarIds.id_toolbar_login_out) {
            this.props.handleUserLogInStatus(false, null);
        }
       else {
            this.props.onToolBarClick(id);
        }
   }

   getRenderValue() {

      let functionality;

       if( this.props.userLogin === false ) {

           console.log('AppHeader.getRenderValue(this.props.userLogin === FALSE)');

           functionality =

           <div className="toolbar-header">

               { this.props.toolbarActiveId !== ToolBarIds.id_toolbar_login ?
                   <IconButton id={ToolBarIds.id_toolbar_login}
                               icon={'nc-icon-user-plus'}
                               onBtnClick={this.handleToolBar} /> : null }

               { this.props.toolbarActiveId !== ToolBarIds.id_toolbar_registration ?
                   <IconButton id={ToolBarIds.id_toolbar_registration}
                               icon={'nc-icon-user-tie'}
                               onBtnClick={this.handleToolBar} /> : null }

           </div>;
       }
       else if( this.props.userLogin === true ) {

          console.log('AppHeader.getRenderValue(this.props.userLogin === TRUE)');

          functionality =

             <div className="toolbar-header">

                <IconButton id={ToolBarIds.id_toolbar_login_out}
                            icon={'nc-icon-user-minus'}
                            onBtnClick={this.handleToolBar} />
             </div>;

       }
       /*
       else if( this.props.userLogin === true ) {

           console.log('AppHeader.getRenderValue(this.props.userLogin === TRUE)');

           functionality =

               <div className="toolbar-header">

                   { this.props.toolbarActiveId !== ToolBarIds.id_toolbar_discount_form ?
                       <IconButton id={ToolBarIds.id_toolbar_discount_form}
                                   icon={'nc-icon-newspaper'}
                                   onBtnClick={this.handleToolBar} /> : null }

                   { this.props.toolbarActiveId !== ToolBarIds.id_toolbar_statistics ?
                       <IconButton id={ToolBarIds.id_toolbar_statistics}
                                   icon={'nc-icon-stats-bars'}
                                   onBtnClick={this.handleToolBar} /> : null }

                  { this.props.toolbarActiveId !== ToolBarIds.id_toolbar_entries ?
                     <IconButton id={ToolBarIds.id_toolbar_entries}
                                 icon={'nc-icon-list'}
                                 onBtnClick={this.handleToolBar} /> : null }

                   <IconButton id={ToolBarIds.id_toolbar_login_out}
                               icon={'nc-icon-user-minus'}
                               onBtnClick={this.handleToolBar} />
               </div>;

       }
      */

      return functionality;
   }

   render() {
      return (
         <div className="app-header">

             {this.getRenderValue()}

             <div className='header-title'>
                {this.props.headerTitle}
             </div>

            <span className="header-line"/>
         </div>
      );
   }
}

export default AppHeader;
