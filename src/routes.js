import Home from './pages/Home.vue'
import HivezineHome from './pages/HivezineHome.vue'
import HivezinePost from './pages/HivezinePost.vue'
import HivezineWrite from './pages/HivezineWrite.vue'
import Managers from './pages/Managers.vue'
import ManagersEdit from './pages/ManagersEdit.vue'
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
    path: '/resources',
    component: Resources,
  },
  {
    path: '/login',
    component: Login,
  },
  { path: '/:path(.*)', component: NotFound },
]