export default {
  links: {
    self: 'https://mocks-for-jocks.com/data/it_emx_datatypes_TypeTest/1'
  },
  data: {
    id: 1,
    label: 'my label row data',
    country: {
      data: {
        name: 'name',
        label: 'label',
        id: 'id'
      }
    },
    age_groups: {
      items: [ { data: { name: 'age1', label: 'label1', id: 'id1' } } ]
    },
    file: {
      data: {
        contentType: 'text/plain',
        filename: 'hello.txt',
        id: 'file-id',
        size: 16,
        url: 'https://master.dev.molgenis.org/files/aaaac56zuuoganrgemw7epqaae',
      }
    }
  }
}
