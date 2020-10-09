import { BootstrapVue } from 'bootstrap-vue'
import Vue from 'vue'
import 'bootstrap'
import App from './App.vue'
import router from './router'
import store from './store/store'

// @ts-ignore
import i18n from '@molgenis/molgenis-i18n-js'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// @ts-ignore
import DateRangePicker from 'vue2-daterange-picker'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSlider from 'vue-slider-component'

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import 'vue-slider-component/theme/default.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

// Catch query parameters to render them when accessing a bookmark
router.beforeEach((to, from, next) => {
  store.commit('setBookmark', to.query.bookmark ? to.query.bookmark : '')
  next()
})
// Setup event bus for n-level deep child -> parent events
// This way the mainView can coordinate the events
Vue.prototype.$eventBus = new Vue()

Vue.use(i18n, {
  lng: 'en',
  fallbackLng: 'en',
  namespace: ['dataexplorer'],
  callback () {
    new Vue({
      components: {DateRangePicker, FontAwesomeIcon, VueSlider},
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
