/**
 * Created by talnax on 6/8/17.
 */

"use strict";

module.exports =  class MsgBack {

   constructor(callback) {
      this.callback = callback;

      this.msgback = {
         err:     false,
         param:   null
      }
   }

   setMessage(err, param) {
      this.msgback.err = err;
      this.msgback.param = param;
   }

   callBack() {
      if(  typeof this.callback === 'function'  ) {
         return this.callback (this.msgback);
      }
   }
}