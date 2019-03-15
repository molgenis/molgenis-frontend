import Vue from 'vue'
import Router from 'vue-router'
import ListScripts from './views/ListScripts.vue'
import EditScript from './views/EditScript.vue'
import NewScript from './views/NewScript.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // @ts-ignore
  base: window.__INITIAL_STATE__.baseURL || '/',
  routes: [
    {
      path: '/',
      name: 'scripts',
      component: ListScripts
    },
    {
      path: '/add/',
      name: 'newscript',
      component: NewScript
    },
    {
      path: '/edit/:id',
      name: 'editscript',
      component: EditScript
    }
  ]
})
