import getters from '@/store/getters'
import state from '@/store/state'

describe('getters', () => {
  it('has activeEntityData', () => {
    expect(getters.activeEntityData).toBeDefined()
  })

  it('should be false is no search term is given', () => {
    expect(getters.activeEntityData({ ...state })).toEqual(null)
  })
})
