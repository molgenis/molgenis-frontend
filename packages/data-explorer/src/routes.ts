import MainView from './views/MainView.vue'
import DataRowEdit from '@/components/DataRowEdit.vue'

const routes = [
  {
    path: '/explorer/:entity/create',
    props: true,
    name: 'de-create',
    component: DataRowEdit
  },
  {
    path: '/explorer/:entity/:dataRowId/edit',
    props: true,
    name: 'de-edit',
    component: DataRowEdit
  },
  {
    path: '/explorer/:entity/:view',
    component: MainView,
    name: 'de-view'
  },
  {
    path: '/',
    redirect: to => {
      let entity = 'sys_ts_DataExplorerEntitySettings'
      if (to.params.entity) {
        entity = to.params.entity
      }

      return {
        name: 'de-view',
        params: { entity, view: 'CardView' },
        query: { page: '1', size: '20', hideSidebar: 'false' }
      }
    }
  }
]

export default routes
