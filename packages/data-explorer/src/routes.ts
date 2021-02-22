import MainView from './views/MainView.vue'

const routes = [
  {
    path: '/:entity/:view',
    component: MainView,
    name: 'main-view'
  },
  {
    path: '/:entity?',
    redirect: to => {
      let entity = 'sys_ts_DataExplorerEntitySettings'
      if (to.params.entity) {
        entity = to.params.entity
      }

      return {
        name: 'main-view',
        params: { entity, view: 'CardView' },
        query: { page: '1', size: '20', hideSidebar: 'false' }
      }
    }
  }
]

export default routes
