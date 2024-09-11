import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";



import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


Vue.config.productionTip = false

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select';
// import 'flag-icon-css/css/flag-icon.min.css';
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
