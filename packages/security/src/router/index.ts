import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import GroupOverview from '@/components/GroupOverview.vue'
import GroupCreate from '@/components/GroupCreate.vue'
import GroupDetail from '@/components/GroupDetail.vue'
import MemberAdd from '@/components/MemberAdd.vue'
import MemberDetail from '@/components/MemberDetail.vue'

Vue.use(VueRouter)

// @ts-ignore
const { baseUrl } = window.__INITIAL_STATE__

const routes: Array<RouteConfig> = [
  {
    path: '/group',
    name: 'groupOverView',
    component: GroupOverview
  },
  {
    path: '/group/create',
    name: 'createGroup',
    component: GroupCreate
  },
  {
    path: '/group/:name',
    name: 'groupDetail',
    props: true,
    component: GroupDetail
  },
  {
    path: '/group/:groupName/addMember',
    name: 'addMember',
    props: true,
    component: MemberAdd
  },
  {
    path: '/group/:groupName/member/:memberName',
    name: 'memberDetail',
    props: true,
    component: MemberDetail
  },
  {
    path: '/',
    redirect: '/group'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: baseUrl,
  routes
})

export default router
