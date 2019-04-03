import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from '@/router'
import store from '@/store/store'
// @ts-ignore
import i18n from '@molgenis/molgenis-i18n-js'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.use(i18n, {
  // @ts-ignore
  lng: window.__INITIAL_STATE__.lng || 'en',
  // @ts-ignore
  fallbackLng: window.__INITIAL_STATE__.fallbackLng || 'en',
  namespace: ['login', 'ui-form'],
  callback () {
    new Vue({
      router,
      // @ts-ignore
      store,
      render: h => h(App)
    }).$mount('#login')
  }
})
