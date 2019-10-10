import { getCategoricals } from '@/mappers/mapperUtils'
import meta from '../mocks/metaDataResponseMock'
import { MetaDataAttribute } from '@/types/ApiResponse'

describe('getCategoricals', () => {
  it('Will filter out CATEGORICAL meta data ', async () => {
    const categoricals: MetaDataAttribute[] = getCategoricals(meta.attributes)
    expect(JSON.stringify(categoricals)).toEqual('[{"href":"/api/v2/test/meta/country","fieldType":"CATEGORICAL","name":"country","label":"country","attributes":[],"auto":false,"nillable":false,"readOnly":true,"labelAttribute":false,"unique":true,"visible":true,"lookupAttribute":true,"isAggregatable":false,"refEntity":{"name":"countries","idAttribute":"countries","labelAttribute":"countries","hrefCollection":"/api/v2/countries","href":"/api/v2/countries"}},{"href":"/api/v2/test/meta/age_groups","fieldType":"CATEGORICAL_MREF","name":"age_groups","label":"age_groups","attributes":[],"auto":false,"nillable":false,"readOnly":true,"labelAttribute":false,"unique":true,"visible":true,"lookupAttribute":true,"isAggregatable":false,"refEntity":{"name":"age_groups","idAttribute":"age_groups","labelAttribute":"age_groups","hrefCollection":"/api/v2/age_groups","href":"/api/v2/age_groups"}}]')
  })
})
