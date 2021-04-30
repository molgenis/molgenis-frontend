import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import DataRowEdit from '@/components/DataRowEdit.vue'

Vue.use(VueRouter)


// @ts-ignore
const {baseUrl, dataExplorerBaseUrl} = window.__INITIAL_STATE__

// @ts-ignore
console.log(window.__INITIAL_STATE__)

  const routes: Array<RouteConfig> = [
  {
    path: '/:dataTableId/:dataRowId',
    props: true,
    name: 'update',
    component: DataRowEdit
  },
  {
    path: '/:dataTableId',
    props: true,
    name: 'create',
    component: DataRowEdit
  },
  {
    path: '/',
    redirect: () => {
      window.location.href = window.location.origin + dataExplorerBaseUrl
      return window.location.href
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: baseUrl,
  routes
})

export default router
