/**
 * Created by talnax on 7/7/2017.
 */

import React, { Component } from 'react';
import Common, { DiscountPanels } from './../Common/Common';
import IconButton  from './../Controls/IconButton';

import './../../Styles/DiscountPanel.css';

export default class DiscountPanel extends Component {

    constructor(props) {
        super(props);

       this.common = new Common();

       this.onSelectedPanelProxy = this.onSelectedPanelProxy.bind(this);
    }

    onSelectedPanelProxy(category) {
        console.log('DiscountPanel.onSelectedPanelProxy(category)=', category);

        this.props.onSelectedPanel(category);
    }

    onClickInfoButtonProxy(category) {
        console.log('DiscountPanel.onClickProxy(category)=', category);

        this.props.clickPanel(category);
    }

    showSelectButton(category, ib_style) {

      let ib = !this.props.statePanel.showInfoPanel ?
               <IconButton  id={category}
                            style={ib_style}
                            icon={this.props.selected ? 'fa fa-times' : 'fa fa-plus'}
                            onBtnClick={this.onSelectedPanelProxy} />
               :
               null;
      return ib;
    }

    getPanelStyle(category) {

      let blur_style = {};

      if( this.props.statePanel.blurCategory === category ) {
         blur_style['filter'] = 'blur(6px)';
         //blur_style['opacity'] = '.6';
         //blur_style['visibility'] = 'hidden';
      }

      return blur_style;
    }

    getSelectButtonStyle(type) {

       let selected = this.props.selected;
       let backgroundColor = selected ? '#5B5B5B' : 'dodgerblue';
       let color = !selected ? 'white' : 'white';

        let ib_style_top = {
            top: selected ? '-11px' : '-20px',
            right: selected ? '11px' : '-20px',
            backgroundColor: backgroundColor,
            color: color,
            zIndex: '999'
        };

        let ib_style_bottom = {
            bottom: selected ? '11px' :  '-20px',
            right: selected ? '11px' : '-20px',
            backgroundColor: backgroundColor,
            color: color,
            zIndex: '999'
        };

        return type === 'top' ? ib_style_top : ib_style_bottom;
    }

    getPanelPerCategory(category) {

        let panelProps = DiscountPanels[category];

        let common_styles = this.props.selected ?
               `common-panel ${panelProps.style} common-panel-selected` :
               `common-panel ${panelProps.style} common-panel-unselected `;

        let main_style = this.props.selected ?
               `panel-info-template-selected ${panelProps.infoStyle}` :
               `panel-info-template-unselected ${panelProps.infoStyle}`;

       let panel_info_btn = this.props.selected ?
             `panel-info-button-selected` :
             `panel-info-button-unselected`;

       let panel_selected_text = panelProps.selectBtnPos === 'top' ?
            'panel-selected-text-top' : 'panel-selected-text-bottom';

        let panel =
            <div className={common_styles}
                 style={this.getPanelStyle(category)}>

                <div className={main_style}>

                    <div className={panel_info_btn}
                         onClick={() => this.onClickInfoButtonProxy(category)}>
                        <span className="panel-info-button-icon fa fa-exclamation-circle"></span>
                    </div>

                    <div className="title">{ this.common.capitalizeFirstLetter(category) }</div>
                </div>

                {
                    this.showSelectButton(category, this.getSelectButtonStyle(panelProps.selectBtnPos))
                }

                <div className="panel-image"></div>

               <div className={panel_selected_text}>
                   <div className="active-text">{ this.common.capitalizeFirstLetter(category) }</div>
                  <div className="active-selected">SELECTED</div>
                  
               </div>

            </div>

        return panel;
    }

    render() {

       return (
          //this.getPanel()
           this.getPanelPerCategory(this.props.category)
       )
    }
}
