import { toMetaData } from '../../../src/repository/metaDataResponseMapper'
import { MetaData } from '../../../src/types/MetaData'
import { ResponseEntityType } from '../../../src/types/EntityTypeV3'
import apiResponse from '../mocks/metaDataV3ResponseMock'

describe('metaDataResponseMapper', () => {
  describe('toMetaData', () => {
    let metaData: MetaData
    beforeAll(() => {
      metaData = toMetaData(<ResponseEntityType> apiResponse)
      console.log(metaData)
    })

    it('should contain a id', () => expect(metaData.id).toEqual('mock-entity'))
  })
})
