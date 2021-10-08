import { VuexContext } from '@/types/VuexContext'
// @ts-ignore
import api from '@molgenis/molgenis-api-client'

export default {
  'ACTIVATE_APP' ({ commit, dispatch }: VuexContext, appId: string) {
    api.post('/plugin/appmanager/activate/' + appId).then(() => {
      dispatch('FETCH_APPS')
    }, (error: any) => {
      commit('SET_ERROR', error)
    })
  },

  'DEACTIVATE_APP' ({ commit, dispatch }: VuexContext, appId: string) {
    api.post('/plugin/appmanager/deactivate/' + appId).then(() => {
      dispatch('FETCH_APPS')
    }, (error: any) => {
      commit('SET_ERROR', error)
    })
  },

  'DELETE_APP' ({ commit, dispatch }: VuexContext, appId: string) {
    api.delete_('/plugin/appmanager/delete/' + appId).then(() => {
      dispatch('FETCH_APPS')
    }, (error: any) => {
      commit('SET_ERROR', error)
    })
  },

  'FETCH_APPS' ({ commit }: VuexContext) {
    api.get('/plugin/appmanager/apps').then((apps: any) => {
      commit('UPDATE_APPS', apps)
      commit('SET_LOADING', false)
    }, (error: any) => {
      // could be 'no permission to see apps, please login before continuing'
      commit('SET_ERROR', error)
    })
  },

  'UPLOAD_APP' ({ commit, dispatch }: VuexContext, file: File) {
    api.postFile('/plugin/appmanager/upload', file).then(() => {
      dispatch('FETCH_APPS')
    }, (error: any) => {
      commit('SET_ERROR', error)
    })
  },
  'UPDATE_APP' ({ commit, dispatch }: VuexContext, updateObject: { id: string; file: File; updateConfig: boolean }) {
    let updateUrl = `/plugin/appmanager/update/${updateObject.id}`

    if (updateObject.updateConfig) {
      updateUrl += '?updateConfig=true'
    }

    api.postFile(updateUrl, updateObject.file).then(() => {
      dispatch('FETCH_APPS')
    }, (error: any) => {
      commit('SET_ERROR', error)
    })
  }
}
