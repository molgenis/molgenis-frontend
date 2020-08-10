import { AppManagerState } from '@/types/AppManagerState'
import { App } from '@/types/App'

export default {
  'SET_ERROR' (state: AppManagerState, error: string) {
    state.error = error
  },

  'SET_LOADING' (state: AppManagerState, loading: boolean) {
    state.loading = loading
  },

  'UPDATE_APPS' (state: AppManagerState, apps: App[]) {
    state.apps = apps
  }
}
