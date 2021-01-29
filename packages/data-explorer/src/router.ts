import Vue from 'vue'
import Router from 'vue-router'
import MainView from './views/MainView.vue'

Vue.use(Router)

const packageJson = require('../package.json')

const router = new Router({
  base: process.env.NODE_ENV === 'production' ? packageJson.name : process.env.BASE_URL,
  routes: [
    {
      path: '/:entity',
      component: MainView,
      name: 'main-view'
    },
    { path: '*',
      redirect: {
        name: 'main-view',
        params: { entity: 'sys_ts_DataExplorerEntitySettings' },
        query: { page: '1', size: '20' }
      }
    }
  ]
})

export default router
