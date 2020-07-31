import Vue from 'vue'
import AppManager from './AppManager.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(AppManager)
}).$mount('#app-manager')
