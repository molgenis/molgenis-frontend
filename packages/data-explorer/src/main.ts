import Vue from 'vue'
import App from './App.vue'

// @ts-ignore
import i18n from '@molgenis/molgenis-i18n-js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretRight, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCaretRight, faPlus, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(i18n, {
  namespace: ['filters'],
  callback () {
    new Vue({
      render: h => h(App)
    }).$mount('#app')
  }
})
