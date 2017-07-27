/**
 * Created by talnax on 5/12/17.
 */

import React, { Component } from 'react';
//import { connect }          from 'react-redux';

import Common, {ToolBarIds, HeaderTile } from './Common/Common';
import AppHeader   from './Components/Sections/AppHeader';
import AppMainMenu from './Components/Sections/AppMainMenu';
//import AppFooter   from './Components/Sections/AppFooter';
import AppSwitcher from './Components/Sections/AppSwitcher';

import './App.css';

/*
const testEntry = {
   id:            '702e5e32-59ee-415d-b1a7-268ef3c35020',
   title:         'Discount 9% for HP Game Mouse',
   description:   'HP UltraThin Wireless Mouse SE',
   image:         'https://i5.walmartimages.com/asr/b16b9ed3-4c53-4b43-8ba1-586c342758d7_1.6e213e13e6e22b732cdf4cda6c9a5262.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',

   product_type:  'laptop',
   pc_type:       'premium',
   target_user:   'business',
   time_frame:    '9/15/2017',

   toaster_type:  'footer-buy',
   active_status: 'active'
};
*/

class App extends Component {

   constructor(props) {
      super(props);

      //this.HeaderTitle = HeaderTile;

      this.state = {
         userLogin:       false,
         toolbarActiveId: ToolBarIds.id_toolbar_login,
         headerTitle:     HeaderTile['id-toolbar-login']
      };

      this.handleMainMenu   = this.handleMainMenu.bind(this);
      this.handleHeaderToolBar   = this.handleHeaderToolBar.bind(this);
      this.handleUserLogInStatus = this.handleUserLogInStatus.bind(this);
      this.handleUserRegistrationStatus = this.handleUserRegistrationStatus.bind(this);
   }

   handleMainMenu(id) {
      console.log("App.handleMainMenu(id): ", id);

      this.setState({
         userLogin:       this.state.userLogin,
         toolbarActiveId: id === ToolBarIds.id_toolbar_login_out ? ToolBarIds.id_toolbar_login : id,
         headerTitle:     id === ToolBarIds.id_toolbar_login_out ? HeaderTile['id-toolbar-login'] : HeaderTile[id]
      });
   }

   handleHeaderToolBar(id) {
      console.log("App.handleHeaderToolBar(id): ", id);

      this.setState({
         userLogin:       this.state.userLogin,
         toolbarActiveId: id === ToolBarIds.id_toolbar_login_out ? ToolBarIds.id_toolbar_login : id,
         headerTitle:     id === ToolBarIds.id_toolbar_login_out ? HeaderTile['id-toolbar-login'] : HeaderTile[id]
      });
   }

   handleUserRegistrationStatus(user_login_status, user) {
      console.log("App.handleUserLogInStatus(user_login_status): ", user_login_status);

      this.user = user;

      // if user make login or registration automatically show 'DiscountForm'

      this.setState({
         userLogin:         user_login_status,
         toolbarActiveId:   !user_login_status ? ToolBarIds.id_toolbar_registration : ToolBarIds.id_toolbar_undefined,
         headerTitle:       !user_login_status ? HeaderTile['id-toolbar-registration'] : HeaderTile['id-toolbar-undefined']
      });
   }

   handleUserLogInStatus(user_login_status, user) {
      console.log("App.handleUserLogInStatus(user_login_status): ", user_login_status);

      this.user = user;

      // if user make login or registration automatically show 'DiscountForm'

      this.setState({
         userLogin:         user_login_status,
         toolbarActiveId:   !user_login_status ? ToolBarIds.id_toolbar_login : ToolBarIds.id_toolbar_undefined,
         headerTitle:       !user_login_status ? HeaderTile['id-toolbar-login'] : HeaderTile['id-toolbar-undefined']
      });

       //this.setState({
       //    userLogin:         user_login_status,
       //    toolbarActiveId:   !user_login_status ? ToolBarIds.id_toolbar_login : ToolBarIds.id_toolbar_discount_form,
       //    headerTitle:       !user_login_status ? HeaderTile['id-toolbar-login'] : HeaderTile['id-toolbar-discount-form']
       //});

      /*
      this.state = {
         userLogin:       false,
         toolbarActiveId: ToolBarIds.id_toolbar_login,
         headerTitle:     HeaderTile['id-toolbar-login']
      };
      */
   }

   render() {

      console.log("App.STORE_ENTRIES: ", this.props.storeEntries);

      return (

         <div className="app-container">

            {this.state.userLogin ? <AppMainMenu onMenuClick={this.handleMainMenu} /> : null}

            <AppHeader onToolBarClick={this.handleHeaderToolBar}
                       toolbarActiveId={this.state.toolbarActiveId}
                       handleUserLogInStatus={this.handleUserLogInStatus}
                       headerTitle={this.state.headerTitle}
                       userLogin={this.state.userLogin} />

            <AppSwitcher  toolbarActiveId={this.state.toolbarActiveId}
                          handleUserLogInStatus={this.handleUserLogInStatus}
                          handleUserRegistrationStatus={this.handleUserRegistrationStatus} />

         </div>
      )
   }
}

//<AppFooter />

export default App;

// export default connect (
//    state => ({
//       storeEntries:  state
//    }),
//    dispatch => ({
//       createEntry: (entry) => {
//          dispatch({type: 'ADD_ENTRY', payload: entry});
//       }
//    })
// )(App);




