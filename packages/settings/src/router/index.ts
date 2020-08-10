import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SettingsUi from '@/components/SettingsUi.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/sys_set_app'
  },
  {
    path: '/:setting',
    component: SettingsUi
  }
]

const router = new VueRouter({
  mode: 'history',
  // @ts-ignore
  base: window.__INITIAL_STATE__.baseUrl,
  routes
})

export default router
