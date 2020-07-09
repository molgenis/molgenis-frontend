import { getErrorMessage } from '@/store/helpers'
import Vue from 'vue'

describe('store', () => {
  describe('helpers', () => {
    describe('getErrorMessage', () => {
      it('converts error response with code', () => {
        const errorResponse = {
          errors: [{
            code: 'D01',
            message: 'Errors in your data.'
          }]
        }
        expect(getErrorMessage(errorResponse)).toBe('Errors in your data. (D01)')
      })

      it('converts error response without code', () => {
        const errorResponse = {
          errors: [{
            message: 'Errors in your data.'
          }]
        }
        expect(getErrorMessage(errorResponse)).toBe('Errors in your data.')
      })

      it('converts error response with status code', () => {
        expect(getErrorMessage({
          status: 401
        })).toBe('Error status: 401')
      })

      it('converts error response with status code and text', () => {
        expect(getErrorMessage({
          status: 401,
          statusText: 'The request was rejected because the URL was not normalized.'
        })).toBe('The request was rejected because the URL was not normalized. (401)')
      })

      it('returns message from Error', () => {
        expect(getErrorMessage(new Error('Some error'))).toBe('Some error')
      })
    })
  })
})
