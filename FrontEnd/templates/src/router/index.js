import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    redirect: '/home' // Redirige vers la route 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView/HomeView.vue')

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView/AboutView.vue')
    
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView/RegisterView.vue')
  },
  {
    path: '/gameselect',
    name: 'gameselect',
    component: () => import('../views/GameSelect/GameSelect.vue')
  },
  {
    path: '/player_info',
    name: 'player_info',
    component: () => import('../views/Player_info/Player_info.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingView/SettingView.vue')

  },
  {
    path: '/tictactoe/game',
    name: 'tictactoe_game',
    component: () => import('../views/tictactoe/gamevue/gameVue.vue')
  },
  {
    path: '/tictactoe/launch',
    name: 'tictactoe_launch',
    component: () => import('../views/tictactoe/launchgameVue/launchgame.vue')
  },
  {
    path: '/tictactoe/history',
    name: 'tictactoe_history',
    component: () => import('../views/tictactoe/historyview/historyVue.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
