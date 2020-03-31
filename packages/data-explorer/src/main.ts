import Vue from 'vue'
import 'bootstrap'
import App from './App.vue'
import router from './router'
import store from './store/store'

// @ts-ignore
import i18n from '@molgenis/molgenis-i18n-js'

Vue.config.productionTip = false

// Catch query parameters to render them when accessing a bookmark
router.beforeEach((to, from, next) => {
  if (to.query.filters) {
    store.commit('setBookmark', to.query)
  }
  next()
})

Vue.use(i18n, {
  lng: 'en',
  fallbackLng: 'en',
  namespace: ['dataexplorer'],
  callback () {
    new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
