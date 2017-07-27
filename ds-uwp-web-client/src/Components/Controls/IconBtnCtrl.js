/**
 * Created by talnax on 7/14/17.
 */

import React from 'react';

import './../../Styles/IconBtnCtrl.css';

const IconBtnCtrl = (props) => {

   function onClickProxy() {
      props.onCtrlClick(props.id);
   }
   
   return (
      <div className={`icon-btn-ctrl ${props.icon}`}
           id={props.id}
           style={ props.style }
           onClick={onClickProxy}></div>
   );
};

export default IconBtnCtrl;

