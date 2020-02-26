import { Attribute } from '@/types/MetaData'

const idAttribute:Attribute = {
  id: '/api/v2/test/meta/id',
  name: 'id',
  type: 'int',
  label: 'id',
  description: '',
  idAttribute: true,
  labelAttribute: false,
  auto: false,
  nullable: false,
  readOnly: true,
  unique: true,
  visible: true,
  lookupAttributeIndex: 1,
  aggregatable: false,
  isReference: false
}
const labelAttribute:Attribute = {
  id: '/api/v2/test/meta/label',
  type: 'string',
  name: 'label',
  label: 'label',
  description: '',
  auto: false,
  nullable: false,
  readOnly: true,
  idAttribute: false,
  labelAttribute: true,
  unique: true,
  visible: true,
  lookupAttributeIndex: 2,
  isReference: false,
  aggregatable: false
}

export default {
  id: 'id',
  package: null,
  description: 'desciption',
  idAttribute: idAttribute,
  labelAttribute: labelAttribute,
  label: 'Test',
  abstract: false,
  attributes: [
    idAttribute,
    labelAttribute,
    {
      id: '/api/v2/test/meta/country',
      type: 'categorical',
      name: 'country',
      label: 'country',
      description: '',
      auto: false,
      nullable: false,
      readOnly: true,
      idAttribute: false,
      labelAttribute: false,
      unique: true,
      visible: true,
      isReference: false,
      aggregatable: false,
      refEntityType: '/api/v2/country'
    },
    {
      id: '/api/v2/test/meta/age_groups',
      type: 'categorical_mref',
      name: 'age_groups',
      label: 'age_groups',
      description: '',
      auto: false,
      nullable: false,
      readOnly: true,
      idAttribute: false,
      labelAttribute: false,
      unique: true,
      isReference: false,
      visible: true,
      aggregatable: false,
      refEntityType: '/api/v2/age_groups'
    },
    {
      id: '/api/v2/test/meta/name',
      type: 'string',
      name: 'name',
      label: 'name',
      description: '',
      auto: false,
      nullable: false,
      readOnly: true,
      idAttribute: false,
      labelAttribute: false,
      unique: true,
      isReference: false,
      visible: true,
      aggregatable: false
    }
  ]
}
