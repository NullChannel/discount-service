/**
 * Created by talnax on 7/7/2017.
 */

import React, { Component } from 'react';
import DiscountPanel from './../Panels/DiscountPanel';
import SearchPanel from './../Panels/SearchPanel';
import InfoPanel from './../Panels/InfoPanel';
import { InfoPanelContent, ToolBarIds } from './../Common/Common';
import appStore from './../Common/AppStore';

import './../../Styles/AppSwitcher.css';

export default class AppSwitcher extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            update:        '',
            showInfoPanel: false,
            blurCategory: ''
        };

        this.appStore = appStore;
    
        this.handleClickPanel = this.handleClickPanel.bind(this);
        this.closeInfoPanel = this.closeInfoPanel.bind(this);
        this.onSelectedPanel = this.onSelectedPanel.bind(this);
    }

    /**
     * onSelectedPanel() event
     *
     * @param -
     * @return -
     */
    onSelectedPanel(category) {
      console.log('AppSwitcher.onSelectedPanel(category)=', category);
      
      this.appStore.userProfile[category] = !this.appStore.userProfile[category];
        
        // update appStore counts
        // and send events if somebody subscribe on it

      this.setState({ update: Math.random() });
    }

    /**
     * handleClickPanel() event
     * TODO - All this code will go to css file !!!
     *
     * @param -
     * @return -
     */
    handleClickPanel(category) {
        console.log('AppSwitcher.handleClickPanel(category)=', category);
    
        this.infoPanelStyle   = null;
    
         if(category === 'laptop') {
            this.infoPanelStyle = {
                top: '90px',
                left: '124px',
                width: '274px',
                height: '265px'
            };
         }
         else if(category === 'printer') {
          this.infoPanelStyle = {
             top: '60px',
             left: '310px',
             width: '294px',
             height: '263px'
          };
         }
         else if(category === 'desktop') {
            this.infoPanelStyle = {
                top: '60px',
                left: '575px',
               width: '274px',
               height: '265px'
            };
         }
         else if(category === 'monitor') {
            this.infoPanelStyle = {
                top: '294px',
                left: '111px',
                width: '274px',
                height: '232px'
            };
         }
         else if(category === 'accessories') {
            this.infoPanelStyle = {
                top: '222px',
                left: '321px',
                width: '300px',
                height: '312px'
            };
         }
         else if(category === 'multimedia') {
            this.infoPanelStyle = {
                top: '275px',
                left: '567px',
                width: '274px',
                height: '248px'
            };
         }
    
        if( this.infoPanelStyle === null ) {
            this.setState({
                showInfoPanel: false,
                blurCategory: '',
                infoContent: ''
            });
        }
        else {
            this.setState({
                showInfoPanel:   true,
                blurCategory:    category,
                infoContent:     InfoPanelContent[category]
            });
        }
    }

    /**
     * closeInfoPanel() function
     *
     * @param -
     * @return -
     */
    closeInfoPanel() {
    
      this.setState({
            showInfoPanel: false,
            blurCategory: '',
            infoContent: ''
      });
    }

    /**
     * createListOfPanels() function
     *
     * @param -
     * @return -
     */
    createListOfPanels(pNames) {
    
      const panels = pNames.map((item, index) => {

         let status = this.appStore.userProfile[item];

         return (
            <DiscountPanel category={item} key={index}
                           clickPanel={this.handleClickPanel}
                           selected={status}
                           onSelectedPanel={this.onSelectedPanel}
                           statePanel={this.state}
            />
         );
      });
    
      return panels;
    }

   /**
    * getDiscountPanels() function
    *
    * @param -
    * @return -
    */
   getDiscountPanels() {
      
      return (

      <div className="grid-panels">

         <div className="row-panels">

            {
               this.createListOfPanels(['laptop','printer','desktop'])
            }

         </div>

         <div className="row-panels">

            {
               this.createListOfPanels(['monitor','accessories','multimedia'])
            }

         </div>

         {
            this.state.showInfoPanel ?
               <InfoPanel style={this.infoPanelStyle}
                          statePanel={this.state}
                          closeInfoPanel={this.closeInfoPanel} />
               :
               null
         }

      </div>
         
      )
   }

   /**
    * handleSearch() function
    *
    * @param -
    * @return -
    */
   getRenderValue() {
      
      let content = '';
      
      if(this.props.toolBarId === ToolBarIds.id_toolbar_search) {
         content = <SearchPanel />

         return content;
      }
      else if (this.props.toolBarId === ToolBarIds.id_toolbar_panels) {
         return this.getDiscountPanels();
      }
      else {
          return this.getDiscountPanels();
      }
   }

    render() {
    
        return (
            <div className="app-switcher">

            {
               this.getRenderValue()
            }
    
            </div>
        );
    }
}
