/**
 * Created by talnax on 5/12/17.
 */

import React from 'react';

import './../../styles/IconBtnCtrl.css';

const IconBtnCtrl = (props) => {

   function onClickProxy() {
      props.onCtrlClick(props.id);
   }

   //return (
   //   <div className={`icon-btn-ctrl ${props.icon}`}
   //        style={{ width: props.width,
   //                 color: props.color,
   //                 marginBottom: props.bottom,
   //                 fontSize: props.font_size }}
   //        onClick={onClickProxy}></div>
   //);

   return (
      <div className={`icon-btn-ctrl ${props.icon}`}
           id={props.id}
           style={ props.style }
           onClick={onClickProxy}></div>
   );

};

//const divStyle = {
//    color: 'blue',
//    backgroundImage: 'url(' + imgUrl + ')',
//};
//
//function HelloWorldComponent() {
//    return <div style={divStyle}>Hello World!</div>;
//}

// https://facebook.github.io/react/docs/dom-elements.html
//<span style={{color: 'red'}}>
//        {this.props.product.name}
//      </span>;

export default IconBtnCtrl;
