import MainView from './views/MainView.vue'
import DataRowEdit from '@/components/DataRowEdit.vue'

export const defaultRouteQuery:any = { page: 1, size: 20, hideSidebar: 'false', view: 'CardView' }

export const routes = [
  {
    path: '/explorer/:entity',
    component: MainView,
    name: 'de-view'
  },
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
    path: '*',
    redirect: to => {
      // No route match? Redirect to the default view route.
      let entity = 'sys_ts_DataExplorerEntitySettings'
      if (to.params.entity) {
        entity = to.params.entity
      }

      return { name: 'de-view', params: { entity }, query: defaultRouteQuery }
    }
  }
]
