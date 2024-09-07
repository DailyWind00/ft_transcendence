import Vue, { createApp } from '@vue/compat';
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(router)
Vue.use(store)
Vue.use(i18n)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.globalProperties.productionTip = false
const app = createApp(App).$mount('#root');
app.mount('#app')
