import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin.vue'
import Register from '@/components/Register.vue'
import Reset from '@/components/Reset.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // @ts-ignore
  base: window.__INITIAL_STATE__.baseUrl,
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset
    }
  ]
})
