export default {
  links: {
    self: 'https://server/api/metadata/mock-entity'
  },
  data: {
    id: 'mock-entity',
    label: 'label',
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
            aggregatable: false
          }
        }
      ]
    },
    'abstract': false,
    indexingDepth: 1
  }
}
