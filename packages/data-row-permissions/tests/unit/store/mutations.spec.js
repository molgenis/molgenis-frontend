import { mutations } from '../../../src/store/mutations'

describe('Mutations.js', () => {
  let state = { }

  beforeEach(() => {
    state = {}
  })

  it('can process the response and set userOptions correctly to the state', () => {
    mutations.setUserOptions(state, [{ username: 'Tester' }])

    expect(state.userOptions).toStrictEqual([{ text: 'Tester', value: 'Tester' }])
  })

  it('can process the response and set roleOptions correctly to the state', () => {
    mutations.setRoleOptions(state, { items: [{ data: { name: 'super_admin', label: 'Admin with superpowers!' } }] })

    expect(state.roleOptions).toStrictEqual([{ value: 'super_admin', text: 'Admin with superpowers! (super_admin)' }])
  })

  it('can set responseStatus even if status is not found on the object', () => {
    mutations.setResponseStatus(state, { data: 'Some data response' })

    expect(state.responseStatus).toBe(200)
  })

  it('can set startInAddMode to false if there are permissions found', () => {
    mutations.setStartInAddMode(state, { data: { permissions: [{ name: 'super_admin', label: 'Admin with superpowers!' }] } })

    expect(state.startInAddMode).toBeFalsy()
  })

  it('can set startInAddMode to true if there are no set permissions are found', () => {
    state.responseStatus = 200
    mutations.setStartInAddMode(state, { data: { permissions: [] } })

    expect(state.startInAddMode).toBeTruthy()
  })
})
