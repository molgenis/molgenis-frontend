export const ADD_ALERTS = '__ADD_ALERTS__'
export const REMOVE_ALERT = '__REMOVE_ALERT__'
export const ADD_JOB = '__ADD_JOB__'
export const UPDATE_JOB = '__UPDATE_JOB__'
export const REMOVE_JOB = '__REMOVE_JOB__'
export const SET_FOLDER = '__SET_FOLDER__'
export const SET_RESOURCES = '__SET_RESOURCES__'
export const SET_SELECTED_RESOURCES = '__SET_SELECTED_RESOURCES__'
export const SET_SHOW_HIDDEN_RESOURCES = '__SET_SHOW_HIDDEN_RESOURCES__'
export const SET_CLIPBOARD = '__SET_CLIPBOARD__'
export const RESET_CLIPBOARD = '__RESET_CLIPBOARD__'

export default {
  [ADD_ALERTS] (state, alerts) {
    state.alerts = state.alerts.concat(alerts)
  },
  [REMOVE_ALERT] (state, index) {
    const alerts = state.alerts.slice()
    alerts.splice(index, 1)
    state.alerts = alerts
  },
  [ADD_JOB] (state, job) {
    state.jobs = state.jobs.concat([job])
  },
  [UPDATE_JOB] (state, job) {
    state.jobs = state.jobs.map(
      existingJob => existingJob.type === job.type && existingJob.id === job.id
        ? job : existingJob)
  },
  [REMOVE_JOB] (state, job) {
    state.jobs = state.jobs.filter(existingJob => !(existingJob.type === job.type && existingJob.id === job.id))
  },
  [SET_FOLDER] (state, folder) {
    state.folder = folder
  },
  [SET_RESOURCES] (state, resources) {
    state.selectedResources = []
    state.resources = resources
  },
  [SET_SELECTED_RESOURCES] (state, resources) {
    state.selectedResources = resources
  },
  [SET_SHOW_HIDDEN_RESOURCES] (state, showHiddenResources) {
    state.showHiddenResources = showHiddenResources
  },
  [SET_CLIPBOARD] (state, clipboard) {
    state.selectedResources = []
    state.clipboard = clipboard
  },
  [RESET_CLIPBOARD] (state) {
    state.clipboard = null
  }
}
