import App from './App.vue'
import router from './router'
import store from './store'
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import 'vue-material/dist/theme/default-dark.css' // This line here
Vue.use(VueMaterial)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
