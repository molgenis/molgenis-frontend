import ApplicationState from '@/types/ApplicationState'
import Vue from 'vue'

export default {
  setDataDisplayLayout (state: ApplicationState, layout: String) {
    state.dataDisplayLayout = layout
  }
}
