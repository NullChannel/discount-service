/**
 * Created by talnax on 7/19/2017.
 */


import React, { Component } from 'react';
import IconButton  from './../Controls/IconButton';

import './../../Styles/WelcomePanel.css';

export default class WelcomePanel extends Component {

    constructor(props) {
        super(props);

        // 1. This is NOT Advertisement Platform
        // 2. This is Discount Service. Base of Your selections we will show you our products with discounts
        // 3. For select discount products use buttons

        this.state = {
            update: '',
            step:   0
        };

        this.stepsAmount = 3;

        this.onNextStep = this.onNextStep.bind(this);
        this.onWelcomeProxy = this.onWelcomeProxy.bind(this);
    }

    /**
     * onNextStep() event, just fake event we don't use it
     *
     * @param step - category of button than user click
     * @return none
     */
    onWelcomeProxy(category) {
        console.log('DiscountPanel.onSelectedPanelProxy(category)=', category);
    }

   /**
    * onNextStep() event
    * check if we need make new step
    * or stop wizard and send event back to parent
    *
    * @param step - current step of wizard
    * @return update UI or send event back to parent
    */
    onNextStep(step) {
        console.log('WelcomePanel.onNextStep(id):', step);

        step = parseInt(step);

        if( step < this.stepsAmount) {
            this.setState({ step: step + 1 });
        }
        else  {
            this.props.onFinishWelcome();
        }
    }

    /**
     * getStepContent() function
     *
     * @param step - current step of wizard
     * @return content(sentence) of wizard
     */
    getStepContent(step) {

        let content;

        if(step === 0) {

            content =
                <div className="welcome-panel-step-text">
                    This is <span className="active-text">Discount Service !</span>
                </div>
        }
        else if(step === 1) {

            content =
                <div className="welcome-panel-step-text">
                    It's <span className="active-text">NOT</span> Advertisement Platform
                </div>
        }
        else if(step === 2) {

            content =
                <div className="welcome-panel-step-text">
                    Base of <span className="active-text">your choices</span> we will <br></br>
                    show products with discounts.
                </div>
        }
        else if(step === 3) {

            let ib_plus = {
                backgroundColor: 'dodgerblue',
                color: 'white',
                fontSize: '18px',
                float: 'none'
            };

            let ib_close = {
                backgroundColor: '#5B5B5B',
                color: 'white',
                fontSize: '18px',
                float: 'none'
            };

            content =
                <div className="welcome-panel-step-text">
                    Use &nbsp;&nbsp;

                    <IconButton  id={'welcome'}
                                 style={ib_plus}
                                 icon={'fa fa-plus'}
                                 onBtnClick={this.onWelcomeProxy} />

                    &nbsp;&nbsp;and&nbsp;&nbsp;

                    <IconButton  id={'welcome'}
                                 style={ib_close}
                                 icon={'fa fa-times'}
                                 onBtnClick={this.onWelcomeProxy} />

                    &nbsp;&nbsp; buttons <br></br>

                    To select and unselect <br></br> products you want.
                </div>
        }

        return content;
    }

    /**
     * getRender()
     *
     * @param none
     * @return none
     */
    getRender() {
        console.log('WelcomePanel.getRender(step):', this.state.step);

        let ib_style = {
            backgroundColor: 'dodgerblue',
            color: 'white',
            fontSize: '18px'
        };

        let content  =
            <div className="welcome-panel-next">

                {
                    this.getStepContent(this.state.step)
                }

            <div className="next-step-btn">
                <IconButton  id={this.state.step.toString()}
                             style={ib_style}
                             icon={'fa fa-arrow-right'}
                             onBtnClick={this.onNextStep} />
            </div>
        </div>

        return content;
    }
    
    render() {
        
        return (

            <div className="welcome-panel">

                <div className="welcome-panel-texts">

                    {
                        this.getRender()
                    }

                </div>

            </div>

        )
    }

}