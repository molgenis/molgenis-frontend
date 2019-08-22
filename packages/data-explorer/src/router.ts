import Vue from 'vue'
import Router from 'vue-router'
import MainView from './views/MainView.vue'

Vue.use(Router)

const packageJson = require('../package.json')

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? packageJson.name : process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      component: MainView
    },
    {
      path: '/:entity',
      name: 'main-view',
      component: MainView
    }
  ]
})
