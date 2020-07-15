import build, { defaultResponse, defaultErrorReponse, defaultStatusValidation } from '@/lib/clientFactory'
import { AxiosResponse } from 'axios'

jest.spyOn(console, 'error').mockImplementation(jest.fn())

describe('clientFactory', () => {
  describe('build', () => {
    it('should build a axios client', async () => {
      const client = build()
      expect(client.get).toBeDefined()
      expect(client.delete).toBeDefined()
      expect(client.options).toBeDefined()
    })

    it('should set default behaviour on the created client', async () => {
      const client = build()
      expect(client.defaults.timeout).toEqual(5000)
      expect(client.defaults.baseURL).toEqual('/')
    })

    it('should be able to change default behaviour', async () => {
      const validateStatus = (status: number) => true
      const responseInterceptor = (response: AxiosResponse<any>) => response
      const responseErrorInterceptor = (error: any) => Promise.reject(error)
      const data = { baseURL: 'foo', timeout: 42, validateStatus, responseInterceptor, responseErrorInterceptor }
      const client = build(data)
      expect(client.defaults.timeout).toEqual(42)
      expect(client.defaults.baseURL).toEqual('foo')
      expect(client.defaults.validateStatus).toEqual(validateStatus)
      // @ts-ignore
      expect(client.interceptors.response.handlers[0].fulfilled).toEqual(responseInterceptor)
      // @ts-ignore
      expect(client.interceptors.response.handlers[0].rejected).toEqual(responseErrorInterceptor)
    })
  })
  describe('defaultResponse', () => {
    it('should pas tru data without changing it', async () => {
      const data = 'bar'
      // @ts-ignore
      expect(defaultResponse(data)).toEqual(data)
    })
  })
  describe('defaultStatusValidation', () => {
    it('should accept >= 200 to <300 values', async () => {
      expect(defaultStatusValidation(199)).toEqual(false)
      expect(defaultStatusValidation(200)).toEqual(true)
      expect(defaultStatusValidation(299)).toEqual(true)
      expect(defaultStatusValidation(300)).toEqual(false)
    })
  })
  describe('defaultErrorReponse', () => {
    it('should warn in console.error upon execution', async () => {
      const problem = { title: 'mumble jumble', errorCode: 'flux', detail: 'plasma injector quantum flux capacitor out of capacity' }
      try {
        await defaultErrorReponse(problem)
      } catch (e) {
        expect(e).toEqual(problem)
      }
      expect(console.error).toBeCalledTimes(2)
    })
  })
})
