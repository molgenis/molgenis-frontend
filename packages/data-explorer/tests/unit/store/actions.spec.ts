import actions from '@/store/actions'

const mockResponses: {[key:string]: Object} = {
  '/api/data/entity': { 'loaded': true },
  '/api/v2/entity': { meta: { 'loaded': true } },
  '/api/data/settingsEntity?q=table=="entity"': { items: [{ data: { id: 'blaat', shop: true } }] }
}
jest.mock('@molgenis/molgenis-api-client', () => {
  return {
    get: (url: string) => Promise.resolve(mockResponses[url]),
    post: jest.fn()
  }
})

describe('actions', () => {
  describe('loadTableData', () => {
    it('loads the selected table data', async (done) => {
      const commit = jest.fn()
      const state = { tableName: 'entity' }
      await actions.loadTableData({ commit, state })
      expect(commit).toHaveBeenCalledWith('setTableData', { 'loaded': true })
      done()
    })
  })
  describe('loadTableMetaData', () => {
    it('loads the selected metadata', async (done) => {
      const commit = jest.fn()
      const state = { tableName: 'entity' }
      await actions.loadTableMetaData({ commit, state })
      expect(commit).toHaveBeenCalledWith('setTableMetaData', { 'loaded': true })
      done()
    })
  })
  describe('getTableSettings', () => {
    it('gets the settings for the selected table', async (done) => {
      const commit = jest.fn()
      const state = { isShop: false, settingsRowId: '', settingsTable: 'settingsEntity' }
      await actions.getTableSettings({ commit, state }, { tableName: 'entity' })
      expect(commit).toHaveBeenCalledWith('setIsShop', true)
      expect(commit).toHaveBeenCalledWith('setSettingsRowId', 'blaat')
      done()
    })
  })
})
