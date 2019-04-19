import { findParameters } from '@/service/parameterService'

describe('service/parameterService', () => {
  describe('FindParameters for non Magma types (freemarker style)', () => {
    // eslint-disable-next-line
    it('should find \'koe\' in \'bla bla bla ${koe} bla bla\'', () => {
      // eslint-disable-next-line
      expect(findParameters('bla bla bla ${koe} bla bla', 'test')).toEqual(['koe'])
    })
  })

  describe('FindParameters for Magma script', () => {
    // eslint-disable-next-line
    it('should find \'myValue\' in \'bla bla bla $("myValue") bla bla\'', () => {
      // eslint-disable-next-line
      expect(findParameters('bla bla bla $("myValue") bla bla', 'JavaScript (Magma)')).toEqual(['myValue'])
    })

    it('should find params with single quotes in when type is JavaScript (Magma)', () => {
      // eslint-disable-next-line
      expect(findParameters("$('blah-di-blah')", 'JavaScript (Magma)')).toEqual(['blah-di-blah'])
    })
  })

  describe('FindParameters', () => {
    // eslint-disable-next-line
    it('should find not \'3demo\' in \'${3demo}\'', () => {
      // eslint-disable-next-line
      expect(findParameters('${3demo}', 'test')).toEqual([])
    })

    // eslint-disable-next-line
    it('should find not \'base\' in \'${base}\' as \'base\' is a reserved key word ', () => {
      // eslint-disable-next-line
      expect(findParameters('${base}', 'test')).toEqual([])
    })
  })
})
