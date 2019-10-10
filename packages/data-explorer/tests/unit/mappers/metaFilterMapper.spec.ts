import * as metaFilterMapper from '@/mappers/metaFilterMapper'

// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import meta from '../mocks/metaDataResponseMock'

jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn()
}))

describe('metaFilterMapper', () => {
  beforeEach(() => {
    api.get.mockReset()
  })

  describe('mapMetaToFilters', () => {
    it('create an empty filter definition from metadata', async () => {
      const resp = await metaFilterMapper.mapMetaToFilters({ ...meta, attributes: [] })
      expect(resp).toEqual({ 'definition': [], 'shown': [] })
    })
    it('create an filter definition from metadata', async () => {
      const resp = await metaFilterMapper.mapMetaToFilters(meta)
      console.log(JSON.stringify(resp))
      expect(JSON.stringify(resp)).toEqual('{"definition":[{"name":"country","label":"country","type":"checkbox-filter","collapsable":true,"collapsed":false,"maxVisibleOptions":10},{"name":"test","label":"test","type":"range-filter","collapsable":true,"collapsed":false,"max":10,"min":-10,"useSlider":true},{"name":"age_groups","label":"age_groups","type":"checkbox-filter","collapsable":true,"collapsed":false,"maxVisibleOptions":10}],"shown":[]}')
    })
  })
})
