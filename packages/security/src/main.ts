import Vue from 'vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
// @ts-ignore
import i18n from '@molgenis/molgenis-i18n-js'
import SecurityApp from './SecurityApp.vue'

import 'font-awesome/css/font-awesome.min.css'

Vue.use(BootstrapVue)

// @ts-ignore
const { lng, fallbackLng, isSuperUser } = window.__INITIAL_STATE__

Vue.config.productionTip = false

Vue.use(i18n, {
  lng: lng,
  fallbackLng: fallbackLng,
  namespace: ['security-ui'],
  callback () {
    /* eslint-disable no-new */
    new Vue({
      router,
      store,
      render: h => h(SecurityApp)
    }).$mount('#security-ui-plugin')

    store.commit('setLoginUser', { name: 'admin', isSuperUser: isSuperUser })
  }
})
