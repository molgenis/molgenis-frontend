import Vue from 'vue'
import VueRouter from 'vue-router'
import DataRowPermissions from '../views/DataRowPermissions'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DataRowPermissions',
    component: DataRowPermissions
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
