/**
 * Created by talnax on 5/16/17.
 */

export const  ListEntriesOptions = {
   product_type: ["---", "desktop","laptop", "monitor", "printer", "accessories","another"],
   pc_type: ["---", "desktop", "premium", "gaming", "standard", "workstation","convertible","3-in-1","towers","immersive","all-in-ones","accessories","another"],
   target_user: ["---", "gamer","business","student","designer","another"],
   active_status: ["---", "inactive","active"]

};

export const EntriesName = {
   id:            'id',
   title:         'title',
   description:   'description',
   image:         'image',
   product_type:  'product_type',
   pc_type:       'pc_type',
   target_user:   'target_user',
   time_frame:    'time_frame',
   toaster_type:  'toaster_type',
   active_status: 'active_status'
};

export const SourceMode = {
   debug:   0,
   dev:     1,
   qa:      2,
   release: 3
};

export const ToolBarIds = {
   id_toolbar_undefined:    'id-toolbar-undefined',
   id_toolbar_login:        'id-toolbar-login',
   id_toolbar_registration: 'id-toolbar-registration',
   id_toolbar_login_out:    'id-toolbar-login-out',
   id_toolbar_discount_form:'id-toolbar-discount-form',
   id_toolbar_statistics:   'id-toolbar-statistics',
   id_toolbar_entries:       'id-toolbar-entries'
};

export const HeaderTile = {
   'id-toolbar-undefined':    'Choose your next step',
   'id-toolbar-login':        'LogIn',
   'id-toolbar-registration': 'Registration',
   'id-toolbar-login-out':    '...',
   'id-toolbar-discount-form':'Submit New Discount Entry',
   'id-toolbar-statistics':   'Check Statistics Data',
   'id-toolbar-entries':      'Filter and Update Discount Entries'
};

class Common {

   constructor() {
   }

   isEquivalent(a, b) {
      // Create arrays of property names
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);

      // If number of properties is different,
      // objects are not equivalent
      if (aProps.length != bProps.length) {
         return false;
      }

      for (var i = 0; i < aProps.length; i++) {
         var propName = aProps[i];

         // If values of same property are not equal,
         // objects are not equivalent
         if (a[propName] !== b[propName]) {
            return false;
         }
      }

      // If we made it this far, objects
      // are considered equivalent
      return true;
   }

   capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }

   cloneObject(obj) {
      // http://heyjavascript.com/4-creative-ways-to-clone-objects/
      if(obj == null || typeof(obj) != 'object')
         return obj;

      var temp = obj.constructor(); // changed

      for(var key in obj)
         temp[key] = this.cloneObject(obj[key]);

      return temp;

      // let result = Object.assign({}, obj );
   }

   GUID() {
      var S4;

      S4 = function() {
         return Math.floor(Math.random() * 0x1000);
      };

      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
   }

}

export default Common;

