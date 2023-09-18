import Home from './pages/Home.vue'
import Settings from './pages/Settings.vue'
import NotFound from './pages/404.vue'

import HivezineHome from './pages/hivezine/HivezineHome.vue'
import HivezinePost from './pages/hivezine/HivezinePost.vue'

import Managers from './pages/managers/Managers.vue'

export const routes = [
      { 
        path: '/', 
        component: Home,
      },
      
      {
        path: '/managers',
        component: Managers,
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
        path: '/settings',
        component: Settings,
      },
      { 
        path: '/:path(.*)',
        component: NotFound
      },

  
  
]