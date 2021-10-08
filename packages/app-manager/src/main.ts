import Vue from 'vue'
import AppManager from './AppManager.vue'
import store from './store'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.min.css'

import { ModalPlugin, ButtonPlugin, FormCheckboxPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)
Vue.use(ButtonPlugin)
Vue.use(FormCheckboxPlugin)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(AppManager)
}).$mount('#app-manager')
