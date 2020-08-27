import { isDataApiResponseItem } from '@/types/ApiResponse.ts'

describe('ApiResponse type', () => {
  describe('isDataApiResponseItem', () => {
    describe('when item has a links prop', () => {
      const item = {
        links: { self: 'its me' }
      }
      it('should should be true', () => {
        expect(isDataApiResponseItem(item)).toBe(true)
      })
    })
    describe('when item has a string', () => {
      const item = 'just a string'
      it('should be false', () => {
        expect(isDataApiResponseItem(item)).toBe(false)
      })
    })
  })
})
