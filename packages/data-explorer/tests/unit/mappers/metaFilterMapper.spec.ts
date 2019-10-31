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
      expect(resp).toEqual({ 'definition': [{ 'collapsable': true, 'collapsed': false, 'label': 'label', 'name': 'label', 'type': 'string-filter' }], 'shown': [] })
    })
    it('create an filter definition from metadata', async () => {
      api.get.mockReturnValueOnce(countryOptions)
      api.get.mockReturnValueOnce(ageGroupOptions)
      const resp = await metaFilterMapper.mapMetaToFilters(meta)
      expect(resp.definition).toBeDefined()
      expect(resp.shown).toEqual([
        'country',
        'age_groups'
      ])
      expect(resp.definition.length).toEqual(2)
      expect(resp.definition[0].options).toBeInstanceOf(Function)
      expect(resp.definition[0].collapsable).toEqual(true)
      expect(resp.definition[0].collapsed).toEqual(false)
      expect(resp.definition[0].label).toEqual('country')
      expect(resp.definition[0].name).toEqual('country')
      expect(resp.definition[0].type).toEqual('checkbox-filter')
    })
  })
})
