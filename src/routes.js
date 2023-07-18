import Home from './pages/Home.vue'
import Resources from './pages/Resources.vue'
import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'

import HivezineHome from './pages/hivezine/HivezineHome.vue'
import HivezinePost from './pages/hivezine/HivezinePost.vue'
import HivezineWrite from './pages/hivezine/HivezineWrite.vue'

import Managers from './pages/managers/Managers.vue'
import ManagersEdit from './pages/managers/ManagersEdit.vue'

import FollowingGuidelines from './pages/docs/FollowingGuidelines.vue'

export const routes = [
  { 
    path: '/', 
    component: Home,
  },
  {
    path: '/hivezine',
    component: HivezineHome,
  },
  {
    path: '/hivezine/post/:id',
    component: HivezinePost,
  },
  {
    path: '/hivezine/new',
    component: HivezineWrite,
  },
  {
    path: '/managers',
    component: Managers,
  },
  {
    path: '/managers/edit',
    component: ManagersEdit,
  },
  {
    path: '/docs/how-we-follow-guidelines',
    component: FollowingGuidelines,
  },
  {
    path: '/resources',
    component: Resources,
  },
  {
    path: '/login',
    component: Login,
  },
  { path: '/:path(.*)', component: NotFound },
]