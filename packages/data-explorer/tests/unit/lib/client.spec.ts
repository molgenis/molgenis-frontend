import client, { errorReponse } from '@/lib/client'
import store from '@/store/store'

// Hack to be able to change window.location.href in jest
// @ts-ignore
delete window.location
// @ts-ignore
window.location = {}
Object.defineProperty(window.location, 'href', {
  writable: true,
  value: 'test'
})
// End of hack

jest.mock('@/store/store', () => ({
  commit: jest.fn(),
  getters: { isUserAuthenticated: false }
}))

describe('client', () => {
  it('should try to login if user is not logged upon receiving a 401 error', async () => {
    const data = { response: { status: 401, data: { detail: 'hello world' } } }
    try {
      await errorReponse(data)
    } catch (e) {
      expect(e).toBe(data)
    }
    expect(window.location.href).toBe('/login')
  })

  it('should do error handling via store addToast and remove the spinner', async () => {
    const data = { response: { status: 404, data: { detail: 'world not found' } } }
    try {
      await errorReponse(data)
    } catch (e) {
      expect(e).toBe(data)
    }
    expect(store.commit).toBeCalledWith('setLoading', false)
    expect(store.commit).toBeCalledWith('addToast', { message: 'world not found', type: 'danger', timeout: 0 })
  })

  it('should create a axios instance', async () => {
    expect(client.get).toBeDefined()
    expect(client.delete).toBeDefined()
    expect(client.options).toBeDefined()
  })
})
