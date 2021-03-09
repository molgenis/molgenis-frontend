import getters from '@/store/header/getters'
import { findPath } from '@/service/menuService'

jest.mock('@/service/menuService', () => ({ findPath: jest.fn() }))

describe('header getters', () => {
  describe('navigatorLocation', () => {
    const state: any = {}
    const rootState: any = { account: { context: { menu: { my: 'menu' } } } }

    describe('when menu contains navigator', () => {
      // @ts-ignore
      findPath.mockReturnValueOnce('/path/to/navigator')
      it('should return the path to the navigator plugin', () => {
        expect(getters.navigatorLocation(state, {}, rootState)).toEqual('/path/to/navigator')
        expect(findPath).toHaveBeenCalledWith('/menu', { my: 'menu' }, 'navigator')
      })
    })

    describe('when menu does not contain navigator', () => {
      // @ts-ignore
      findPath.mockReturnValueOnce(undefined)
      it('should return the path to the navigator plugin', () => {
        expect(getters.navigatorLocation(state, {}, rootState)).toEqual(undefined)
      })
    })
  })
})
