import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FirebaseVue from './assets/firebase/index'
import './assets/SCSS/app.scss'
import './utils/diretivas'

Vue.use(FirebaseVue)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
