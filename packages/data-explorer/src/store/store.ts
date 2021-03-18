import Vue from 'vue'
import Vuex from 'vuex'

import explorerActions from '@/store/explorer/actions'
import explorerGetters from '@/store/explorer/getters'
import explorerMutations from '@/store/explorer/mutations'
import explorerState from '@/store/explorer/state'

import headerActions from '@/store/header/actions'
import headerGetters from '@/store/header/getters'
import headerMutations from '@/store/header/mutations'
import headerState from '@/store/header/state'

import navigatorActions from '@/store/navigator/actions'
import navigatorGetters from '@/store/navigator/getters'
import navigatorMutations from '@/store/navigator/mutations'
import navigatorState from '@/store/navigator/state'

import referenceActions from '@/store/reference/actions'

const uiContextModule = require('@molgenis/molgenis-ui-context').default

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      state: uiContextModule.store.state,
      mutations: uiContextModule.store.mutations
    },
    explorer: {
      actions: explorerActions,
      getters: explorerGetters,
      mutations: explorerMutations,
      namespaced: true,
      state: explorerState
    },
    header: {
      actions: headerActions,
      getters: headerGetters,
      mutations: headerMutations,
      namespaced: true,
      state: headerState
    },
    navigator: {
      actions: navigatorActions,
      getters: navigatorGetters,
      mutations: navigatorMutations,
      namespaced: true,
      state: navigatorState
    },
    reference: {
      namespaced: true,
      actions: referenceActions
    }
  }
})
