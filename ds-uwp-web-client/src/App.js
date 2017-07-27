/**
 * Created by talnax on 7/14/2017.
 */

import React, { Component } from 'react';
import { UserMode, ToolBarIds } from './Components/Common/Common';
import JsGateProxy from './Components/Proxy/JsGateProxy';
import ServerProxy from './Components/Proxy/ServerProxy';
import AppSwitcher from './Components/Bars/AppSwitcher';
import VerticalBar from './Components/Bars/VerticalBar';
import WelcomePanel from './Components/Panels/WelcomePanel';
import ProgressBarCtrl from './Components/Controls/ProgressBarCtrl';
import appStore from './../src/Components/Common/AppStore';

import './Styles/App.css';

// 1. constructor
// 2. componentWillMount
// 3. render
// 4. componentDidMount

export default class App extends Component {

    constructor(props) {
        super(props);

        this.server = new ServerProxy();
        this.jsGate = new JsGateProxy();

        this.appStore = appStore;

        this.state = {
            firstTime:   this.jsGate.getAppCountLaunches() === 0 ? true : false,    // this is not async, this is value from storage, so it's ON
            userLogin:   false,
            VBarActive:  false,
            toolBar:     ToolBarIds.id_toolbar_panels
        };

        this.onFinishWelcome = this.onFinishWelcome.bind(this);

        this.onVerticalBarClick = this.onVerticalBarClick.bind(this);
    }

   onVerticalBarClick(id) {
        console.log('App.onVerticalBarClick');

        this.setState({
           VBarActive: true,
           toolBar: id
        });
    }

   onFinishWelcome(step) {
      console.log('App.onFinishWelcome');

      step = parseInt(step);

      this.setState({ firstTime:  false });

      this.getDataWrapper();
   }

    getUserLogin(userId, callback) {

        this.server.logInUser(userId, (err, status) => {

            if(err)  return callback(err);

            if(status === UserMode.user_not_exist) {
                return callback('User with this credential not exist...');
            }

            return callback(false);
        });
    }

    getUserProfile(userId, callback) {

        this.server.getUserProfile(userId, (err, status, value ) => {

            if(err) return callback(err);

            if(status === UserMode.profile_not_exist) {
                return callback('UserProfile with this credential not exist...');
            }

            this.appStore.userProfile = value;

            return callback(false);
        });
    }

    getUserData(callback) {

        this.jsGate.getUserUID((err, id) => {
            if(err) {
                return alert('getUserUID() Fail...');
            }

            this.getUserLogin(id, err => {

                if(err) return callback(err);

                else {
                    this.getUserProfile(id, err => {

                        if(err) return callback(err);
                        else return callback(false);
                    })
                }
            });
        });
    }

    getDataWrapper() {

        this.getUserData(err => {

            if(err) {
                alert(err);

                return this.setState({
                    userLogin:  false,
                    VBarActive: false
                });
            }
            else {
                return this.setState({
                    userLogin:  true,
                    VBarActive: true
                });
            }
        });
    }

    componentDidMount() {
        console.log('App.componentDidMount()');

        if(!this.state.firstTime) {

            // get all data per user

            this.getDataWrapper();
        }
    }

    getRender() {

        let content;
        
        if(this.state.firstTime) {
           
            content =
                <div className="app-container">
                    <WelcomePanel onFinishWelcome={this.onFinishWelcome} />
                </div>
        }
        else if(!this.state.userLogin) {

            content =
                <div className="app-container">
                    <ProgressBarCtrl />
                </div>
        }
        else  {

            content = <div className="app-container">
               <VerticalBar onVerticalBarClick={ this.onVerticalBarClick } />
               <AppSwitcher toolBarId={ this.state.toolBar } />
            </div>
        }

        return content;
    }

    render() {
        return (

            this.getRender()

        );
    }
}

