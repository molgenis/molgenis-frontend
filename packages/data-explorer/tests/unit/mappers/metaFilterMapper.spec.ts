import * as metaFilterMapper from '@/mappers/metaFilterMapper'
import * as util from '../../../src/mappers/utils'
// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { MetaData } from '@/types/MetaData'

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

jest.mock('../mocks/metaDataResponseMock', () => ({
  getCategoricals: jest.fn()
}))

describe('metaFilterMapper', () => {
  let metaData: MetaData
  beforeEach(() => {
    metaData = {
      id: 'id',
      idAttribute: 'id',
      labelAttribute: 'id',
      package: null,
      description: 'desciption',
      label: 'Test',
      abstract: false,
      attributes: [
        {
          id: '/api/v2/test/meta/id',
          name: 'id',
          type: 'int',
          description: 'description',
          label: 'id',
          auto: false,
          nullable: false,
          readOnly: true,
          labelAttribute: false,
          unique: true,
          visible: true,
          lookupAttributeIndex: 1,
          aggregatable: false,
          idAttribute: true
        },
        {
          id: '/api/v2/test/meta/country',
          type: 'categorical',
          description: 'description',
          name: 'country',
          label: 'country',
          auto: false,
          nullable: false,
          readOnly: true,
          labelAttribute: false,
          unique: true,
          visible: true,
          lookupAttributeIndex: 2,
          aggregatable: false,
          refEntityType: '/api/v2/countries',
          idAttribute: false
        },
        {
          id: '/api/v2/test/meta/age_groups',
          type: 'categorical_mref',
          description: 'description',
          name: 'age_groups',
          label: 'age_groups',
          auto: false,
          nullable: false,
          readOnly: true,
          labelAttribute: false,
          unique: true,
          visible: true,
          lookupAttributeIndex: 3,
          aggregatable: false,
          refEntityType: '/api/v2/age_groups',
          idAttribute: false
        }
      ]
    }
    api.get.mockReset()
  })

  describe('mapMetaToFilters', () => {
    it('create an filter definition from metadata', async () => {
      api.get.mockReturnValueOnce(countryOptions)
      api.get.mockReturnValueOnce(ageGroupOptions)
      const resp = await metaFilterMapper.mapMetaToFilters(metaData)
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
