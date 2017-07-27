/**
 * Created by talnax on 5/19/17.
 */

// http://cssload.net/
// progress-bar:     http://www.chimply.com/Generator#classic-spinner,animatedCircle
// Animate.css:      https://daneden.github.io/animate.css/
// CSS3 loading spinners without images:  https://kilianvalkhof.com/2010/css-html/css3-loading-spinners-without-images/

import React from 'react';

import './../../styles/ProgressBarCtrl.css';

const ProgressBarCtrl = (props) => {

   return (
      <div className="progress-bar-ctrl">
         <div className="cssload-inner cssload-one"></div>
         <div className="cssload-inner cssload-two"></div>
         <div className="cssload-inner cssload-three"></div>
      </div>
   );
};


export default ProgressBarCtrl;