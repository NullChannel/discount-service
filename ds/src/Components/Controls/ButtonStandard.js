/**
 * Created by talnax on 5/14/17.
 */

import React from 'react';

import './../../styles/ButtonStandard.css';

const ButtonStandard = (props) => {

   function onClickProxy() {
      if(props.onBtnClick) {
         return props.onBtnClick(props.id);
      }
   }

   return (
      //<div className={`icon-button ${props.icon}`} onClick={onClickProxy}></div>
      <button className="button-standard"
              style={ props.style }
              onClick={onClickProxy} >{props.buttonName}</button>
   );

};


export default ButtonStandard;
