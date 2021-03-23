import { toFilterValue } from '@/mappers/routeFilterMapper'

describe('toFilterValue', () => {
  it('should map the routeFilterValue value to the filterValue', () => {
    expect(toFilterValue(encodeURI('a string'), 'string')).toEqual('a string')
    expect(toFilterValue('some%0Atext', 'text')).toEqual(`some
text`)
    expect(toFilterValue(encodeURI('<h1>Some text</h1>'), 'html')).toEqual('<h1>Some text</h1>')
    expect(toFilterValue(encodeURI('file'), 'file')).toEqual('file') // todo check file filter
    expect(toFilterValue(encodeURI('http://test.org'), 'hyperlink')).toEqual('http://test.org')
    expect(toFilterValue(encodeURI('person@mail.com'), 'email')).toEqual('person@mail.com')

    expect(toFilterValue('true', 'bool')).toEqual([true])
    expect(toFilterValue('false', 'bool')).toEqual([false])
    expect(toFilterValue(true, 'bool')).toEqual([true])
    expect(toFilterValue(false, 'bool')).toEqual([false])

    expect(toFilterValue('ref1,ref2', 'categorical')).toEqual(['ref1', 'ref2'])
    expect(toFilterValue('ref1,ref2', 'categorical_mref')).toEqual(['ref1', 'ref2'])
    expect(toFilterValue('a,b', 'enum')).toEqual(['a', 'b'])
    expect(toFilterValue('ref1,ref2', 'mref')).toEqual(['ref1', 'ref2'])
    expect(toFilterValue('ref1,ref2', 'xref')).toEqual(['ref1', 'ref2'])
    expect(toFilterValue('ref1,ref2', 'onetomany')).toEqual(['ref1', 'ref2'])
    expect(toFilterValue('4.5,6.123', 'decimal')).toEqual(['4.5', '6.123'])
    expect(toFilterValue('1', 'int')).toEqual(['1'])
    expect(toFilterValue('1,2', 'long')).toEqual(['1', '2'])
    expect(toFilterValue('2021-01-01T11:00:00.000Z,2021-02-26T11:00:00.000Z', 'date')).toEqual([new Date('2021-01-01T11:00:00.000Z'), new Date('2021-02-26T11:00:00.000Z')])
    expect(toFilterValue('2021-01-01T11:00:00.000Z,2021-02-26T11:00:00.000Z', 'datetime')).toEqual([new Date('2021-01-01T11:00:00.000Z'), new Date('2021-02-26T11:00:00.000Z')])
  })
})
