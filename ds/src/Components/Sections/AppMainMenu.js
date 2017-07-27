/**
 * Created by talnax on 5/13/17.
 */


import React, { Component } from 'react';

import Common, {ToolBarIds, HeaderTile } from '../../Common/Common';
import IconBtnCtrl from './../Controls/IconBtnCtrl';

import './../../styles/AppMainMenu.css';

class AppMainMenu extends Component {

   constructor(props) {
      super(props);

      this.state = {};

      this.handleMainMenu = this.handleMainMenu.bind(this);
   }

   handleMainMenu(id) {
      console.log('User click main menu IconBtnCtrl with id=', id);
      this.props.onMenuClick(id);
   }

   render() {

      let styles = {
         width: '45px',
         fontSize: '18px',
         marginBottom: '18px',
         color: 'white'
      };

      return (

      //<IconBtnCtrl id={'id-main-menu'}
      //             icon={'nc-icon-menu'}
      //             style={styles}
      //             onCtrlClick={this.handleMainMenu} />

         <div className="app-main-menu">

            <div className="nc-icon-gift ds-main-logo"></div>

            <div className="list-main-menu">

               <IconBtnCtrl id={ToolBarIds.id_toolbar_discount_form}
                            icon={'nc-icon-file-text'}
                            style={styles}
                            onCtrlClick={this.handleMainMenu} />

               <IconBtnCtrl id={ToolBarIds.id_toolbar_entries}
                            icon={'nc-icon-list'}
                            style={styles}
                            onCtrlClick={this.handleMainMenu} />

               <IconBtnCtrl id={ToolBarIds.id_toolbar_statistics}
                            icon={'nc-icon-stats-bars'}
                            style={styles}
                            onCtrlClick={this.handleMainMenu} />
            </div>

            <div className="vertical-line"></div>

         </div>
      );
   }
}

//             <div className="vertical-line"></div>

export default AppMainMenu;