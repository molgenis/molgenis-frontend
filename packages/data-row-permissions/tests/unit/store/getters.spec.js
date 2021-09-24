import { getters } from '../../../src/store/getters'

describe('Getters.js', () => {
  let state = { }

  beforeEach(() => {
    state = {}
  })

  it('can return false for isSU when uiContext is not present', () => {
    expect(getters.isSU({})).toBeFalsy()
  })

  it('can return true for isSU when ROLE_SU in uiContext present', () => {
    state.uiContext = { context: { roles: ['ROLE_SU'] } }

    expect(getters.isSU(state)).toBeTruthy()
  })

  it('can return false for isSU when ROLE_SU in uiContext is an empty array', () => {
    state.uiContext = { context: { roles: [] } }

    expect(getters.isSU(state)).toBeFalsy()
  })

  it('can return false for isAuthenticated when uiContext is not present', () => {
    expect(getters.isAuthenticated({})).toBeFalsy()
  })

  it('can return true for isAuthenticated when authenticated us true', () => {
    state.uiContext = { context: { authenticated: true } }

    expect(getters.isAuthenticated(state)).toBeTruthy()
  })

  it('can return false for isAuthenticated when authenticated in uiContext is false', () => {
    state.uiContext = { context: { authenticated: false } }

    expect(getters.isAuthenticated(state)).toBeFalsy()
  })
})
