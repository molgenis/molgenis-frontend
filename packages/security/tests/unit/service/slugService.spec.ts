import slugService from '@/service/slugService.ts'

describe('slugify', () => {
  it('should return a slugified string with spaces', () => {
    const textToSlugify = 'test group'
    const slugifiedText = slugService.slugify(textToSlugify)

    expect(slugifiedText).toEqual('test-group')
  })
  it('should return a slugified string with camel casing', () => {
    const textToSlugify = 'Test Group'
    const slugifiedText = slugService.slugify(textToSlugify)

    expect(slugifiedText).toEqual('test-group')
  })
  it('should return a slugified string with commas and dots', () => {
    const textToSlugify = 'Test, Group; 1.'
    const slugifiedText = slugService.slugify(textToSlugify)

    expect(slugifiedText).toEqual('test-group-1')
  })
})
