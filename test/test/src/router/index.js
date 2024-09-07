import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './../views/HomeView/HomeView.vue'
import AboutView from '../views/AboutView/AboutView.vue'
import LoginView from '../views/LoginView/LoginView.vue'
import RegisterView from '../views/RegisterView/RegisterView.vue'
import GameSelect from '../views/GameSelect/GameSelect.vue'
import PlayerInfo from '../views/Player_info/Player_info.vue'
import SettingsView from '../views/SettingView/SettingView.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/gameselect', component: GameSelect },
  { path: '/player_info', component: PlayerInfo },
  { path: '/settings', component: SettingsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
