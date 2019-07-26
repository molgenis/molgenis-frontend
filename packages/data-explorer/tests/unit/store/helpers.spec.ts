import { getErrorMessage, tryAction } from '@/store/helpers'
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

    describe('tryAction', () => {
      it('returns successful result', () => {
        const result = Promise.resolve('succes')
        expect(tryAction(() => result)()).toEqual(result)
      })

      it('commits error message toast for failed result', (done) => {
        const action = () => Promise.reject(new Error('Something went wrong'))
        const commit = jest.fn()
        const context = { commit }
        const toast = { message: 'Something went wrong', type: 'danger' }
        tryAction(action)(context)
        Vue.nextTick(() => {
          expect(commit).toHaveBeenCalledWith('setToast', toast)
          done()
        })
      })
    })
  })
})
