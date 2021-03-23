import actions from '@/store/reference/actions'
import * as metaDataRepository from '@/repository/metaDataRepository'
import * as dataRepository from '@/repository/dataRepository'
import * as metaDataService from '@/repository/metaDataService'

jest.mock('@/repository/metaDataRepository', () => {
  return { fetchMetaDataByURL: jest.fn() }
})

jest.mock('@/repository/dataRepository', () => {
  return { getTableDataWithLabel: jest.fn() }
})

jest.mock('@/repository/metaDataService', () => {
  return { getAttributesfromMeta: jest.fn() }
})

describe('reference actions', () => {
  const metaData: any = {
    id: 'refEntityId',
    idAttribute: {
      name: 'idAttributeName'
    },
    labelAttribute: {
      name: 'labelAttributeName'
    }
  }
  // @ts-ignore
  metaDataService.getAttributesfromMeta.mockReturnValue([ 'a1', 'a2' ])
  // @ts-ignore
  metaDataRepository.fetchMetaDataByURL.mockResolvedValue(metaData)
  // @ts-ignore
  dataRepository.getTableDataWithLabel.mockResolvedValue([ 'data' ])
  describe('fetchRefData', () => {
    it('should fetch the single reference data if passed a object', async () => {
      const state = {}
      const payload = {
        refEntityType: 'http://thisisa/entity',
        value: { id: 'x-refId' }
      }
      await actions.fetchRefData({ state }, payload)
      expect(dataRepository.getTableDataWithLabel).toHaveBeenCalledWith(
        'refEntityId',
        metaData,
        [ 'a1', 'a2', 'idAttributeName', 'labelAttributeName' ],
        'idAttributeName==(x-refId)'
      )
    })

    it('should fetch the mref data if passed a list using an in query', async () => {
      const state = {}
      const payload = {
        refEntityType: 'http://thisisa/entity',
        value: [ { id: 'm-refId1' }, { id: 'm-refId2' } ]
      }
      metaData.labelAttribute = undefined
      await actions.fetchRefData({ state }, payload)
      expect(dataRepository.getTableDataWithLabel).toHaveBeenCalledWith(
        'refEntityId',
        metaData,
        [ 'a1', 'a2', 'idAttributeName' ],
        'idAttributeName=in=(m-refId1,m-refId2)'
      )
    })
  })
})
