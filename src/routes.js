import Main from './pages/Main.vue'

import Home from './pages/Home.vue'
import Resources from './pages/Resources.vue'
import NotFound from './pages/404.vue'

import HivezineHome from './pages/hivezine/HivezineHome.vue'
import HivezinePost from './pages/hivezine/HivezinePost.vue'
import HivezineWrite from './pages/hivezine/HivezineWrite.vue'
import HivezineWriters from './pages/hivezine/HivezineWriters.vue'

import Managers from './pages/managers/Managers.vue'
import ManagersEdit from './pages/managers/ManagersEdit.vue'

import FollowingGuidelines from './pages/docs/FollowingGuidelines.vue'
import WritersGuide from './pages/docs/WritersGuide.vue'

import Login from './pages/Login.vue'

export const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { 
        path: '/', 
        component: Home,
      },
      {
        path: '/hivezine/:pg*',
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
        path: '/hivezine/writers',
        component: HivezineWriters,
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
        path: '/docs/writers-guide',
        component: WritersGuide,
      },
      {
        path: '/resources',
        component: Resources,
      },
      { 
        path: '/:path(.*)',
        component: NotFound
      },
    ]
  },
  {
    path: '/login',
    component: Login,
  },
]