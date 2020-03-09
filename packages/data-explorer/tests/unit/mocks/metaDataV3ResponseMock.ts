export default {
  links: {
    self: 'https://server/api/metadata/mock-entity'
  },
  data: {
    id: 'mock-entity',
    label: 'label',
    package: {
      links: {
        self: 'https://server/api/data/test-package/test'
      }
    },
    attributes: {
      links: {
        self: 'https://server/api/metadata/mock-entity/attributes'
      },
      items: [
        {
          link: {
            self: 'https://server/api/metadata/mock-entity/attributes/mock-entity-attribute'
          },
          data: {
            id: 'mock-entity-attribute',
            label: 'id',
            name: 'id',
            sequenceNr: 0,
            type: 'one_to_many',
            idAttribute: true,
            labelAttribute: false,
            nullable: false,
            auto: false,
            visible: true,
            unique: true,
            readOnly: true,
            aggregatable: false,
            defaultValue: 'default'
          }
        },
        {
          link: {
            self: 'https://server/api/metadata/mock-entity/attributes/mock-entity-attribute2'
          },
          data: {
            id: 'mock-entity-attribute2',
            name: 'id',
            sequenceNr: 0,
            type: 'string',
            idAttribute: true,
            labelAttribute: true,
            nullable: false,
            auto: false,
            visible: true,
            unique: true,
            readOnly: true,
            aggregatable: false,
            defaultValue: 'default',
            parentAttribute: {
              link: {
                self: 'https://server/api/metadata/mock-entity/attributes/mock-entity-attribute'
              },
              data: {
                id: 'mock-entity-attribute',
                label: 'id',
                name: 'id',
                sequenceNr: 0,
                type: 'one_to_many',
                idAttribute: true,
                labelAttribute: false,
                nullable: false,
                auto: false,
                visible: true,
                unique: true,
                readOnly: true,
                aggregatable: false,
                defaultValue: 'default'
              }
            }
          }
        }
      ]
    },
    abstract: false,
    extends: {
      links: {
        self: 'https://server/api/api/metadata/root_persons'
      }
    },
    indexingDepth: 1
  }
}
