// @ts-ignore
export const INITIAL_STATE = window.__INITIAL_STATE__ || {}

const state = {
  alerts: [],
  token: null,
  query: null,
  folder: null,
  resources: [],
  selectedResources: [],
  clipboard: null,
  jobs: []
}

export default state
