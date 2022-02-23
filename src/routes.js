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
import ReadsSearch from 'views/ReadsSearch';
import ErrorPageNotFound from 'views/ErrorPageNotFound';
import Overview from './views/Overview';
import APIInfo from './views/APIInfo';
import CustomVisualization from './views/CustomVisualization';
import PatientsOverview from './views/PatientsOverview';
import ClinicalData from './views/ClinicalData';
import VariantsSearch from './views/VariantsSearch';
import BeaconSearch from './views/BeaconSearch';
import Help from './views/Help';
import BamBrowser from './views/BamBrowser';
import VcfBrowser from './views/VcfBrowser';
import FileDirectory from './views/FileDirectory';

const routes = [
  {
    path: '/overview',
    name: 'Overview',
    icon: 'nc-icon nc-bank',
    component: Overview,
    layout: '',
  },
  {
    path: '/patients-overview',
    name: 'Patients Overview',
    icon: 'nc-icon nc-single-02',
    component: PatientsOverview,
    layout: '',
  },
  {
    path: '/clinical-metadata',
    name: 'Clinical Metadata',
    icon: 'nc-icon nc-single-copy-04',
    component: ClinicalData,
    layout: '',
  },
  {
    path: '/custom-visualization',
    name: 'Custom Visualization',
    icon: 'nc-icon nc-chart-pie-36',
    component: CustomVisualization,
    layout: '',
  },
  {
    path: '/file-directory',
    name: 'File Directory',
    icon: 'nc-icon nc-book-bookmark',
    component: FileDirectory,
    layout: '',
  },
  {
    path: '/variants-search',
    name: 'Variants Search',
    icon: 'nc-icon nc-zoom-split',
    component: VariantsSearch,
    layout: '',
  },
  {
    path: '/vcf-browser',
    name: 'VCF Browser',
    icon: 'nc-icon nc-compass-05',
    component: VcfBrowser,
    layout: '',
  },
  {
    path: '/reads-search',
    name: 'Reads Search',
    icon: 'nc-icon nc-zoom-split',
    component: ReadsSearch,
    layout: '',
  },
  {
    path: '/bam-browser',
    name: 'BAM Browser',
    icon: 'nc-icon nc-compass-05',
    component: BamBrowser,
    layout: '',
  },
  {
    path: '/beacon-search',
    name: 'Beacon Search',
    icon: 'nc-icon nc-zoom-split',
    component: BeaconSearch,
    layout: '',
  },
  {
    path: '/api-info',
    name: 'API info',
    icon: 'nc-icon nc-sound-wave',
    component: APIInfo,
    layout: '/v2/dashboard',
  },
  {
    path: '/help',
    name: 'Help',
    icon: 'nc-icon nc-alert-circle-i',
    component: Help,
    layout: '',
  },
  {
    path: '*',
    name: '', // Removed to not show in sidebar
    icon: '', // Removed to not show in sidebar
    component: ErrorPageNotFound,
    layout: '',
  },
];
export default routes;
