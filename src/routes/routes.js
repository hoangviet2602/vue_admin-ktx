import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Room from 'src/pages/ManageRoom.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Thongbao.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import Details from 'src/pages/DetailsRequest.vue'
import EditRoom from 'src/pages/EditRoom.vue'
import StdProfile from 'src/pages/StdProfile.vue' 
import Bills from 'src/pages/Bill.vue'
import ListSV from 'src/pages/ListSinhVien.vue'
const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'details',
        name: 'Details',
        component: Details
      },
      {
        path: 'std-profile',
        name: 'Stdprofile',
        component: StdProfile
      },
      {
        path: 'list-sv',
        name: 'ListSV',
        component: ListSV
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'room',
        name: 'Room',
        component: Room
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'edit-room',
        name: 'Edit Room',
        component: EditRoom
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'bills',
        name: 'Bills',
        component: Bills
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
