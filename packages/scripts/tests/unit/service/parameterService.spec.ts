import { findParameters } from '@/service/parameterService'

describe('service/parameterService', () => {
    describe('FindParameters for non Magma types (freemarker style)', () => {
        it('should find \'koe\' in \'bla bla bla ${koe} bla bla\'', () => {
            expect(findParameters('bla bla bla ${koe} bla bla', 'test')).toEqual(['koe'])
        })
    })

    describe('FindParameters for Magma script', () => {
        it('should find \'myValue\' in \'bla bla bla $("myValue") bla bla\'', () => {
            expect(findParameters('bla bla bla $("myValue") bla bla', 'JavaScript (Magma)')).toEqual(['myValue'])
        })

        it('should find params with single quotes in when type is JavaScript (Magma)', () => {
            expect(findParameters('$("blah-di-blah")', 'JavaScript (Magma)')).toEqual(['blah-di-blah'])
        })
    })

    describe('FindParameters', () => {
        it('should find not \'3demo\' in \'${3demo}\'', () => {
            expect(findParameters('${3demo}', 'test')).toEqual([])
        })

        it('should find not \'base\' in \'${base}\' as \'base\' is a reserved key word ', () => {
            expect(findParameters('${base}', 'test')).toEqual([])
        })
    })
})
