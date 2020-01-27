export default {
  attributes: [
    {
      href: '/api/v2/test/meta/id',
      fieldType: 'INT',
      name: 'id',
      label: 'id',
      attributes: [],
      auto: false,
      nillable: false,
      readOnly: true,
      labelAttribute: false,
      unique: true,
      visible: true,
      lookupAttribute: true,
      isAggregatable: false
    },
    {
      href: '/api/v2/test/meta/label',
      fieldType: 'STRING',
      name: 'label',
      label: 'label',
      attributes: [],
      auto: false,
      nillable: false,
      readOnly: true,
      labelAttribute: true,
      unique: true,
      visible: true,
      lookupAttribute: true,
      isAggregatable: false
    },
    {
      href: '/api/v2/test/meta/country',
      fieldType: 'CATEGORICAL',
      name: 'country',
      label: 'country',
      attributes: [],
      auto: false,
      nillable: false,
      readOnly: true,
      labelAttribute: false,
      unique: true,
      visible: true,
      lookupAttribute: true,
      isAggregatable: false,
      refEntity: {
        name: 'countries',
        labelAttribute: 'countries',
        href: '/api/v2/countries'
      }
    },
    {
      href: '/api/v2/test/meta/age_groups',
      fieldType: 'CATEGORICAL_MREF',
      name: 'age_groups',
      label: 'age_groups',
      attributes: [],
      auto: false,
      nillable: false,
      readOnly: true,
      labelAttribute: false,
      unique: true,
      visible: true,
      lookupAttribute: true,
      isAggregatable: false,
      refEntity: {
        name: 'age_groups',
        labelAttribute: 'age_groups',
        href: '/api/v2/age_groups'
      }
    },
    {
      href: '/api/v2/test/meta/name',
      fieldType: 'STRING',
      name: 'name',
      label: 'name',
      attributes: [],
      auto: false,
      nillable: false,
      readOnly: true,
      labelAttribute: false,
      unique: true,
      visible: true,
      lookupAttribute: true,
      isAggregatable: false
    }
  ],
  description: 'Beautiful description',
  href: '/api/v2/test',
  hrefCollection: '/api/v2/test',
  idAttribute: 'id',
  isAbstract: false,
  label: 'Test',
  labelAttribute: 'label',
  languageCode: 'en',
  lookupAttributes: [
    'id'
  ],
  name: 'test',
  permissions: [
    'DELETE_DATA',
    'READ_METADATA',
    'READ_DATA',
    'UPDATE_METADATA',
    'AGGREGATE_DATA',
    'DELETE_METADATA',
    'UPDATE_DATA',
    'COUNT_DATA',
    'ADD_DATA'
  ],
  writable: true
}
