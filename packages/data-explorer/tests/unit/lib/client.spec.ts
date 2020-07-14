import client, { errorReponse } from '@/lib/client'
import store from '@/store/store'

// Hack to be able to change window.location.href in jest
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

describe('dataRepository', () => {
  describe('client', () => {
    it('should try to login if user is not logged upon receiving a 401 error', async () => {
      const data = { response: { status: 401, data: { detail: 'hello world' } } }
      try {
        await errorReponse(data)
      } catch (e) {
        expect(e).toBe(data)
      }
      expect(window.location.href).toBe('/login')
      expect(store.commit).toBeCalledWith('setToast', { 'message': 'hello world', 'type': 'danger' })
    })

    it('should create a axios client with error handling done via store setToast', async () => {
      try {
        await client.get('non-existing-host.err')
      } catch (e) {
        expect(e.message).toBe('Network Error')
      }
      expect(store.commit).toBeCalledWith('setToast', { 'message': 'Network Error', 'type': 'danger' })
    })
  })
})
