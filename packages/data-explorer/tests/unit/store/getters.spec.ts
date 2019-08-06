import getters from '@/store/getters'

describe('getters', () => {
  it('has activeEntityData', () => {
    expect(getters.activeEntityData).toBeDefined()
  })
})
