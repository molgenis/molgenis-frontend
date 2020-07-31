import { AppManagerState } from './AppManagerState'

export type VuexContext = {
  state: AppManagerState;
  commit: Function;
  dispatch: Function;
  getters: Record<string, any>;
}
