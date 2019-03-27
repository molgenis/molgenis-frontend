// @ts-ignore
import { State, ReadyState } from '@/types/state'

export default {
  loadScripts (state: State, scripts: any) {
    state.scripts = scripts
  },
  loadScriptTypes (state: State, types: string[]) {
    state.scriptTypes = types
  },
  setLoadedState (state: State, loaded: boolean) {
    state.loaded = loaded
  }
}
