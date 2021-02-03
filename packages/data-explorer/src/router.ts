import Vue from 'vue'
import Router from 'vue-router'
import MainView from './views/MainView.vue'

Vue.use(Router)

const packageJson = require('../package.json')

const router = new Router({
  base: process.env.NODE_ENV === 'production' ? packageJson.name : process.env.BASE_URL,
  routes: [
    {
      path: '/:entity/:view',
      component: MainView,
      name: 'main-view'
    },
    { path: '/:entity?',
      redirect: to => {
        let entity = 'sys_ts_DataExplorerEntitySettings'
        if (to.params.entity) {
          entity = to.params.entity
        }

        return {
          name: 'main-view',
          params: { entity, view: 'CardView' },
          query: { page: '1', size: '20' }
        }
      }
    }
  ]
})

export default router
