import * as metaFilterMapper from '@/mappers/metaFilterMapper'

// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import meta from '../mocks/metaDataResponseMock'

const ageGroupOptions = {
  meta: {
    idAttribute: 'age_group_id',
    labelAttribute: 'age_group_label'
  },
  items: [{
    age_group_id: 1,
    age_group_label: '1'
  }]
}

const countryOptions = {
  meta: {
    idAttribute: 'country_id',
    labelAttribute: 'country_label'
  },
  items: [
    {
      country_id: 'DE',
      country_label: 'Germany'
    },
    {
      country_id: 'NL',
      country_label: 'Netherlands'
    }
  ]
}

jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn()
}))

describe('metaFilterMapper', () => {
  beforeEach(() => {
    api.get.mockReset()
  })

  describe('mapMetaToFilters', () => {
    it('create an empty filter definition from metadata', async () => {
      const resp = await metaFilterMapper.mapMetaToFilters({ ...meta, attributes: meta.attributes.filter(it => it.fieldType === 'STRING') })
      expect(resp).toEqual({ 'definition': [], 'shown': [] })
    })
    it('create an filter definition from metadata', async () => {
      api.get.mockReturnValueOnce(countryOptions)
      api.get.mockReturnValueOnce(ageGroupOptions)
      const resp = await metaFilterMapper.mapMetaToFilters(meta)
      expect(resp).toEqual({ definition: [
        {
          collapsable: true,
          collapsed: false,
          label: 'country',
          name: 'country',
          options: [
            {
              text: 'Germany',
              value: 'DE'
            },
            {
              text: 'Netherlands',
              value: 'NL'
            }
          ],
          type: 'checkbox-filter'
        },
        {
          collapsable: true,
          collapsed: false,
          label: 'age_groups',
          name: 'age_groups',
          options: [
            {
              text: '1',
              value: 1
            }
          ],
          type: 'checkbox-filter'
        }
      ],
      shown: [
        'country',
        'age_groups'
      ]
      })
    })
  })
})
