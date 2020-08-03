import Vue from 'vue'
import App from './App.vue'
import router from './router'
// @ts-ignore
import i18n from '@molgenis/molgenis-i18n-js'

Vue.config.productionTip = false
// @ts-ignore
const { lng, fallbackLng } = window.__INITIAL_STATE__

Vue.use(i18n, {
  lng: lng,
  fallbackLng: fallbackLng,
  namespace: ['settings', 'ui-form'],
  callback () {
    /* eslint-disable no-new */
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#settings-plugin')
  }
})
