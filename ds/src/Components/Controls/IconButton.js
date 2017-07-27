/**
 * Created by talnax on 5/12/17.
 */

import React from 'react';

import './../../styles/IconButton.css';

const IconButton = (props) => {

   function onClickProxy() {
      props.onBtnClick(props.id);
   }

   return (
      <div className={`icon-button ${props.icon}`} onClick={onClickProxy}></div>
   );

};


export default IconButton;