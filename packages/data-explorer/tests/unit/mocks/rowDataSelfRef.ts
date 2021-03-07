export default {
  links: {
    self: 'http://localhost:443/api/data/demo_Authors?size=1&flattenAttributes=true',
    'next': 'http://localhost:443/api/data/demo_Authors?size=1&flattenAttributes=true&page=1'
  },
  items: [
    {
      links: {
        self: 'http://localhost:443/api/data/demo_Authors/A.Jigger'
      },
      data: {
        id: 'A.Jigger',
        label: 'Arsenius Jigger',
        books: {
          links: {
            self: 'http://localhost:443/api/data/demo_Authors/A.Jigger/books'
          }
        }
      }
    }
  ],
  page: {
    size: 1,
    totalElements: 14,
    totalPages: 14,
    number: 0
  }
}
