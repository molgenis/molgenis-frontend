import { toMetaData } from '../../../src/repository/metaDataResponseMapper'
import { MetaData } from '../../../src/types/MetaData'
import { EntityType } from '../../../src/types/MetaResponseV3'
import apiResponse from '../mocks/metaDataV3ResponseMock'

describe('metaDataResponseMapper', () => {
  describe('toMetaData', () => {
    let metaData: MetaData
    beforeAll(() => {
      metaData = toMetaData(<EntityType> apiResponse)
      console.log(metaData)
    })

    it('should contain a id', () => expect(metaData.id).toEqual('mock-entity'))
  })
})
