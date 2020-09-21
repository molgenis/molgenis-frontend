import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import { AppManagerState } from '@/types/AppManagerState'

Vue.use(Vuex)

const state: AppManagerState = {
  /**
   * List of available apps
   */
  apps: [],

  /**
   * Application wide error message
   */
  error: '',

  /**
   * Switch to indicate if the application is in a loading state
   */
  loading: true
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  }
})
