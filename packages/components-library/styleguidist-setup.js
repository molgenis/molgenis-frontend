import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue'
import mocks from '@/mockdata'

Vue.prototype.$mocks = mocks
Vue.use(BootstrapVue)
