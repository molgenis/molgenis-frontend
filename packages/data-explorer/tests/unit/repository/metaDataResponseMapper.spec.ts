import { toMetaData } from '../../../src/repository/metaDataResponseMapper'
import { MetaData } from '../../../src/types/MetaData'
import { ResponseEntityType } from '../../../src/types/EntityTypeV3'
import apiResponse from '../mocks/metaDataV3ResponseMock'

describe('metaDataResponseMapper', () => {
  describe('toMetaData', () => {
    let metaData: MetaData
    beforeAll(() => {
      metaData = toMetaData(<ResponseEntityType> apiResponse)
    })

    it('should contain "mock-entity" as id', () => expect(metaData.id).toEqual('mock-entity'))
    it('should contain "label" a id', () => expect(metaData.label).toEqual('label'))

    describe('when no label is set', () => {
      beforeAll(() => {
        delete apiResponse.data.label
        metaData = toMetaData(<ResponseEntityType> apiResponse)
      })
      it('should contain "label" as empty string', () => expect(metaData.label).toEqual(''))
      afterAll(() => {
        apiResponse.data.label = 'label'
      })
    })

    describe('attribute mapper', () => {
      it('should map attr id', () => expect(metaData.attributes[0].id).toEqual('mock-entity-attribute'))
    })

    describe('when no attribute items are not set', () => {
      beforeAll(() => {
        delete apiResponse.data.attributes.items
        metaData = toMetaData(<ResponseEntityType> apiResponse)
      })
      it('should set attribute as empty list', () => expect(metaData.attributes).toEqual([]))
    })

    describe('when not part of a package', () => {
      beforeAll(() => {
        delete apiResponse.data.package
        metaData = toMetaData(<ResponseEntityType> apiResponse)
      })
      it('should set package to null', () => expect(metaData.package).toEqual(null))
    })

    describe('when extending not a parent', () => {
      beforeAll(() => {
        delete apiResponse.data.extends
        metaData = toMetaData(<ResponseEntityType> apiResponse)
      })
      it('should not set extends prop', () => expect(metaData.extends).toBeUndefined())
    })
  })
})
