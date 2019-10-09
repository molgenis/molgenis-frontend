import * as metaFilterMapper from '@/mappers/metaFilterMapper'

// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import meta from '../mocks/metaDataResponseMock'

jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn()
}))

const fetchOptionsFunction = () => {}

// jest.mock('./utils/mapperUtils', () => ({
//   fetchFieldOptions: jest.fn()
// }))

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
      expect(resp).toEqual({ definition: [
        {
          collapsable: true,
          collapsed: false,
          label: 'country',
          name: 'country',
          maxVisibleOptions: 10,
          options: fetchOptionsFunction,
          type: 'checkbox-filter'
        },
        {
          collapsable: true,
          collapsed: false,
          label: 'age_groups',
          name: 'age_groups',
          maxVisibleOptions: 10,
          options: fetchOptionsFunction,
          type: 'checkbox-filter'
        }
      ],
      shown: []
      })
    })
  })
})
