/**
 * Created by talnax on 7/12/17.
 */

export const SourceMode = {
   debug:   0,
   dev:     1,
   qa:      2,
   release: 3
};

export const ProductionType = SourceMode.debug;

export const UserMode = {
   user_error:     0,
   user_not_exist: 1,
   user_exist:     2,
   user_register:  3,
   user_login:     4,
   user_logout:    5,
   user_psw_fail:  6,
   
   profile_exist:  7,
   profile_not_exist:  8,
   
   service_fail:   15
};

export const DataMode = {
   data_error:     0,
   data_not_exist: 1,
   data_exist:     2,
   data_corrupt:   3,
   data_set_new:   4,
   data_updated:   5,
   service_fail:   6
};

export const ToolBarIds = {
   id_toolbar_undefined:    'id-toolbar-undefined',
   id_toolbar_login:        'id-toolbar-login',
   id_toolbar_registration: 'id-toolbar-registration',
   id_toolbar_login_out:    'id-toolbar-login-out',
   id_toolbar_hot_deal:     'id-toolbar-hot-deal',
   id_toolbar_entries:      'id-toolbar-entries',
   id_toolbar_exit:         'id-toolbar-exit',

   id_toolbar_panels:       'id-toolbar-panels',
   id_toolbar_search:       'id-toolbar-search',
   id_toolbar_statistics:   'id-toolbar-statistics'
};

export const DiscountPanels = {
   laptop: {
      selectBtnPos:  'top',
      infoStyle:     'panel-info-up',
      style:         'laptop-panel'
   },
   printer: {
      selectBtnPos:  'top',
      infoStyle:     'panel-info-up',
      style:         'printer-panel'
   },
   desktop: {
      selectBtnPos:  'top',
      infoStyle:     'panel-info-up',
      style:         'desktop-panel'
   },
   monitor: {
      selectBtnPos:  'bottom',
      infoStyle:     'panel-info-dn',
      style:         'monitor-panel'
   },
   accessories: {
      selectBtnPos:  'bottom',
      infoStyle:     'panel-info-dn',
      style:         'accessories-panel'
   },
   multimedia: {
      selectBtnPos:  'bottom',
      infoStyle:     'panel-info-dn',
      style:         'multimedia-panel'
   }
};

export const InfoPanelContent = {
   laptop:[
      'Business',
      'Premium',
      'Tablet',
      'Gaming',
      'Standard',
      'Workstation',
      'Convertible',
      'Detachables',
      '3-in-1'

   ],
   printer: [
      '3D Scan',
      '3D Print',
      'Large Format & Digital Press',
      'Multifunction',
      'Scanners',
      'Home & Office',
      'Business',
      'Paper handing',
      'Printer cables'
   ],
   desktop: [
      'Business',
      'Immersive',
      'Gaming',
      'Towers',
      'Workstation',
      'All-in-ones',
      '3-in-1'
   ],
   monitor: [
      'Business',
      'Home',
      'Gaming',
      'Entertainment',
      'Ultra HD',
      'FHD to QHD',
      'HD & Below'
   ],
   accessories: [
      'Smartwatches',
      'Cables & Adapters',
      'Calculators',
      'Workspace accessories',
      'Batteries & Charges',
      'Storage & Drivers',
      'Mice & Keyboard',
      'Cables & Components',
      'Bags & Cases',
      'Memory',
      'Mouse (wired & wireless)',
      'Security & Protection',


   ],
   multimedia: [
      'Gaming',
      'Headset',
      'Software',
      'Audio & Video',
      'Services',
      'Speakers',
      'Headphones',
      'Graphic Cards',
      'Cases & Covers'
   ]
};

export default class Common {

   constructor() {
   }

   isEquivalent(a, b) {
      // Create arrays of property names
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);

      // If number of properties is different,
      // objects are not equivalent
      if (aProps.length !== bProps.length) {
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
      if(obj == null || typeof(obj) !== 'object')
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