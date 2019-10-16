module.exports = {
  href: '/api/v2/root_gender',
  meta: {
    href: '/api/v2/root_gender',
    hrefCollection: '/api/v2/root_gender',
    name: 'root_gender',
    label: 'Gender',
    description: 'gender is located in the root package because it is not hospital specific',
    attributes: [
      {
        href: '/api/v2/root_gender/meta/id',
        fieldType: 'STRING',
        name: 'id',
        label: 'id',
        attributes: [],
        maxLength: 255,
        auto: false,
        nillable: false,
        readOnly: true,
        labelAttribute: false,
        unique: true,
        visible: true,
        lookupAttribute: false,
        isAggregatable: false
      },
      {
        href: '/api/v2/root_gender/meta/label',
        fieldType: 'STRING',
        name: 'label',
        label: 'label',
        attributes: [],
        maxLength: 255,
        auto: false,
        nillable: false,
        readOnly: false,
        labelAttribute: true,
        unique: false,
        visible: true,
        lookupAttribute: true,
        isAggregatable: false
      }
    ],
    labelAttribute: 'label',
    idAttribute: 'id',
    lookupAttributes: [
      'label'
    ],
    isAbstract: false,
    writable: true,
    languageCode: 'en',
    permissions: [
      'AGGREGATE_DATA',
      'READ_DATA',
      'READ_METADATA',
      'UPDATE_DATA',
      'DELETE_DATA',
      'UPDATE_METADATA',
      'DELETE_METADATA',
      'COUNT_DATA',
      'ADD_DATA'
    ]
  },
  start: 0,
  num: 100,
  total: 2,
  items: [
    {
      _href: '/api/v2/root_gender/f',
      id: 'f',
      label: 'Female'
    },
    {
      _href: '/api/v2/root_gender/m',
      id: 'm',
      label: 'Male'
    }
  ]
}
