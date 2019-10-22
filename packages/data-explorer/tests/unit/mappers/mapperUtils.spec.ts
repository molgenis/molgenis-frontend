import { getCategoricals, generateUri, getFieldOptions } from '@/mappers/mapperUtils'
import meta from '../mocks/metaDataResponseMock'
import metatypes from '../mocks/metaDataTypesResponseMock'
import { MetaDataAttribute } from '@/types/ApiResponse'
// @ts-ignore
import api from '@molgenis/molgenis-api-client'
jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn().mockResolvedValue({ 'href': '/api/v2/root_gender', 'meta': { 'href': '/api/v2/root_gender', 'hrefCollection': '/api/v2/root_gender', 'name': 'root_gender', 'label': 'Gender', 'description': 'gender is located in the root package because it is not hospital specific', 'attributes': [{ 'href': '/api/v2/root_gender/meta/id', 'fieldType': 'STRING', 'name': 'id', 'label': 'id', 'attributes': [], 'maxLength': 255, 'auto': false, 'nillable': false, 'readOnly': true, 'labelAttribute': false, 'unique': true, 'visible': true, 'lookupAttribute': false, 'isAggregatable': false }, { 'href': '/api/v2/root_gender/meta/label', 'fieldType': 'STRING', 'name': 'label', 'label': 'label', 'attributes': [], 'maxLength': 255, 'auto': false, 'nillable': false, 'readOnly': false, 'labelAttribute': true, 'unique': false, 'visible': true, 'lookupAttribute': true, 'isAggregatable': false }], 'labelAttribute': 'label', 'idAttribute': 'id', 'lookupAttributes': ['label'], 'isAbstract': false, 'writable': true, 'languageCode': 'en', 'permissions': ['UPDATE_DATA', 'DELETE_METADATA', 'AGGREGATE_DATA', 'ADD_DATA', 'READ_DATA', 'UPDATE_METADATA', 'READ_METADATA', 'COUNT_DATA', 'DELETE_DATA'] }, 'start': 0, 'num': 100, 'total': 2, 'items': [{ '_href': '/api/v2/root_gender/f', 'id': 'f', 'label': 'Female' }, { '_href': '/api/v2/root_gender/m', 'id': 'm', 'label': 'Male' }] })
}))

describe('getCategoricals', () => {
  it('Will filter out CATEGORICAL meta data ', async () => {
    const categoricals: MetaDataAttribute[] = getCategoricals(meta.attributes)
    expect(categoricals).toBeDefined()
    expect(categoricals.length).toEqual(2)
    expect(categoricals[0].fieldType).toEqual('CATEGORICAL')
    expect(categoricals[1].fieldType).toEqual('CATEGORICAL_MREF')
    expect(categoricals[0].name).toEqual('country')
    expect(categoricals[1].name).toEqual('age_groups')
    expect(categoricals[1].range).toEqual({ min: -10, max: 10 })
  })
})

describe('uriGenerator', () => {
  const uri = '/api/v2/tablename'
  const id = 'idAttr'
  const label = 'labelAttr'

  it('should generate an uri without query when there is no search string',
    () => {
      const search = null
      const result = generateUri(uri, id, label, search)
      expect(result).toEqual(uri)
    })

  it('should generate an uri with like query when there is a search string',
    () => {
      const search = 'blaat'
      const result = generateUri(uri, id, label, search)
      const expected = `${uri}?q=${id}=like=${search},${label}=like=${search}`
      expect(result).toEqual(expected)
    })

  it('should generate an uri with in query when there is a search array',
    () => {
      const search = ['blaat1', 'blaat2']
      const result = generateUri(uri, id, label, search)
      const expected = `/api/v2/tablename?q=idAttr=in=(blaat1,blaat2),labelAttr=in=(blaat1,blaat2)`
      expect(result).toEqual(expected)
    })

  it('should generate an uri without query when there is an empty search array',
    () => {
      const search:string[] = []
      const result = generateUri(uri, id, label, search)
      expect(result).toEqual(uri)
    })
})

describe('getFieldOptions', () => {
  it('can get options of categorical',
    (done) => {
      const option = getFieldOptions(metatypes.attributes[0])
      if (option) {
        option().then((response: any) => {
          expect(response).toEqual([{ value: 'f', text: 'Female' }, { value: 'm', text: 'Male' }])
          done()
        })
      }
    })

  it('can get options of bool',
    (done) => {
      const option = getFieldOptions(metatypes.attributes[1])
      if (option) {
        option().then((response: any) => {
          expect(response).toEqual([{ text: 'Yes', value: true }, { text: 'No', value: false }])
          done()
        })
      }
    })

  it('can get options of mref',
    (done) => {
      const option = getFieldOptions(metatypes.attributes[2])
      if (option) {
        option().then((response: any) => {
          expect(response).toEqual([{ value: 'f', text: 'Female' }, { value: 'm', text: 'Male' }])
          done()
        })
      }
    })

  it('can get options of enum',
    (done) => {
      const option = getFieldOptions(metatypes.attributes[3])
      if (option) {
        option().then((response: any) => {
          expect(response).toEqual([{ 'text': 'chair', 'value': 'chair' }, { 'text': 'table', 'value': 'table' }])
          done()
        })
      }
    })
})
