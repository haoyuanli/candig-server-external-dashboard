/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

*/
import Overview from './views/Overview';
import APIInfo from './views/APIInfo';
import BeaconSearch from './views/BeaconSearch';
import Help from './views/Help';


const routes = [
  {
    path: '/beacon-search',
    name: 'Beacon Search',
    icon: 'nc-icon nc-zoom-split',
    component: BeaconSearch,
    layout: '/dashboard',
  },
  {
    path: '/api-info',
    name: 'API info',
    icon: 'nc-icon nc-sound-wave',
    component: APIInfo,
    layout: '/dashboard',
  },
  {
    path: '/help',
    name: 'Help',
    icon: 'nc-icon nc-bank',
    component: Help,
    layout: '/dashboard',
  },
];
export default routes;
