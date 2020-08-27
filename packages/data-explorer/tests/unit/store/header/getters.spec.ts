import getters from '@/store/header/getters'
import { findPath } from '@/service/menuService'

jest.mock('@/service/menuService', () => ({ findPath: jest.fn() }))

describe('header getters', () => {
  describe('navigatorLocation', () => {
    let state: any = {}
    let rootState: any = {
      account: {
        context: {
          menu: { my: 'menu' }
        }
      }
    }
    // @ts-ignore
    findPath.mockReturnValueOnce('/path/to/navigator')
    it('should return the path to the navigator plugin', () => {
      expect(getters.navigatorLocation(state, {}, rootState)).toEqual('/path/to/navigator')
      expect(findPath).toHaveBeenCalledWith('', { my: 'menu' }, 'navigator')
    })
  })
})
