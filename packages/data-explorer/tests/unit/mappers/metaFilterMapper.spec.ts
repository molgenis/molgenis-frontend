import * as metaFilterMapper from '@/mappers/metaFilterMapper'
import * as util from '../../../src/mappers/utils'
// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { MetaData, Attribute } from '@/types/MetaData'

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
    const IdAttribute:Attribute = {
      id: 'https://someurl.nl/api',
      name: 'id',
      idAttribute: true,
      description: 'the id',
      isReference: false,
      label: 'reference',
      nullable: false,
      readOnly: false,
      type: 'string',
      unique: false,
      auto: false,
      labelAttribute: false,
      visible: true,
      lookupAttributeIndex: 2,
      aggregatable: false
    }
    metaData = {
      id: 'id',
      idAttribute: IdAttribute,
      labelAttribute: undefined,
      package: null,
      description: 'description',
      label: 'Test',
      abstract: false,
      attributes: [
        IdAttribute,
        {
          id: 'https://someurl.nl/api',
          name: 'reference',
          idAttribute: false,
          description: 'the ref',
          isReference: true,
          label: 'reference',
          nullable: false,
          readOnly: false,
          refEntityType: 'https://someurl.nl/ref-id',
          type: 'categorical',
          unique: false,
          auto: false,
          labelAttribute: false,
          visible: true,
          lookupAttributeIndex: 2,
          aggregatable: false
        },
        {
          id: 'https://someurl.nl/api',
          name: 'multi_reference',
          idAttribute: false,
          description: 'the multi',
          isReference: true,
          label: 'multi reference',
          nullable: false,
          readOnly: false,
          refEntityType: 'https://someurl.nl/ref-id',
          type: 'categorical_mref',
          unique: false,
          auto: false,
          labelAttribute: false,
          visible: true,
          lookupAttributeIndex: 3,
          aggregatable: false
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
