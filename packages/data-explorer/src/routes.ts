import DataRowEdit from '@/components/DataRowEdit.vue'
import EntityDetail from '@/views/EntityDetail.vue'
import EditDetailTemplate from '@/views/EditDetailTemplate.vue'
import MainView from './views/MainView.vue'
import Navigator from '@/components/navigator/Navigator.vue'

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
    path: '/explorer/:entity/:dataRowId?/edit',
    props: true,
    name: 'de-edit',
    component: DataRowEdit
  },
  {
    path: '/:entityType/:entity/detail',
    props: true,
    name: 'entity-detail',
    component: EntityDetail
  },
  {
    path: '/:entityType/:entity/editor',
    props: true,
    name: 'edit-detail-template',
    component: EditDetailTemplate
  },
  {
    path: '/navigator',
    name: 'nav-view',
    component: Navigator
  },
  {
    path: '/navigator/:folderId',
    name: 'nav-view-folder',
    component: Navigator
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
