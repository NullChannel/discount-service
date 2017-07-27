/**
 * Created by talnax on 7/23/17.
 */

import React from 'react';

import './../../Styles/ButtonStandard.css';

const ButtonStandard = (props) => {

   function onClickProxy() {
      if(props.onBtnClick) {
         return props.onBtnClick(props.id);
      }
   }

   return (
      <button className="button-standard"
              style={ props.style }
              onClick={onClickProxy} >{props.buttonName}</button>
   );
};

export default ButtonStandard;
