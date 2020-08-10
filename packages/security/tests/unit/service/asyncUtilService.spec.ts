import slugService from '@/service/asyncUtilService.ts'

describe('callAfter', () => {
  it('should call the give function after n seconds', () => {
    let called = false

    const myFunc = () => {
      called = true
    }

    slugService.callAfter(myFunc, 200)

    setTimeout(() => {
      expect(called).toEqual(true)
    }, 300)
  })
})
