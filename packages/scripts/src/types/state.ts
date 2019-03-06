// export const enum ReadyState { loading = 1, failed, ready }
export enum ReadyState { loading = 'loading', failed = 'failed', ready = 'ready' }

export interface State{
  scripts: any[]
  scriptTypes: string[]
  loaded: boolean
}

export default State
