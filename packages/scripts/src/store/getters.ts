import State from '@/types/state'

export default {
  scripts: (state: State): any => state.scripts,
  scriptTypes: (state: State): any => state.scriptTypes,
  loaded: (state: State): any => state.loaded
}
