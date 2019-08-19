import actions from '@/store/actions'

const mockResponses: {[key:string]: Object} = {
  '/api/entity/entity': { 'loaded': true },
  '/api/v2/entity': { meta: { 'loaded': true } }
}
jest.mock('@molgenis/molgenis-api-client', () => {
  return {
    get: (url: string) => Promise.resolve(mockResponses[url]),
    post: jest.fn()
  }
})

describe('actions', () => {
  describe('loadEntity', () => {
    it('loads the selected entity data', async (done) => {
      const commit = jest.fn()
      const state = { activeEntity: 'entity' }
      await actions.loadEntity({ commit, state })
      expect(commit).toHaveBeenCalledWith('setEntityData', { 'loaded': true })
      done()
    })
  })
  describe('loadMetaData', () => {
    it('loads the selected metadata', async (done) => {
      const commit = jest.fn()
      const state = { activeEntity: 'entity' }
      await actions.loadMetaData({ commit, state })
      expect(commit).toHaveBeenCalledWith('setMetaData', { 'loaded': true })
      done()
    })
  })
})
