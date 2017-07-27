/**
 * Created by talnax on 7/8/2017.
 */

import React from 'react';

import './../../Styles/IconButton.css';

const IconButton = (props) => {

    function onClickProxy() {
        props.onBtnClick(props.id);
    }

    return (
        <div className={`icon-button ${props.icon}`}
             style={props.style}
             onClick={onClickProxy}></div>
    );
};

export default IconButton;
