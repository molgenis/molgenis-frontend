import Vue from 'vue'
import App from './App.vue'
import router from './router'
// @ts-ignore
import i18n from '@molgenis/molgenis-i18n-js'

Vue.config.productionTip = false

// @ts-ignore
const {lng, fallbackLng} = window.__INITIAL_STATE__

Vue.use(i18n, {
  lng: lng,
  fallbackLng: fallbackLng,
  namespace: ['data-row-edit', 'ui-form'],
  callback () {
    /* eslint-disable no-new */
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#data-row-edit-plugin')
  }
})