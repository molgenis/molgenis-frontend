import { isMRefValueObject, isRefValue, isSingleRefValueObject, MRefValueObject, SingleRefValueObject } from '@/types/ApiResponse.ts'

describe('ApiResponse type', () => {
  describe('isMRefValueObject', () => {
    describe('when item has items prop', () => {
      const item = {
        links: { self: 'its me' },
        items: []
      }
      it('should should be true', () => {
        expect(isMRefValueObject(item)).toBe(true)
      })
    })
    describe('when item has a string', () => {
      const item = 'just a string'
      it('should be false', () => {
        expect(isMRefValueObject(item)).toBe(false)
      })
    })
  })

  describe('isSingleRefValueObject', () => {
    describe('when item has data prop', () => {
      const item = {
        links: { self: 'its me' },
        data: {}
      }
      it('should should be true', () => {
        expect(isSingleRefValueObject(item)).toBe(true)
      })
    })
    describe('when item has a string', () => {
      const item = 'just a string'
      it('should be false', () => {
        expect(isSingleRefValueObject(item)).toBe(false)
      })
    })
  })

  describe('isRefValue', () => {
    describe('when item is mref', () => {
      const item:MRefValueObject = {
        links: { self: 'its me' },
        items: []
      }
      it('should should be true', () => {
        expect(isRefValue(item)).toBe(true)
      })
    })
    describe('when item single ref', () => {
      const item: SingleRefValueObject = {
        links: { self: 'its me' },
        data: {}
      }
      it('should be false', () => {
        expect(isRefValue(item)).toBe(true)
      })
    })
    describe('when item not a ref', () => {
      const item = 'i am a item'
      it('should be false', () => {
        expect(isRefValue(item)).toBe(false)
      })
    })
  })
})
