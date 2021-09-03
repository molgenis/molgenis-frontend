import Vue from 'vue'
import VueRouter from 'vue-router'
import RlsEntitySelector from '../views/RlsEntitySelector'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SelectEntity',
    component: RlsEntitySelector
  },
  {
    path: '/:entityId/',
    name: 'SelectEntitityObject',
    props: true,
    component: () => import('../views/RlsObjectSelector.vue')
  },
  {
    path: '/:entityId/:objectId',
    name: 'DataRowPermissions',
    props: true,
    component: () => import('../views/DataRowPermissions.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
