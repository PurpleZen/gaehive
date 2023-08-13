import Home from './pages/Home.vue'
import NotFound from './pages/404.vue'


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
        path: '/:path(.*)',
        component: NotFound
      },

  
  
]