import Home from './pages/Home.vue'
import HivezineHome from './pages/HivezineHome.vue'
import HivezineWrite from './pages/HivezineWrite.vue'
import Queue from './pages/Queue.vue'
import Resources from './pages/Resources.vue'
import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'

export const routes = [
  { 
    path: '/', 
    component: Home,
    props: true,
  },
  {
    path: '/hivezine',
    component: HivezineHome,
  },
  {
    path: '/hivezine/new',
    component: HivezineWrite,
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
  { path: '/:path(.*)', component: NotFound },
]