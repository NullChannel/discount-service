/**
 * Created by talnax on 5/14/17.
 */

import React, { Component } from 'react';
import Common, {ToolBarIds, HeaderTile } from '../../Common/Common';

import RegistrationForm    from './../Forms/RegistrationForm';
import LogInForm           from './../Forms/LogInForm';
import DiscountForm        from './../Forms/DiscountForm';
import DiscountStatistics  from './../Panels/DiscountStatistics';
import DiscountEntries     from './../Panels/DiscountEntries';
import ProgressBarCtrl     from './../Controls/ProgressBarCtrl';
import ToasterCtrl         from './../Controls/ToasterCtrl';

import './../../styles/AppSwitcher.css';


class AppSwitcher extends Component {

   constructor(props) {
      super(props);

      this.state = {
         showProgressBar: false
      };

      this.handleLogIn           = this.handleLogIn.bind(this);
      this.handleRegistration    = this.handleRegistration.bind(this);
      this.handleCreateDiscount  = this.handleCreateDiscount.bind(this);
      this.handleStatistics      = this.handleStatistics.bind(this);
      this.handleEntries         = this.handleEntries.bind(this);

      this.showProgressBar       = this.showProgressBar.bind(this);

   }

   showProgressBar(show) {
      console.log('AppSwitcher.showProgressBar(show)= ', show);

      this.setState({
         showProgressBar: show
      });
   }

   handleRegistration(status,user) {
      console.log('AppSwitcher.handleRegistration(user)= ', user);

      // don't show <RegistrationForm />
      // this.setState({ this.props.toolbarActiveId: ToolBarIds.id_toolbar_undefined });

      this.props.handleUserRegistrationStatus(status,user);
   }

   handleLogIn(user) {
      console.log('AppSwitcher.handleLogIn(user)= ', user);

      // don't show <LogInForm />
      // this.setState({ this.props.toolbarActiveId: ToolBarIds.id_toolbar_undefined });

      this.props.handleUserLogInStatus(true,user);
   }

   handleCreateDiscount(discount) {
      console.log('AppSwitcher.handleCreateDiscount(discount)= ', discount);
   }

   handleStatistics(res) {
      console.log('AppSwitcher.handleStatistics(res)= ', res);
   }

   handleEntries(res) {
      console.log('AppSwitcher.handleEntries(res)= ', res);
   }

   getRenderValue() {

      let functionality = '';

      if( !this.state.showProgressBar ) {

         switch(this.props.toolbarActiveId) {
            case 'id-toolbar-discount-form':
               functionality = <DiscountForm handleCreateDiscount={this.handleCreateDiscount}  showProgressBar={this.showProgressBar} />;
               break;
            case 'id-toolbar-login':
               functionality = <LogInForm handleLogIn={this.handleLogIn} showProgressBar={this.showProgressBar} />;
               break;
            case 'id-toolbar-registration':
               functionality = <RegistrationForm handleRegistration={this.handleRegistration}  showProgressBar={this.showProgressBar} />;
               break;
            case 'id-toolbar-statistics':
               functionality = <DiscountStatistics handleStatistics={this.handleStatistics} />;
               break;
            case 'id-toolbar-entries':
               functionality = <DiscountEntries handleEntries={this.handleEntries} />;
               break;
            default:
               functionality = <div className='nc-icon-gift discount-service-text-logo'> Discount Service</div>;
               break;
         }
      }
      else {

         functionality = <ProgressBarCtrl />;
      }

      return functionality;
   }

   //{ !this.props.user_login ? <IconButton id={'id-toolbar-login'}
   //                            icon={'nc-icon-user-plus'}
   //                            onBtnClick={this.handleToolBar} /> : null }

   render() {
      console.log(this.props);

      return (
         <div className="app-switcher">
            {this.getRenderValue()}
         </div>
      );
   }
}


export default AppSwitcher;


