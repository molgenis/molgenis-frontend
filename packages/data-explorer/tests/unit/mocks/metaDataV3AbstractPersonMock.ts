export default {
  links: {
    self: 'https://server/api/metadata/person'
  },
  data: {
    id: 'person',
    label: 'Person',
    description: 'actract person',
    'package': {
      links: {
        self: 'https://server/api/data/sys_md_Package/test'
      }
    },
    attributes: {
      links: {
        self: 'https://server/api/metadata/person/attributes'
      },
      items: [
        {
          link: {
            self: 'https://server/api/metadata/person/attributes/id'
          },
          data: {
            id: 'id',
            label: 'id',
            name: 'id',
            sequenceNr: 0,
            type: 'string',
            idAttribute: true,
            labelAttribute: true,
            lookupAttributeIndex: 0,
            nullable: false,
            auto: false,
            visible: true,
            unique: true,
            readOnly: true,
            aggregatable: false
          }
        },
        {
          link: {
            self: 'https://server/api/metadata/person/attributes/age'
          },
          data: {
            id: 'age',
            label: 'age',
            name: 'age',
            sequenceNr: 1,
            type: 'int',
            idAttribute: false,
            labelAttribute: false,
            lookupAttributeIndex: 1,
            nullable: true,
            auto: false,
            visible: true,
            unique: false,
            readOnly: false,
            aggregatable: false,
            range: {
              min: 1,
              max: 115
            },
            defaultValue: '1'
          }
        }
      ]
    },
    'abstract': true,
    indexingDepth: 1
  }
}
