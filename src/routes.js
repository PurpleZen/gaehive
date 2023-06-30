import Home from './pages/Home.vue'
import Queue from './pages/Queue.vue'
import Resources from './pages/Resources.vue'
import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'
import Unauthorized from './pages/401.vue'


export const routes = [
  { 
    path: '/', 
    component: Home,
    props: true,
  },
  {
    path: '/host-queue',
    component: Queue,
  },
  {
    path: '/resources',
    component: Resources,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/unauthorized',
    component: Unauthorized,
  },
  { path: '/:path(.*)', component: NotFound },
]