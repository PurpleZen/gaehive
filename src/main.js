import { createApp } from 'vue'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import { createMetaManager  } from 'vue-meta';
import VueConfetti from 'vue-confetti'

const app = createApp(App)

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    if (!to.hash) {
      document.body.scrollTop = 0;
      document.getElementsByClassName("page")[0].scrollTop = 0
    }
  }
})

app.use(router)
app.use(VueConfetti)
app.use(createMetaManager())

app.mount('body')