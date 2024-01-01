import Home from './pages/Home.vue'
import Resources from './pages/Resources.vue'
import NotFound from './pages/404.vue'

import HivezineHome from './pages/hivezine/HivezineHome.vue'
import HivezinePost from './pages/hivezine/HivezinePost.vue'
import HivezineEdit from './pages/hivezine/HivezineEdit.vue'
import HivezineWriters from './pages/hivezine/HivezineWriters.vue'

import Managers from './pages/managers/Managers.vue'

import Birthdays from './pages/Birthdays.vue'

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
    path: '/hivezine/edit/:id',
    component: HivezineEdit,
  },

      {
        path: '/hivezine/writers',
        component: HivezineWriters,
      },
  
      {
        path: '/resources',
        component: Resources,
      },

  { 
    path: '/birthdays',
    component: Birthdays
  },
  
      { 
        path: '/:path(.*)',
        component: NotFound
      }

  
  
]