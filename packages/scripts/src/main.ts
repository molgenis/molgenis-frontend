import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
// @ts-ignore
import i18n from '@molgenis/molgenis-i18n-js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

library.add(faEdit, faTrash, faPlay, faPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)

Vue.use(i18n, {
  lng: window.__INITIAL_STATE__.lng || 'en',
  fallbackLng: window.__INITIAL_STATE__.fallbackLng || 'en',
  namespace: ['scripts'],
  callback () {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#molgenis-scripts')
  }
})
