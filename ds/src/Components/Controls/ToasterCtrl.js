/**
 * Created by talnax on 5/22/2017.
 */

import React from 'react';

import './../../styles/ToasterCtrl.css';

const ToasterCtrl = (props) => {
   //      background: url(ms-toaster.png)  no-repeat black;
   //      <div className={`icon-btn-ctrl ${props.icon}`}
   //      style={{ width: props.width, color: props.color, fontSize: props.font_size }}
   //      onClick={onClickProxy}></div>

   let styles = null;
   if(props.image !== '') {
      styles = {
         backgroundImage: 'url(' + props.image + ')'
      };
   }


    return (
        <div className="toaster-ctrl">
           <section className="header-section">
              <div className="header-title">{props.title}</div>
              <div className="header-description">{props.description}</div>
           </section>

           <section className="image-section" style={styles}></section>

           <section className="buttons-section">
              <ul className="buttons-list">
                 <li className="button-item">
                    <div className="button-item-icon nc-icon-cogs"></div>
                    <div className="button-item-text">Settings</div>
                 </li>
                 <li className="button-item">
                    <div className="button-item-icon ">X</div>
                    <div className="button-item-text">Cancel</div>
                 </li>
              </ul>
           </section>

           <section className="action-section">
              <div className="action-icon nc-icon-cart"></div>
              <div className="action-text">Buy</div>
           </section>
        </div>
    );
};

export default ToasterCtrl;


