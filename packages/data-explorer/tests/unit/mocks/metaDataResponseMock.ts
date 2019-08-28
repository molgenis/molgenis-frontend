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
