import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@molgenis-ui/components-library/dist/components-library.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faCaretRight,
  faExclamationCircle,
  faSpinner,
  faTimes,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons'

library.add(faCaretRight, faTimes, faSpinner, faExclamationCircle, faAngleRight)

Vue.directive('add-class-hover', {
  bind (el, binding, vnode) {
    const { value = '' } = binding
    const values = value.split(' ')
    el.addEventListener('mouseenter', () => {
      values.forEach(value => {
        el.classList.add(value)
      })
    })
    el.addEventListener('mouseleave', () => {
      values.forEach(value => {
        el.classList.remove(value)
      })
    })
  },
  unbind (el, binding, vnode) {
    el.removeEventListener('mouseenter', vnode)
    el.removeEventListener('mouseleave', vnode)
  }
})

Vue.use(BootstrapVue)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
