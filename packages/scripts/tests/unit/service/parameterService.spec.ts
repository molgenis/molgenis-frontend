import { findParameters } from '@/service/parameterService'

describe('service/parameterService', () => {
    describe('findParameters', () => {
        it('Find non magma parameter', () => {
            expect(findParameters('bla bla bla ${koe} bla bla', 'test')).toEqual(['koe'])
        })

        it('Find magma parameter', () => {
            expect(findParameters('bla bla bla $("myValue") bla bla', 'JavaScript (Magma)')).toEqual(['myValue'])
        })

        it('should not find params with single quotes in when type is JavaScript (Magma)', () => {
            expect(findParameters("$('blah-di-blah')", 'JavaScript (Magma)')).toEqual([])
        })
    })
})
