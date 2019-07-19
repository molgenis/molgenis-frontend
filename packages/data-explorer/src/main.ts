import Vue from 'vue'
import App from './App.vue'

// @ts-ignore
import i18n from '@molgenis/molgenis-i18n-js'

Vue.config.productionTip = false

Vue.use(i18n, {
  namespace: ['filters'],
  callback () {
    new Vue({
      render: h => h(App)
    }).$mount('#app')
  }
})
