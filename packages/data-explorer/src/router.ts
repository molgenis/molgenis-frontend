import Vue from 'vue'
import Router from 'vue-router'
import MainView from './views/MainView.vue'

Vue.use(Router)

const packageJson = require('../package.json')

export default new Router({
  base: process.env.NODE_ENV === 'production' ? packageJson.name : process.env.BASE_URL,
  routes: [
    {
      path: '/:entity',
      name: 'main-view',
      component: MainView
    },
    {
      path: '*',
      redirect: {
        name: 'main-view',
        params: { entity: 'sys_ts_DataExplorerEntitySettings' }
      }
    }
  ]
})
