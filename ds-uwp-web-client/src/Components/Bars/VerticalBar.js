/**
 * Created by talnax on 7/14/17.
 */

import React, { Component } from 'react';
import { ToolBarIds } from './../Common/Common';
import IconBtnCtrl from './../Controls/IconBtnCtrl'

import './../../Styles/VerticalBar.css';

export default class VerticalBar extends Component {
   
   constructor(props) {
      super(props);
      
      this.state = {};

      this.handleBarMenu = this.handleBarMenu.bind(this);
   }

   handleTextMenu(id) {
      console.log('User click main menu handleTextMenu id=', id);
   }

   handleBarMenu(id) {
      console.log('User click main menu IconBtnCtrl with id=', id);
      
      this.props.onVerticalBarClick(id);
   }

   /**
    * getTopPartOfBar() function
    * get top peace of bar
    *
    * @param step - none
    * @return content of bar
    */
   getTopPartOfBar() {
       
      let styles = {
         width: '36px',
         fontSize: '15px',
         marginBottom: '18px'
      };

      let content =
         <div className="list-bar-top">

            <div className="separator" ></div>

            <IconBtnCtrl id={ToolBarIds.id_toolbar_panels}
                         icon={'fa fa-th'}
                         style={styles}
                         onCtrlClick={this.handleBarMenu} />

            <IconBtnCtrl id={ToolBarIds.id_toolbar_search}
                         icon={'nc-icon-search'}
                         style={styles}
                         onCtrlClick={this.handleBarMenu} />

            <div className="separator"></div>
         </div>

      return content;
   }

   /**
    * getBottomPartOfBar() function
    * get bottom peace of bar
    *
    * @param step - none
    * @return content of bar
    */
   getBottomPartOfBar() {

      let stylesBtm = {
         width: '36px',
         fontSize: '21px',
         marginTop: '18px'
      };

      let content =
          <div className="list-bar-bottom">

            <div className="separator"></div>

            <IconBtnCtrl id={ToolBarIds.id_toolbar_exit}
                         icon={'fa fa-sign-out'}
                         style={stylesBtm}
                         onCtrlClick={this.handleBarMenu} />

         </div>

      return content;
   }

   render() {
      
      return (

         <div className="vertical-bar">

            {
                this.getTopPartOfBar()
            }

            <div className="vertical-text-menu">
               <div className="vertical-menu-item"
                    onClick={() => {this.handleTextMenu(ToolBarIds.id_toolbar_hot_deal)}}>Hot Deals</div>
            </div>

            {
               this.getBottomPartOfBar()
            }

         </div>
      );
   }
}