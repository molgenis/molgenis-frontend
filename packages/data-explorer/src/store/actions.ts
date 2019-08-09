// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { tryAction } from './helpers'

export default {
  loadEntity: tryAction(async ({ commit, state } : any) => {
    const response = await api.get(`/api/entity/${state.activeEntity}`)
    commit('setEntityData', response)
  }),
  loadMetaData: tryAction(async ({ commit, state } : any) => {
    const response = await api.get(`/api/v2/${state.activeEntity}`)
    commit('setMetaData', response.meta)
  })
}
