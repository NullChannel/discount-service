/**
 * Created by talnax on 5/27/17.
 */


import React from 'react';

import './../../styles/EntryCtrl.css';

const EntryCtrl = (props) => {

   function onClickProxy() {
      props.onCtrlClick(props.id);
   }

   return (
      <div className="entry-ctrl"
           style={ props.style }
           onClick={onClickProxy}></div>
   );
};


export default EntryCtrl;