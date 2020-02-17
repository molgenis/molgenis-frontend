export default {
  id: 'id',
  package: null,
  description: 'desciption',
  label: 'Test',
  abstract: false,
  attributes: [
    {
      id: '/api/v2/test/meta/id',
      name: 'id',
      type: 'int',
      label: 'id',
      auto: false,
      nullable: false,
      readOnly: true,
      labelAttribute: false,
      unique: true,
      visible: true,
      lookupAttributeIndex: 1,
      aggregatable: false
    },
    {
      id: '/api/v2/test/meta/label',
      type: 'string',
      name: 'label',
      label: 'label',
      attributes: [],
      auto: false,
      nillable: false,
      readOnly: true,
      labelAttribute: true,
      unique: true,
      visible: true,
      lookupAttributeIndex: true,
      aggregatable: false
    },
    {
      id: '/api/v2/test/meta/country',
      type: 'categorical',
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
      aggregatable: false,
      refEntity: {
        name: 'countries',
        labelAttribute: 'countries',
        href: '/api/v2/countries'
      }
    },
    {
      id: '/api/v2/test/meta/age_groups',
      type: 'categorical_mref',
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
      aggregatable: false,
      refEntity: {
        name: 'age_groups',
        labelAttribute: 'age_groups',
        href: '/api/v2/age_groups'
      }
    },
    {
      id: '/api/v2/test/meta/name',
      type: 'string',
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
      aggregatable: false
    }
  ]
}
