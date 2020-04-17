import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/store/state'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import getters from '@/store/getters'
import ApplicationState from '@/types/ApplicationState'

const { store: context } = require('@molgenis/molgenis-ui-context').default
const packageJson = require('../../package.json')
context.state.appVersion = packageJson.version

Vue.use(Vuex)

export default new Vuex.Store({
  state: state as ApplicationState,
  mutations,
  actions,
  getters,
  modules: { context }
})
