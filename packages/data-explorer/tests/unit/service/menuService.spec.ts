import { findPath } from '@/service/menuService.ts'

describe('menuService', () => {
  describe('findPath', () => {
    describe('when item not in menu', () => {
      const menu = {
        id: 'root'
      }
      it('should return undefined', () => {
        expect(findPath('', menu, 'foo')).toBeUndefined()
      })
    })

    describe('when the menu is just the item', () => {
      const menu = {
        id: 'foo'
      }
      it('should return undefined', () => {
        expect(findPath('', menu, 'foo')).toEqual('/foo')
      })
    })

    describe('when item is in top level menu', () => {
      const menu = {
        id: 'root',
        items: [{ id: 'not-foo' }, { id: 'foo' }]
      }
      it('should return the path', () => {
        expect(findPath('', menu, 'foo')).toEqual('/root/foo')
      })
    })

    describe('when item is in sub menu level menu', () => {
      const menu = {
        id: 'root',
        items: [
          { id: 'not-foo' },
          { id: 'sub1', items: [{ id: 'not-foo' }, { id: 'foo' }] },
          { id: 'not-foo' }
        ]
      }
      it('should return the path including the sub menu', () => {
        expect(findPath('', menu, 'foo')).toEqual('/root/sub1/foo')
      })
    })

    describe('when item is in sub-sub menu level menu', () => {
      const menu = {
        id: 'root',
        items: [
          { id: 'not-foo' },
          { id: 'sub1', items: [{ id: 'not-foo' }, { id: 'sub2', items: [{ id: 'foo' }] }] },
          { id: 'not-foo' }
        ]
      }
      it('should return the path including the sub menu', () => {
        expect(findPath('', menu, 'foo')).toEqual('/root/sub1/sub2/foo')
      })
    })

    describe('when item is not in the sub menu', () => {
      const menu = {
        id: 'root',
        items: [
          { id: 'not-foo' },
          { id: 'sub1', items: [{ id: 'not-foo' }, { id: 'not-foo' }] },
          { id: 'not-foo' }
        ]
      }
      it('should return the path including the sub menu', () => {
        expect(findPath('', menu, 'foo')).toBeUndefined()
      })
    })
  })
})
