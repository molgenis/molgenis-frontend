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
    it('create a filter definition from metadata', async () => {
      const resp = await metaFilterMapper.mapMetaToFilters(meta)
      expect(resp).toEqual({ 'definition': [], 'shown': [] })
    })
  })
})
