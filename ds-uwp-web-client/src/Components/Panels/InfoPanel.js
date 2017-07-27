/**
 * Created by talnax on 7/10/2017.
 */

import React, { Component } from 'react';
import IconButton  from './../Controls/IconButton';

import './../../Styles/InfoPanel.css';

export default class InfoPanel extends Component {

    constructor(props) {
        super(props);

        this.closeProxyPanel = this.closeProxyPanel.bind(this);
    }

   closeProxyPanel() {
      console.log('InfoPanel.closeProxyPanel()');

      this.props.closeInfoPanel();
   }

   getFormatedContent() {

      const contentItems = this.props.statePanel.infoContent.map((item, index) =>
         <li className="info-list-content-item" key={index}>
            {item}
         </li>
      );

      return (
         <ul className="info-list-content">
            {contentItems}
         </ul>
      );
   }

   capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }
    
    setPanel() {

       let ib_style = {
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          backgroundColor: 'white',
          color: 'black'
       };

        let section =
            <div className="blur-info-panel">
                <div className="section-for-blur" style={this.props.style}>

                   <IconButton  id={'close'}
                                style={ib_style}
                                icon={'fa fa-times'}
                                onBtnClick={this.closeProxyPanel} />
                   
                    <div className="section-for-info">

                        <div className="section-text">

                           <div className="section-title">
                              {this.capitalizeFirstLetter(this.props.statePanel.blurCategory)}
                           </div>

                           <div className="section-content-item">
                              
                              {
                                 this.getFormatedContent()
                              }
                              
                           </div>


                        </div>
                    </div>
                </div>
            </div>

        return section;
    }

    render() {

        return (
            this.setPanel()
        )
    }
}