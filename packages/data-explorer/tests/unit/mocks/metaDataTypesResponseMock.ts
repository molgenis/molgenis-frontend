export default {
  attributes: [
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
        idAttribute: 'id',
        labelAttribute: 'label',
        hrefCollection: '/api/v2/countries',
        href: '/api/v2/countries'
      }
    }, {
      href: '/api/v2/test/meta/test',
      fieldType: 'BOOL',
      name: 'test',
      label: 'test',
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
        name: 'test',
        idAttribute: 'id',
        labelAttribute: 'label',
        hrefCollection: '/api/v2/test',
        href: '/api/v2/test'
      }
    }, {
      href: '/api/v2/test/meta/age_groups',
      fieldType: 'MREF',
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
        idAttribute: 'id',
        labelAttribute: 'label',
        hrefCollection: '/api/v2/age_groups',
        href: '/api/v2/age_groups'
      }
    }, {
      href: '/api/v2/test/meta/age_groups',
      fieldType: 'ENUM',
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
      enumOptions: ['chair', 'table'],
      refEntity: {
        name: 'age_groups',
        idAttribute: 'id',
        labelAttribute: 'label',
        hrefCollection: '/api/v2/age_groups',
        href: '/api/v2/age_groups'
      }
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
