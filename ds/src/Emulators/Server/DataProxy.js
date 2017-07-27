/**
 * Created by talnax on 5/22/2017.
 */

"use strict";

const DataProxyEntries = [
    {
        id:            '702e5e32-59ee-415d-b1a7-268ef3c35019',
        title:         'Discount 30% for HP ENVY x360 Convertible Laptop',
        description:   'Speedy general performance; Lots of ports',
        image:         'http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c05095142.png',

        product_type:  'laptop',
        pc_type:       'premium',
        target_user:   'business',
        time_frame:    '9/15/2017',

        toaster_type:  'footer-buy',
        active_status: 'active',

        id_person:  '325629ab-8cd3-4653-97fb-ed2904b553e9',

        user_action: {
            settings: 12,
            cancel: 3,
            buys:   18,
            ignores: 5
        }
    },
    {
        id:            'e37826ee-9502-47e0-9e96-592b258143a1',
        title:         'Discount 10% for HP Pavilion Laptop - 15z touch optional',
        description:   'With up to 7 hours of battery life1, stay powered all day with charge to spare',
        image:         'http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c05095989.png',

        product_type:  'laptop',
        pc_type:       'standard',
        target_user:   'student',
        time_frame:    '9/15/2017',

        toaster_type:  'footer-buy',
        active_status: 'inactive',

        id_person:  '325629ab-8cd3-4653-97fb-ed2904b553e9',

        user_action: {
            settings: 15,
            cancel: 6,
            buys:   24,
            ignores: 0
        }
    },
    {
        id:            'e3b0b33e-d7a7-4131-adf1-3b2a40050753',
        title:         'Discount 15% HP EliteBook Folio',
        description:   'Engage teams, clients, and vendors with the crystal-clear audio by Bang & Olufsen',
        image:         'http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c05145861.png',

        product_type:  'laptop',
        pc_type:       'premium',
        target_user:   'designer',
        time_frame:    '9/15/2017',

        toaster_type:  'footer-buy',
        active_status: 'active',

        id_person:  '325629ab-8cd3-4653-97fb-ed2904b553e9',

        user_action: {
            settings: 12,
            cancel: 15,
            buys:   36,
            ignores: 1
        }
    },
    {
        id:            '8233d99c-2226-47e6-9255-1c97b104ead4',
        title:         'Discount 20% for HP Chromebook Laptop - 14t',
        description:   'The latest Intel -Celeron- processor is optimized to deliver a blazing-fast internet experience',
        image:         'http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c04808593.png',

        product_type:  'laptop',
        pc_type:       'standard',
        target_user:   'another',
        time_frame:    '9/15/2017',

        toaster_type:  'footer-buy',
        active_status: 'inactive',

        id_person:  '325629ab-8cd3-4653-97fb-ed2904b553e9',

        user_action: {
            settings: 14,
            cancel: 3,
            buys:   20,
            ignores: 3
        }
    },
    {
        id:            '300a67a6-c472-4ad3-971a-fc0bcbbba344',
        title:         'Discount 10% for HP Spectre x360',
        description:   'Exhilarating power wrapped in luxury',
        image:         'http://www.hp.com/#video-spectre-x360',

        product_type:  'laptop',
        pc_type:       'premium',
        target_user:   'business',
        time_frame:    '9/15/2017',

        toaster_type:  'footer-buy',
        active_status: 'active',

        id_person:  '325629ab-8cd3-4653-97fb-ed2904b553e9',

        user_action: {
            settings: 3,
            cancel: 3,
            buys:   9,
            ignores: 4
        }
    },
    {
        id:            'ffee6f92-207c-4f4c-904b-4b434aaad834',
        title:         'Discount 30% for Envy laptop',
        description:   'Speedy general performance; Strong audio',
        image:         'http://www.hp.com/#video-spectre-x360',

        product_type:  'laptop',
        pc_type:       'gaming',
        target_user:   'gamer',
        time_frame:    '9/15/2017',

        toaster_type:  'footer-buy',
        active_status: 'inactive',

        id_person:  '325629ab-8cd3-4653-97fb-ed2904b553e9',

        user_action: {
            settings: 3,
            cancel: 10,
            buys:   15,
            ignores: 2
        }
    }
];

if ( typeof exports !== "undefined" && exports !== null ) {
    if (typeof module !== 'undefined' && module.exports) {
        exports.DataProxyEntries = DataProxyEntries;
    }
}

//export default DiscountEntries;

