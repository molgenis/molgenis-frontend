import * as repository from '@/repository/dataRowRepository.ts'
// @ts-ignore
import api from '@molgenis/molgenis-api-client'

jest.mock('@molgenis/molgenis-api-client', () => {
  return {
    post: jest.fn(),
    get: jest.fn()
  }
})

const basicOptions = {
  body: '{}',
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  "method": "POST"
}

describe('DataRowRepository', () => {

  const tableId = 'my-table'

  describe('save', () => {
    let formData: any
    let formFields: any

    beforeEach(() => {
      api.post.mockClear()
      formData = {
        e: 'f'
      }

      formFields = [
        {
          id: 'e',
          type: 'string'
        }
      ]
    })

    describe('create', () => {
      it('should post the new row', () => {
        repository.save(formData, formFields, tableId, null)
        const containsFileData = false
        const uri = '/api/v1/my-table?_method=PUT'
        const options = basicOptions
        options.body = '{"e":"f"}'
        expect(api.post).toHaveBeenCalledWith(uri, options, containsFileData)
      })
    })

    describe('width file data', () => {
      it('should post the new row', () => {
        formFields = [{ id: 'x', type: 'file' }]
        formData = ['x', 'x']
        repository.save(formData, formFields, tableId, null)
        const containsFileData = true
        const uri = '/api/v1/my-table?_method=PUT'
        expect(api.post).toHaveBeenCalledWith(uri, expect.objectContaining({
          headers: basicOptions.headers
        }), containsFileData)
      })
    })

    describe('width file within fieldgroup', () => {
      it('should post the new row', () => {
        const blob: any = new Blob([''], { type: 'text/html' })
        blob['lastModifiedDate'] = ''
        blob['name'] = 'my file'
        formData = {
          e: blob,
          f: 'foobar',
          g: null,
          h: undefined
        }

        formFields = [
          {
            id: 'comp',
            type: 'field-group',
            children: [
              {
                id: 'e',
                type: 'file'
              }
            ]
          },
          {
            id: 'f',
            type: 'string'
          },
          {
            id: 'g',
            type: 'string'
          },
          {
            id: 'h',
            type: 'string'
          }
        ]
        repository.save(formData, formFields, tableId, null)
        const containsFileData = true
        const uri = '/api/v1/my-table?_method=PUT'
        expect(api.post).toHaveBeenCalledWith(uri, expect.objectContaining({
          headers: basicOptions.headers
        }), containsFileData)
      })
    })

    describe('update', () => {
      it('should contain the row id in case op update', () => {
        const rowId = '123'
        repository.save(formData, formFields, tableId, rowId)
        const containsFileData = false
        const uri = '/api/v1/my-table/123?_method=PUT'
        const options = basicOptions
        options.body = '{"e":"f"}'
        expect(api.post).toHaveBeenCalledWith(uri, options, containsFileData)
      })
    })
  })

  describe('fetch', () => {
    beforeEach(() => {
      api.get.mockClear()
    })

    describe('calling fetch without passing a rowId', () => {
      it('should fetch the form structure data', () => {
        repository.fetch(tableId, null)
        expect(api.get).toHaveBeenCalledWith('/api/v2/my-table?num=0')
      })
    })

    describe('calling fetch passing a rowId', () => {
      it('should fetch the form structure and row data', async (done) => {
        const rowId = 'row-id'
        api.get.mockResolvedValue({ a: 'b', _meta: 'resp-meta' })
        const res = await repository.fetch(tableId, rowId)
        expect(api.get).toHaveBeenCalledWith('/api/v2/my-table/row-id')
        expect(res).toEqual({
          meta: "resp-meta",
          rowData: {
            a: "b",
          },
        })
        done()
      })
    })
  })

  describe('fetchOption', () => {
    beforeEach(() => {
      api.get.mockClear()
    })

    it('should use the passed location to fetch the option data', () => {
      repository.fetchOption('my/location')
      expect(api.get).toHaveBeenCalledWith('my/location')
    })
  })
})